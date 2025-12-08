import {
    Button,
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
import { Zap, Sparkles, SquareMenu } from 'lucide-react'
import { SignedOut } from '@clerk/clerk-react'
import { CreateAccount } from './CreateAccount'
import { UserActions } from './UserActions'
import { trpc } from '../../utils/trpc'

export const AppSidabar = () => {
    const currentPath = window.location.pathname

    const { data: pastConversations } =
        trpc.user.getUserConversations.useQuery();

    const createConversationMutation = trpc.conversation.createConversation.useMutation({
        onSuccess: (data) => {
            console.log("User added!", data);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleCreateConversation = () => {
        createConversationMutation.mutate({})
    }

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
                            {!!pastConversations?.length && (
                                <>
                                    <Typography color="neutral-500" className='pt-5'>Past</Typography>
                                    {pastConversations.map((conversation) => (
                                        <SidebarMenuItem key={conversation.id}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={currentPath === `/conversation/${conversation.id}`}
                                                className="flex items-center gap-2 text-neutral-500 data-[active=true]:bg-neutral-50 hover:bg-neutral-50 hover:text-brand-primary focus:text-brand-primary"
                                            >
                                                <a href={`/conversation/${conversation.id}`}>
                                                    <SquareMenu className="text-neutral-500" />
                                                    <Typography color="neutral-500">{conversation.latestPrompt || 'Conversation'}</Typography>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex flex-col gap-4">
                <Button variant="secondary" onClick={handleCreateConversation}>
                    <Sparkles />
                    Start new chat
                </Button>
                <UserActions />
                <SignedOut>
                    <CreateAccount />
                </SignedOut>
            </SidebarFooter>
        </SidebarComponent>
    )
}
