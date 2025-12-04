import { Layout } from "../components/layout/Layout"
import { OngoingPrompt } from "../features/ongoing-prompt/OngoingPrompt"

export const HomePage = () => {
    return (
        <div className="relative h-full grow-0 shrink overflow-auto overflow-x-hidden flex flex-col items-center">
            <Layout>
                <OngoingPrompt />
            </Layout>
        </div>
    )
}