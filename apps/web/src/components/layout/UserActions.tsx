import { SignedIn, useUser } from "@clerk/clerk-react"
import { Avatar, AvatarFallback, AvatarImage, SidebarMenuButton } from "@repo/ui"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui"
import { Ellipsis } from "lucide-react"
import { SignOutButton } from "@clerk/clerk-react"
import { LogOutIcon } from "lucide-react"
import { Settings } from "lucide-react"
import { Typography } from "@repo/ui"

export const UserActions = () => {
    const { user } = useUser()
    return (
        <SignedIn>
            <div className="flex items-center overflow-hidden justify-between">
                <div className='flex items-center gap-2'>
                    <Avatar className="rounded-full size-8">
                        <AvatarImage src={user?.imageUrl} alt="user-image" />
                        <AvatarFallback className="uppercase bg-primary text-primary-foreground">{user?.fullName}</AvatarFallback>
                    </Avatar>
                    <Typography className="truncate ellipsis">{user?.fullName}</Typography>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <Ellipsis />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={4} align="start" className="w-48 flex flex-col gap-2 p-2">
                        <DropdownMenuItem>
                            <Settings />
                            <Typography>
                                Settings
                            </Typography>
                        </DropdownMenuItem>
                        <SignOutButton>
                            <DropdownMenuItem>
                                <LogOutIcon />
                                <Typography>Sign Out</Typography>
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SignedIn>
    )
}