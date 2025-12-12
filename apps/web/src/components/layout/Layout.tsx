import { SidebarProvider } from "@repo/ui"
import { AppSidebar } from './Sidebar'
import { MobileSidebar } from "./MobileSidebar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <MobileSidebar>
        <AppSidebar />
      </MobileSidebar>
      <div className="hidden xl:flex">
        <AppSidebar />
      </div>
      {children}
    </SidebarProvider>
  )
}