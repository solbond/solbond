import Sidebar from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full py-4 px-2 h-screen flex flex-row bg-[#0f0f0f]">
      <Sidebar />
      <div className="w-full h-full bg-[#161616] border border-white/10 rounded-xl p-4">
        {children}
      </div>
    </div>
  )
}

export default Layout
