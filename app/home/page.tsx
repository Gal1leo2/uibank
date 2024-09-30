"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuIcon, CreditCard, Send, Wallet, ArrowDownCircle, ArrowUpCircle, Home, PieChart, Bell, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"


export default function Component() {
    const router = useRouter()
    const handleNavigation = (path?: string) => {
        if (path) {
          router.push(path)
        }
      }
  const [activeTab, setActiveTab] = useState("Home")
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="flex justify-between items-center p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 border-2 border-blue-500">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="@phuviskerdpramote" />
            <AvatarFallback className="bg-blue-500 text-white">PK</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hi, Phuvis</h1>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">332,332 THB</div>
              <p className="text-blue-100 mt-1">+2.5% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
      {[
        { icon: Send, label: "Send", color: "bg-purple-500", path: "/sent" },
        { icon: CreditCard, label: "Bill Payment", color: "bg-green-500", path: "pay" },
        { icon: Wallet, label: "Top Up", color: "bg-yellow-500", path: "/topup" },
        { icon: ArrowDownCircle, label: "Withdraw", color: "bg-red-500", path: "/withdraw" },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center justify-center h-24 w-full ${item.color} hover:opacity-90 transition-opacity`}
          >
            <item.icon className="h-8 w-8 mb-2 text-white" />
            <span className="text-white font-medium">{item.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { icon: ArrowUpCircle, name: "Sent to Gunner", amount: "-50.00 THB", date: "Today", color: "text-red-500" },
              { icon: ArrowDownCircle, name: "Received from Bob", amount: "+1,000 THB", date: "Yesterday", color: "text-green-500" },
              { icon: CreditCard, name: "Pornhub Purchase", amount: "-$299.99", date: "2024-09-28", color: "text-red-500" },
              { icon: Wallet, name: "Salary Deposit From KMITL", amount: "+3,000,000.00 THB", date: "2024-09-25", color: "text-green-500" },
            ].map((transaction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-full ${transaction.color} bg-opacity-10`}>
                  <transaction.icon className={`h-6 w-6 ${transaction.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-800">{transaction.name}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <div className={`font-medium ${transaction.color}`}>
                  {transaction.amount}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <nav className="flex justify-around p-2">
          {[
            { icon: Home, label: "Home" },
            { icon: PieChart, label: "Statistics" },
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "Settings",path: "/setting" },
            
          ].map((item, index) => (
            <Button

              key={index}
              variant="ghost"
              className={`flex flex-col items-center ${activeTab === item.label ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
              {activeTab === item.label && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
            </Button>
          ))}
        </nav>
      </footer>
    </div>
  )
}