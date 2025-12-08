import { Typography } from "@repo/ui"
import { AddPrompt } from "./AddPrompt"
import { trpc } from "../../utils/trpc"

export const Conversation = ({ conversationId }: { conversationId: string }) => {
    const conversation = trpc.conversation.getConversationById.useQuery({ conversationId })

    return (
        <div className="flex flex-col gap-3 justify-between items-center p-3 w-[700px]">
            <div className="overflow-y-auto max-h-[300px]">
                {conversation.data?.prompts.map((prompt) => (
                    <Typography key={prompt.id}>{prompt.prompt}</Typography>
                ))}
            </div>
            <AddPrompt conversationId={conversationId} />
        </div>
    )
}