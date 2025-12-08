import { Layout } from "../components/layout/Layout"
import { Conversation } from "../components"
import { useParams } from "react-router-dom"

export const PastPromptPage = () => {
    const { id = '' } = useParams()
    return (
        <div className="relative h-full grow-0 shrink overflow-auto overflow-x-hidden flex flex-col items-center">
            <Layout>
                <Conversation conversationId={id} />
            </Layout>
        </div>
    )
}