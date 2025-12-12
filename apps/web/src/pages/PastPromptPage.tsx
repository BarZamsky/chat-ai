import { Layout } from "../components/layout/Layout"
import { Conversation } from "../components"
import { useParams } from "react-router-dom"

export const PastPromptPage = () => {
    const { id = '' } = useParams()
    return (
        <Layout>
            <Conversation conversationId={id} />
        </Layout>
    )
}