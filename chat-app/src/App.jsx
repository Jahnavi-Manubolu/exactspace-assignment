
import { useState, useRef, useEffect } from 'react'

const USERNAMES = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

const AVATAR_COLORS = {
  Alan: '#4f46e5',
  Bob: '#0891b2',
  Carol: '#db2777',
  Dean: '#ea580c',
  Elin: '#16a34a',
}

const STORAGE_KEY = 'exactspace-chat-messages'
const USER_KEY = 'exactspace-user-id'

// Persistent browser user ID
function getUserId() {
  let id = localStorage.getItem(USER_KEY)

  if (!id) {
    id = `user-${Date.now()}-${Math.random()}`
    localStorage.setItem(USER_KEY, id)
  }

  return id
}

const CURRENT_USER = getUserId()

function randomUsername() {
  return USERNAMES[Math.floor(Math.random() * USERNAMES.length)]
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Initial message
const initialMessages = [
  {
    id: 1,
    username: 'Alan',
    text: 'Welcome to the Exactspace chat! Type a message below and hit Send.',
    time: formatTime(new Date()),
    likes: 0,
    likedBy: [],
    isEdited: false,
  },
]

// Load messages from localStorage
function loadMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      const parsed = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        return parsed.map((message) => ({
          ...message,
          likes: Math.max(0, Number(message.likes) || 0),
          likedBy: Array.isArray(message.likedBy)
            ? message.likedBy
            : message.liked
              ? [CURRENT_USER]
              : [],
          isEdited: Boolean(message.isEdited),
        }))
      }
    }
  } catch (error) {
    console.error('Error loading messages:', error)
  }

  return initialMessages
}

// Avatar component
function Avatar({ name }) {
  return (
    <div
      className="avatar"
      style={{
        backgroundColor: AVATAR_COLORS[name] || '#475569',
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

// Message component
function MessageItem({
  message,
  onLike,
  onDelete,
  onEdit,
  editingId,
  editText,
  setEditText,
  onSaveEdit,
  onCancelEdit,
}) {
  const isLiked = message.likedBy.includes(CURRENT_USER)
  const isEditing = editingId === message.id

  return (
    <div className="message-row">
      <Avatar name={message.username} />

      <div className="message-body">

        <div className="message-header">
          <span className="message-username">
            {message.username}
          </span>

          <span className="message-time">
            {message.time}
          </span>
        </div>

        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              className="message-input edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSaveEdit(message.id)
                }

                if (e.key === 'Escape') {
                  onCancelEdit()
                }
              }}
              autoFocus
            />

            <div className="edit-actions">
              <button
                className="save-button"
                onClick={() => onSaveEdit(message.id)}
                disabled={!editText.trim()}
              >
                Save
              </button>

              <button
                className="cancel-button"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="message-text">
              {message.text}
              {message.isEdited && (
                <span className="edited-label"> (edited)</span>
              )}
            </div>

            <div className="message-actions">

              {/* Like button */}
              <button
                className={`like-button ${isLiked ? 'liked' : ''}`}
                onClick={() => onLike(message.id)}
                aria-label={isLiked ? 'Unlike message' : 'Like message'}
                aria-pressed={isLiked}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>

                <span>{message.likes}</span>
              </button>

              {/* Edit button */}
              <button
                className="edit-button"
                onClick={() => onEdit(message)}
                aria-label="Edit message"
                title="Edit message"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                </svg>
              </button>

              {/* Delete button */}
              <button
                className="delete-button"
                onClick={() => onDelete(message.id)}
                aria-label="Delete message"
                title="Delete message"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Main application
export default function App() {
  const [messages, setMessages] = useState(loadMessages)
  const [input, setInput] = useState('')

  // Edit states
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const messageIdRef = useRef(
    Math.max(0, ...messages.map((m) => Number(m.id) || 0)) + 1
  )

  const messagesEndRef = useRef(null)

  // Save messages automatically
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (error) {
      console.error('Error saving messages:', error)
    }
  }, [messages])

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  // Send message
  const sendMessage = () => {
    const trimmed = input.trim()

    if (!trimmed) return

    const newMessage = {
      id: messageIdRef.current++,
      username: randomUsername(),
      text: trimmed,
      time: formatTime(new Date()),
      likes: 0,
      likedBy: [],
      isEdited: false,
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
  }

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Like / Unlike message
  const handleLike = (id) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id !== id) return message

        const alreadyLiked = message.likedBy.includes(CURRENT_USER)

        return {
          ...message,
          likedBy: alreadyLiked
            ? message.likedBy.filter(
                (user) => user !== CURRENT_USER
              )
            : [...message.likedBy, CURRENT_USER],

          likes: Math.max(
            0,
            message.likes + (alreadyLiked ? -1 : 1)
          ),
        }
      })
    )
  }

  // Start editing
  const handleEdit = (message) => {
    setEditingId(message.id)
    setEditText(message.text)
  }

  // Save edited message
  const handleSaveEdit = (id) => {
    const trimmed = editText.trim()

    if (!trimmed) return

    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? {
              ...message,
              text: trimmed,
              isEdited: true,
            }
          : message
      )
    )

    setEditingId(null)
    setEditText('')
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  // Delete message
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    )

    if (!confirmed) return

    setMessages((prev) =>
      prev.filter((message) => message.id !== id)
    )

    if (editingId === id) {
      handleCancelEdit()
    }
  }

  return (
    <div className="app-wrapper">
      <div className="chat-container">

        {/* Header */}
        <header className="chat-header">

          <div className="header-avatar">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>

          <div className="header-info">
            <h1>Exactspace Chat</h1>

            <span className="header-status">
              <span className="status-dot"></span>
              {messages.length} messages
            </span>
          </div>

        </header>

        {/* Messages */}
        <div className="messages-list">

          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              onLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          ))}

          <div ref={messagesEndRef} />

        </div>

        {/* Input area */}
        <div className="input-area">

          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="send-button"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            Send
          </button>

        </div>

      </div>
    </div>
  )
}
