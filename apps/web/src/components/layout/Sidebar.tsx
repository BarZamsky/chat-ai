import {
    Button,
    Sidebar as SidebarComponent,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    Typography,
} from '@repo/ui'
import Logo from './assets/logo.svg'
import { Zap, Sparkles, SquareMenu } from 'lucide-react'
import { SignedOut } from '@clerk/clerk-react'
import { CreateAccount } from './CreateAccount'
import { UserActions } from './UserActions'
import { trpc } from '../../utils/trpc'
import { useNavigate } from 'react-router-dom'
import { SidebarItem } from './SidebarItem'

export const AppSidabar = () => {
    const navigate = useNavigate()

    const { data: pastConversations } =
        trpc.user.getUserConversations.useQuery();

    const createConversationMutation = trpc.conversation.createConversation.useMutation({
        onSuccess: (data) => {
            navigate(`/chat/${data.id}`)
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
                            <SidebarItem id="ongoing-prompt" pathname="/" icon={<Zap />} title="Ongoing Prompt" />
                            {!!pastConversations?.length && (
                                <>
                                    <Typography color="neutral-500" className='pt-5'>Past</Typography>
                                    {pastConversations.map((conversation) => (
                                        <SidebarItem id={conversation.id} key={conversation.id} pathname={`/chat/${conversation.id}`} icon={<SquareMenu />} title={conversation.latestPrompt || 'Conversation'} />
                                    ))}
                                </>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex flex-col gap-8">
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