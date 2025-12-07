# User Conversations API - Usage Guide

## 📋 Available Endpoints

Your tRPC API now has complete CRUD operations for conversations and prompts. Here's how to use each endpoint:

---

## 🔍 Query Endpoints (Read Data)

### 1. `getUserConversations`
Get all conversations for the authenticated user with full details.

**Usage:**
```typescript
import { trpc } from '../../utils/trpc'

function ConversationList() {
    const { data: conversations, isLoading, error } = trpc.user.getUserConversations.useQuery()
    
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    
    return (
        <div>
            {conversations?.map(conv => (
                <div key={conv.id}>
                    <h3>Conversation {conv.id}</h3>
                    <p>Latest: {conv.latestPrompt}</p>
                    <p>Total prompts: {conv.promptCount}</p>
                    <p>Created: {conv.createdAt.toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}
```

**Returns:**
```typescript
Array<{
    id: string
    createdAt: Date
    updatedAt: Date
    prompts: Array<{
        id: string
        conversationId: string
        prompt: string
        createdAt: Date
        updatedAt: Date
    }>
    latestPrompt: string | null  // Most recent prompt text
    promptCount: number           // Total number of prompts
}>
```

**Features:**
- ✅ Automatically filtered by authenticated user
- ✅ Includes all prompts for each conversation
- ✅ Sorted by most recently updated
- ✅ Prompts sorted by creation date (newest first)

---

### 2. `getConversationById`
Get a single conversation with all its prompts.

**Usage:**
```typescript
function ConversationDetail({ conversationId }: { conversationId: string }) {
    const { data: conversation } = trpc.user.getConversationById.useQuery({
        conversationId
    })
    
    return (
        <div>
            <h2>Conversation</h2>
            {conversation?.prompts.map(prompt => (
                <div key={prompt.id}>
                    <p>{prompt.prompt}</p>
                    <small>{prompt.createdAt.toLocaleString()}</small>
                </div>
            ))}
        </div>
    )
}
```

**Input:**
```typescript
{
    conversationId: string
}
```

**Returns:**
```typescript
{
    id: string
    createdAt: Date
    updatedAt: Date
    prompts: Array<{
        id: string
        conversationId: string
        prompt: string
        createdAt: Date
        updatedAt: Date
    }>
}
```

**Features:**
- ✅ Verifies user has access to the conversation
- ✅ Throws error if conversation not found or access denied
- ✅ Prompts sorted chronologically (oldest first)

---

### 3. `me`
Get the current authenticated user's information.

**Usage:**
```typescript
function UserProfile() {
    const { data: user } = trpc.user.me.useQuery()
    
    return (
        <div>
            <p>User ID: {user?.userId}</p>
            <p>Name: {user?.name}</p>
        </div>
    )
}
```

**Returns:**
```typescript
{
    userId: string
    name: string
}
```

---

## ✏️ Mutation Endpoints (Modify Data)

### 1. `createConversation`
Create a new conversation, optionally with an initial prompt.

**Usage:**
```typescript
function CreateConversationButton() {
    const utils = trpc.useContext()
    const createConversation = trpc.user.createConversation.useMutation({
        onSuccess: () => {
            // Refresh the conversations list
            utils.user.getUserConversations.invalidate()
        }
    })
    
    const handleCreate = () => {
        createConversation.mutate({
            initialPrompt: "Hello, how can you help me today?"
        })
    }
    
    return (
        <button onClick={handleCreate} disabled={createConversation.isLoading}>
            {createConversation.isLoading ? 'Creating...' : 'New Conversation'}
        </button>
    )
}
```

**Input:**
```typescript
{
    initialPrompt?: string  // Optional first message
}
```

**Returns:**
```typescript
{
    id: string
    createdAt: Date
    updatedAt: Date
}
```

**Features:**
- ✅ Automatically links conversation to authenticated user
- ✅ Generates unique IDs for conversation and user-conversation link
- ✅ Optionally adds initial prompt

---

### 2. `addPromptToConversation`
Add a new prompt/message to an existing conversation.

**Usage:**
```typescript
function ChatInput({ conversationId }: { conversationId: string }) {
    const [message, setMessage] = useState('')
    const utils = trpc.useContext()
    
    const addPrompt = trpc.user.addPromptToConversation.useMutation({
        onSuccess: () => {
            // Refresh the conversation
            utils.user.getConversationById.invalidate({ conversationId })
            utils.user.getUserConversations.invalidate()
            setMessage('')
        }
    })
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addPrompt.mutate({
            conversationId,
            prompt: message
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit" disabled={addPrompt.isLoading}>
                Send
            </button>
        </form>
    )
}
```

**Input:**
```typescript
{
    conversationId: string
    prompt: string
}
```

**Returns:**
```typescript
{
    id: string
    conversationId: string
    prompt: string
    createdAt: Date
    updatedAt: Date
}
```

**Features:**
- ✅ Verifies user has access to the conversation
- ✅ Updates conversation's `updatedAt` timestamp
- ✅ Updates user-conversation's `updatedAt` timestamp (for sorting)
- ✅ Throws error if conversation not found or access denied

