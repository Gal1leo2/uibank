"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Lock, Bell, Smartphone, LogOut, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const router = useRouter()
  const [name, setName] = useState("Phuvis Kerdpramote")
  const [email, setEmail] = useState("phuvis@example.com")
  const [phoneNumber, setPhoneNumber] = useState("+66 123 456 789")
  const [language, setLanguage] = useState("en")
  const [currency, setCurrency] = useState("THB")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [strictModeEnabled, setStrictModeEnabled] = useState(false)

  const handleLogout = () => {
    // Implement logout logic here
    alert("Logging out...")
    router.push("/login") // Assuming there's a login page
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1 text-blue-600">Settings</h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="@phuviskerdpramote" />
                  <AvatarFallback>PK</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Biometric Authentication</Label>
                  <p className="text-sm text-gray-500">Use your fingerprint or face to unlock the app</p>
                </div>
                <Switch
                  checked={biometricEnabled}
                  onCheckedChange={setBiometricEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Strict Mode</Label>
                  <p className="text-sm text-gray-500">Prevent withdrawals if pocket balance is insufficient</p>
                </div>
                <Switch
                  checked={strictModeEnabled}
                  onCheckedChange={setStrictModeEnabled}
                />
              </div>
              <Button variant="outline" className="w-full">Change Password</Button>
              <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <Button variant="outline" className="w-full">Manage Notification Types</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="th">Thai</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="THB">Thai Baht (THB)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={darkModeEnabled}
                  onCheckedChange={setDarkModeEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant="destructive"
            className="w-full py-6 text-lg"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" /> Log Out
          </Button>
        </motion.div>
      </main>
    </div>
  )
}