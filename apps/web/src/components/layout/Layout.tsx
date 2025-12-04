import { SidebarProvider } from "@repo/ui"
import { AppSidabar } from './Sidebar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidabar />
      {children}
    </SidebarProvider>
  )
}