import Sidebar from "../../components/sidebar"
// import { Button } from "../../components/ui/button"

const Page = () => {
  return (
    <div className="w-full py-4 px-2 h-screen flex flex-row bg-[#0f0f0f]">
      <Sidebar />
      <div className="w-full h-full bg-[#161616] border border-white/10 rounded-xl p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-white text-xl font-normal tracking-wider">New</h1>
        </div>
      </div>
    </div>
  )
}

export default Page
