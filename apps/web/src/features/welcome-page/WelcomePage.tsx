import { Card, cn, Typography } from "@repo/ui"
import { cardItems } from "./items"
import { useSidebar } from "@repo/ui"
import { AddPrompt } from "../../components/conversation/AddPrompt"


export const WelcomePage = () => {
    const { isMobile } = useSidebar()
    return (
        <div className="flex flex-col grow justify-center items-center w-full px-4">
            <div className="max-w-[700px] justify-between flex flex-col h-full py-5">
                <div className="flex flex-col gap-20">
                    <div className="flex flex-col">
                        <Typography
                            weight="semibold"
                            size="3xl"
                            className="flex items-center mt-20"
                        >
                            Hey, I’m Chat AI.
                        </Typography>
                        <Typography size="3xl" weight="medium" color="secondary">
                            Your AI assistant and companion for any occasion.
                        </Typography>
                    </div>
                    <div className={cn("grid grid-cols-4 gap-3", isMobile ? "grid-cols-2" : "")}>
                        {cardItems.map((item, index) => (
                            <Card key={index} className="flex flex-col gap-2">
                                <div className={cn("flex items-center justify-center rounded-md w-8 h-8 p-2 mb-3", item.iconColor)}>
                                    {item.icon}
                                </div>
                                <Typography weight="semibold">{item.title}</Typography>
                                <Typography size="xs" color="neutral-600">{item.description}</Typography>
                            </Card>
                        ))}
                    </div>
                </div>
                <AddPrompt conversationId="" />
            </div>
        </div>
    )
}