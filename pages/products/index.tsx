import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-white text-xl font-normal tracking-wider">
          Catalogue
        </h1>
        <Button className="p-3 rounded-md bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out cursor-pointer">
          <a href="/products/new">Create New Product</a>
        </Button>
      </div>
    </Layout>
  )
}

export default Page
