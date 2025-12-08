import { Button } from "@repo/ui"
import { Input } from "@repo/ui"
import { Send } from "lucide-react"
import { useState } from "react"
import { trpc } from '../../utils/trpc'

export const AddPrompt = ({ conversationId }: { conversationId: string }) => {
    const [prompt, setPrompt] = useState('')
    const savePromptMutation = trpc.conversation.addPromptToConversation.useMutation({
        onSuccess: () => {
            console.log('hi')
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleSubmit = () => {
        savePromptMutation.mutate({ conversationId, prompt })
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <Input placeholder="Ask me anything..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button variant="secondary" disabled={prompt.length === 0} onClick={handleSubmit}><Send />Submit</Button>
        </div>
    )
}