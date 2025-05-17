import { Logo, Notification, Search } from "./icons"
import { DropdownMenuCheckboxes } from "./drop-menu.client"
import {
  Columns2,
  Package,
  WalletCards,
  UsersRound,
  Activity,
  DollarSign,
  Star,
  Settings,
} from "lucide-react"

const navigationItems = [
  { href: "/", icon: Columns2, label: "Home" },
  { href: "/products", icon: Package, label: "Products" },
  { href: "/benefits", icon: Star, label: "Benefits" },
  { href: "/customers", icon: UsersRound, label: "Customers" },
  { href: "/sales", icon: WalletCards, label: "Sales" },
  { href: "/analytics", icon: Activity, label: "Analytics" },
  { href: "/finance", icon: DollarSign, label: "Finance" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export default function Sidebar() {
  return (
    <div className="w-1/6 flex flex-col p-2 bg-inherit">
      <div className="flex flex-row justify-between items-center gap-2">
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
      <nav className="flex flex-col text-white text-sm font-medium gap-2 mt-8">
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg opacity-70 hover:opacity-90 transition"
          >
            <item.icon size={18} />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex mt-auto gap-2">
        <DropdownMenuCheckboxes />
      </div>
    </div>
  )
}
