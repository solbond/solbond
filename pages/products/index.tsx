import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"
import { WandSparkles } from "lucide-react"

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-white text-xl font-normal tracking-wider">
          Catalogue
        </h1>
        <Button className="p-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out cursor-pointer">
          <a className="flex flex-row items-center gap-2" href="/products/new">
            <WandSparkles className="w-4 h-4" />
            <span>New Product</span>
          </a>
        </Button>
      </div>
    </Layout>
  )
}

export default Page
