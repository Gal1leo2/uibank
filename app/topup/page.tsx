"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Wallet, PlusCircle, Building2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

const initialPockets = [
  { id: "main", name: "Main Account", balance: 250000, color: "bg-blue-500" },
  { id: "savings", name: "Savings", balance: 75000, color: "bg-green-500" },
  { id: "investment", name: "Investment", balance: 100000, color: "bg-purple-500" },
]

const topUpMethods = [
  { id: "bank", name: "Bank Transfer", icon: Building2 },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
]

export default function TopUpPage() {
  const [pockets, setPockets] = useState(initialPockets)
  const [selectedPocket, setSelectedPocket] = useState(pockets[0].id)
  const [topUpMethod, setTopUpMethod] = useState("bank")
  const [amount, setAmount] = useState("")
  const [newPocketName, setNewPocketName] = useState("")
  const [showAddPocket, setShowAddPocket] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Topping up ${amount} THB to ${selectedPocket} via ${topUpMethod}`)
    setAmount("")
    alert("Top-up successful!")
  }

  const handleAddPocket = () => {
    setShowAddPocket(true)
  }

  const handleSavePocket = () => {
    if (newPocketName.trim()) {
      const newPocket = {
        id: newPocketName.toLowerCase().replace(/\s+/g, "-"),
        name: newPocketName,
        balance: 0,
        color: "bg-gray-500", // You can modify this or make it dynamic
      }
      setPockets([...pockets, newPocket])
      setSelectedPocket(newPocket.id)
      setNewPocketName("")
      setShowAddPocket(false)
      alert("New pocket added!")
    } else {
      alert("Please enter a valid pocket name.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-white">
      <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1 text-green-600">Top Up</h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-md mx-auto w-full">
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-green-600">Select Pocket</CardTitle>
            <Button
              onClick={handleAddPocket}
              variant="outline"
              size="sm"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Pocket
            </Button>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPocket} onValueChange={setSelectedPocket} className="space-y-4">
              {pockets.map((pocket) => (
                <div key={pocket.id} className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-green-50">
                  <RadioGroupItem value={pocket.id} id={pocket.id} />
                  <Label htmlFor={pocket.id} className="flex flex-1 items-center cursor-pointer">
                    <div className={`w-12 h-12 rounded-full ${pocket.color} flex items-center justify-center mr-4`}>
                      <Wallet className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{pocket.name}</p>
                      <p className="text-sm text-gray-500">{pocket.balance.toLocaleString()} THB</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Add New Pocket Form */}
        {showAddPocket && (
          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-green-600">Add New Pocket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="newPocketName" className="text-lg font-medium">Pocket Name</Label>
                <Input
                  id="newPocketName"
                  placeholder="Enter pocket name"
                  value={newPocketName}
                  onChange={(e) => setNewPocketName(e.target.value)}
                />
                <Button onClick={handleSavePocket} className="bg-green-600 hover:bg-green-700 text-white">
                  Save Pocket
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Top-Up Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Top-Up Method</Label>
                <RadioGroup value={topUpMethod} onValueChange={setTopUpMethod} className="flex flex-col space-y-2">
                  {topUpMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center space-x-2 cursor-pointer">
                        <method.icon className="h-5 w-5 text-green-500" />
                        <span>{method.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-lg font-medium">Amount (THB)</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="border-2 border-green-200 pl-10 text-lg"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">฿</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Quick Amounts</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 2000, 5000, 10000, 20000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      type="button"
                      variant="outline"
                      className="border-2 border-green-200 hover:bg-green-100 transition-colors"
                      onClick={() => setAmount(quickAmount.toString())}
                    >
                      ฿{quickAmount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg transition-all duration-200">
                <PlusCircle className="mr-2 h-5 w-5" /> Top Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
