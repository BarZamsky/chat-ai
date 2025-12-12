import { Typography } from "@repo/ui"
import { AddPrompt } from "./AddPrompt"
import { trpc } from "../../utils/trpc"

export const Conversation = ({ conversationId }: { conversationId: string }) => {
    const conversation = trpc.conversation.getConversationById.useQuery({ conversationId })
    console.log(conversation.data)
    return (
        <div className="flex flex-col grow justify-center items-center w-full px-4">
            <div className="max-w-[700px] justify-between flex flex-col h-full py-5">
                <div className="overflow-y-auto max-h-[300px]">
                    {conversation.data?.prompts.map((prompt) => (
                        <Typography key={prompt.id}>{prompt.prompt}</Typography>
                    ))}
                </div>
                <AddPrompt conversationId={conversationId} />
            </div>
        </div>
    )
}