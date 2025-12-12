import { Button } from "@repo/ui"
import { Input } from "@repo/ui"
import { Send } from "lucide-react"
import { useState } from "react"
import { trpc } from '../../utils/trpc'

export const AddPrompt = ({ conversationId }: { conversationId: string }) => {
    const utils = trpc.useUtils()
    const [prompt, setPrompt] = useState('')
    const savePromptMutation = trpc.conversation.addPromptToConversation.useMutation({
        onSuccess: () => {
            utils.user.getUserConversations.invalidate()
            utils.conversation.getConversationById.invalidate({ conversationId })
            setPrompt('')
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const createConversationMutation = trpc.conversation.createConversation.useMutation({
        onSuccess: (data) => {
            savePromptMutation.mutate({ conversationId: data.id, prompt })
            utils.user.getUserConversations.invalidate()
            utils.conversation.getConversationById.invalidate({ conversationId: data.id })
            setPrompt('')
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleSubmit = () => {
        if (conversationId.length === 0) {
            createConversationMutation.mutate({})
            return
        }
        savePromptMutation.mutate({ conversationId, prompt })
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <Input placeholder="Ask me anything..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button variant="secondary" disabled={prompt.length === 0} onClick={handleSubmit}>
                <Send />
                <span className="hidden md:inline">Submit</span>
            </Button>
        </div>
    )
}