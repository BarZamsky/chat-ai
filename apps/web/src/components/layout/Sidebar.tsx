import {
    Button,
    Card,
    Sidebar as SidebarComponent,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    Typography,
} from '@repo/ui'
import Logo from './assets/logo.svg'
import { Zap, Sparkles } from 'lucide-react'

export const AppSidabar = () => {
    const currentPath = window.location.pathname

    return (
        <SidebarComponent collapsible="none" className="p-2 h-screen border-r border-neutral-200">
            <SidebarHeader>
                <img src={Logo} alt="Logo" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={currentPath === '/'}
                                    className="flex items-center gap-2 text-brand-primary data-[active=true]:bg-neutral-50 hover:bg-neutral-50 hover:text-brand-primary focus:text-brand-primary"
                                >
                                    <a href="/">
                                        <Zap className="text-brand-primary" />
                                        <Typography color="brand-primary">Ongoing Prompt</Typography>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex flex-col gap-4">
                <Button variant="secondary">
                    <Sparkles />
                    Start new chat
                </Button>
                <Card className="flex flex-col gap-4 max-w-[18rem]">
                    <div className="flex flex-col gap-1">
                        <Typography weight="semibold">Let's create an account</Typography>
                        <Typography color="neutral-600">
                            Save your chat history, share chat, and personalize your experience.
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Button>Sign in</Button>
                        <Button variant="link">Create account</Button>
                    </div>
                </Card>
            </SidebarFooter>
        </SidebarComponent>
    )
}
