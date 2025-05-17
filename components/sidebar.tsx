import { Logo, Notification, Search } from "./icons"
import { Dropdown } from "./drop-menu.client"
import {
  Egg,
  Package,
  WalletCards,
  UsersRound,
  Settings,
  Puzzle,
} from "lucide-react"

const navigationItems = [
  { href: "/", icon: Egg, label: "Home" },
  { href: "/products", icon: Package, label: "Products" },
  { href: "/members", icon: UsersRound, label: "Members" },
  { href: "/links", icon: Puzzle, label: "Links" },
  { href: "/sales", icon: WalletCards, label: "Sales" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export default function Sidebar() {
  return (
    <div className="w-1/7 flex flex-col bg-inherit h-full">
      <div className="px-6 pt-4 pb-6 flex flex-row justify-between items-center">
        <Logo
          size={18}
          className="text-white hover:cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
        />
        <div className="flex flex-row items-center gap-2">
          <Notification
            size={20}
            className="hover:cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
          />
          <Search
            size={20}
            className="hover:cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
      <nav className="flex flex-col text-white text-sm font-medium gap-2 px-6 mt-8">
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 py-2 rounded-lg opacity-70 hover:opacity-90 transition"
          >
            <item.icon size={14} />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex mt-auto gap-2">
        <Dropdown />
      </div>
    </div>
  )
}
