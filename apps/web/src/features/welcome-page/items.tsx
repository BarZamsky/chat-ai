import { CardItem } from "./types";
import { MailOpen, Pencil, SquareChartGantt, MessageCircle } from 'lucide-react'

export const cardItems: CardItem[] = [
    {
        icon: <MailOpen className="text-brand-primary" />,
        iconColor: "bg-indigo-50",
        title: "Draft email",
        description: "Generate email for any occasion you need.",
    },
    {
        icon: <Pencil className="text-green-700" />,
        iconColor: "bg-green-50",
        title: "Write an Essay",
        description: "Generate essay for any occasion you need.",
    },
    {
        icon: <SquareChartGantt className="text-fuchsia-600" />,
        iconColor: "bg-fuchsia-50",
        title: "Planning",
        description: "Plan for any occasion, from holiday to family.",
    },
    {
        icon: <MessageCircle className="text-orange-500" />,
        iconColor: "bg-amber-50",
        title: "Assistant",
        description: "Become your personal assistant. Helping you.",
    },
]