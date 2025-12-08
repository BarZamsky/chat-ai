import { SidebarMenuButton, SidebarMenuItem, Typography } from "@repo/ui"
import { SidebarItemProps } from "./types"

export const SidebarItem = ({ id, pathname, icon, title }: SidebarItemProps) => {
    const currentPath = window.location.pathname

    const isActive = currentPath === pathname
    return (
        <SidebarMenuItem key={id}>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                className="flex items-center gap-2 data-[active=true]:bg-tertiary data-[active=true]:text-brand-primary hover:bg-tertiary hover:text-brand-primary"
            >
                <a href={pathname}>
                    {icon}
                    <Typography color={isActive ? 'brand-primary' : 'secondary'} className="hover:text-brand-primary overflow-hidden whitespace-nowrap ellipsis">{title}</Typography>
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}