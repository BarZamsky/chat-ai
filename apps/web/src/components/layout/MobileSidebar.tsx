import { Button } from "@repo/ui"
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui"
import Logo from "./assets/logo.svg"
import { Menu } from "lucide-react"

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="xl:hidden flex p-4 items-center justify-between border-b border-neutral-200 h-14 absolute top-0 left-0 right-0">
            <img src={Logo} alt="Logo" />
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost">
                        <Menu />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="p-0 w-full">
                    {children}
                </SheetContent>
            </Sheet>
        </div>
    )
}
