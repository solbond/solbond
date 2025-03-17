import { useRouter } from "@tanstack/react-router"
import { ArrowRightIcon } from "lucide-react"

export default function VerifiedCase() {
  const router = useRouter()
  return (
    <div className="">
      <h1 className="text-[36px] font-bold">Email Verified</h1>
      <p className="text-sm text-gray-600">
        Your email has been verified! Welcome to Solbond - enjoy exploring the
        website.
      </p>
      <button
        onClick={() => router.navigate({ to: "/" })}
        className="bg-black hover:scale-105 transition-all active:scale-95 text-white flex gap-2 items-center justify-center p-3 rounded-xl w-full font-bold mt-4"
      >
        Front Page <ArrowRightIcon size={22} />
      </button>
    </div>
  )
}