---

### 3. `deleteConversation`
Delete a conversation and all its prompts.

**Usage:**
```typescript
function DeleteConversationButton({ conversationId }: { conversationId: string }) {
    const utils = trpc.useContext()
    const deleteConversation = trpc.user.deleteConversation.useMutation({
        onSuccess: () => {
            // Refresh the conversations list
            utils.user.getUserConversations.invalidate()
        }
    })
    
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this conversation?')) {
            deleteConversation.mutate({ conversationId })
        }
    }
    
    return (
        <button onClick={handleDelete} disabled={deleteConversation.isLoading}>
            Delete
        </button>
    )
}
```

**Input:**
```typescript
{
    conversationId: string
}
```

**Returns:**
```typescript
{
    success: true
}
```

**Features:**
- ✅ Verifies user has access to the conversation
- ✅ Deletes all prompts first (respects foreign key constraints)
- ✅ Deletes user-conversation link
- ✅ Deletes the conversation
- ✅ Throws error if conversation not found or access denied

---

## 🎯 Complete Example: Chat Component

Here's a complete example showing how to use multiple endpoints together:

```typescript
import { trpc } from '../../utils/trpc'
import { useState } from 'react'

export function ChatApp() {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
    const utils = trpc.useContext()
    
    // Get all conversations
    const { data: conversations } = trpc.user.getUserConversations.useQuery()
    
    // Get selected conversation details
    const { data: currentConversation } = trpc.user.getConversationById.useQuery(
        { conversationId: selectedConversationId! },
        { enabled: !!selectedConversationId }
    )
    
    // Mutations
    const createConversation = trpc.user.createConversation.useMutation({
        onSuccess: (newConv) => {
            utils.user.getUserConversations.invalidate()
            setSelectedConversationId(newConv.id)
        }
    })
    
    const addPrompt = trpc.user.addPromptToConversation.useMutation({
        onSuccess: () => {
            utils.user.getConversationById.invalidate({ conversationId: selectedConversationId! })
            utils.user.getUserConversations.invalidate()
        }
    })
    
    const deleteConversation = trpc.user.deleteConversation.useMutation({
        onSuccess: () => {
            utils.user.getUserConversations.invalidate()
            setSelectedConversationId(null)
        }
    })
    
    const handleNewConversation = () => {
        createConversation.mutate({
            initialPrompt: "Hello!"
        })
    }
    
    const handleSendMessage = (message: string) => {
        if (selectedConversationId) {
            addPrompt.mutate({
                conversationId: selectedConversationId,
                prompt: message
            })
        }
    }
    
    const handleDeleteConversation = (id: string) => {
        if (confirm('Delete this conversation?')) {
            deleteConversation.mutate({ conversationId: id })
        }
    }
    
    return (
        <div className="chat-app">
            {/* Sidebar: Conversation List */}
            <aside>
                <button onClick={handleNewConversation}>
                    New Conversation
                </button>
                {conversations?.map(conv => (
                    <div 
                        key={conv.id}
                        onClick={() => setSelectedConversationId(conv.id)}
                        className={selectedConversationId === conv.id ? 'active' : ''}
                    >
                        <p>{conv.latestPrompt || 'New conversation'}</p>
                        <small>{conv.promptCount} messages</small>
                        <button onClick={() => handleDeleteConversation(conv.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </aside>
            
            {/* Main: Chat View */}
            <main>
                {currentConversation ? (
                    <>
                        <div className="messages">
                            {currentConversation.prompts.map(prompt => (
                                <div key={prompt.id} className="message">
                                    <p>{prompt.prompt}</p>
                                    <small>{prompt.createdAt.toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                        <ChatInput onSend={handleSendMessage} />
                    </>
                ) : (
                    <div>Select a conversation or create a new one</div>
                )}
            </main>
        </div>
    )
}

function ChatInput({ onSend }: { onSend: (message: string) => void }) {
    const [message, setMessage] = useState('')
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            onSend(message)
            setMessage('')
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    )
}
```

---

## 🔄 Cache Invalidation Best Practices

When using mutations, always invalidate the relevant queries to keep the UI in sync:

```typescript
const utils = trpc.useContext()

// After creating a conversation
utils.user.getUserConversations.invalidate()

// After adding a prompt
utils.user.getConversationById.invalidate({ conversationId })
utils.user.getUserConversations.invalidate()

// After deleting a conversation
utils.user.getUserConversations.invalidate()
```

---

## 🔐 Security Notes

All endpoints automatically:
- ✅ Use the authenticated user's ID from the context
- ✅ Verify user has access to conversations before modifying
- ✅ Throw errors for unauthorized access
- ✅ Prevent users from accessing other users' conversations

---

## 🚀 Next Steps

1. **Add AI responses**: Integrate with an AI service in the `addPromptToConversation` mutation
2. **Add conversation titles**: Extend the schema to include a title field
3. **Add sharing**: Create endpoints to share conversations with other users
4. **Add search**: Add a search endpoint to find conversations by content
5. **Add pagination**: Implement cursor-based pagination for large conversation lists
