import { Card, cn, Typography } from "@repo/ui"
import { cardItems } from "./items"

export const OngoingPrompt = () => {

    return (
        <div className="flex flex-col grow justify-center items-center w-full h-screen">
            <div className="max-w-[700px] justify-between flex flex-col h-full py-5">
                <div className="flex flex-col gap-20">
                    <Typography weight="bold" size="2xl" className="flex items-center mt-20">Hey, I’m Chat AI.
                        <span className="text-neutral-600 text-2xl font-normal">Your AI assistant and companion for any occasion.</span>
                    </Typography>
                    <div className="grid grid-cols-4 gap-3">
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
            </div>
        </div>
    )
}