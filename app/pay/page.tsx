"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Wallet, PlusCircle, Building2, Plus, Zap, Droplet, Wifi, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

const initialPockets = [
  { id: "main", name: "Main Account", balance: 250000, color: "bg-blue-500" },
  { id: "savings", name: "Savings", balance: 75000, color: "bg-green-500" },
  { id: "investment", name: "Investment", balance: 100000, color: "bg-purple-500" },
]

const billTypes = [
  { value: "electricity", label: "Electricity", icon: Zap },
  { value: "water", label: "Water", icon: Droplet },
  { value: "internet", label: "Internet", icon: Wifi },
  { value: "phone", label: "Phone", icon: Phone },
]

export default function BillPaymentPage() {
  const [pockets, setPockets] = useState(initialPockets)
  const [selectedPocket, setSelectedPocket] = useState(pockets[0].id)
  const [selectedBill, setSelectedBill] = useState("")
  const [billNumber, setBillNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [newPocketName, setNewPocketName] = useState("")
  const [showAddPocket, setShowAddPocket] = useState(false)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    const selectedPocketData = pockets.find(pocket => pocket.id === selectedPocket)
  
    if (!selectedPocketData) {
      setErrorMessage("Selected pocket not found.")
      return
    }
  
    // Check if the entered amount exceeds the balance in the selected pocket
    if (parseFloat(amount) > selectedPocketData.balance) {
      setErrorMessage(`Insufficient funds! Your ${selectedPocketData.name} has only ${selectedPocketData.balance.toLocaleString()} THB.`)
      return
    }
  
    // Reset error message if sufficient funds
    setErrorMessage("")
  
    // Process the payment and update the pocket balance
    const updatedPockets = pockets.map(pocket => {
      if (pocket.id === selectedPocket) {
        return { ...pocket, balance: pocket.balance - parseFloat(amount) }
      }
      return pocket
    })
    setPockets(updatedPockets)
  
    setAmount("")
    setBillNumber("")
    setSelectedBill("")
    alert("Bill payment successful!")
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1 text-blue-600">Bill Payment</h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-md mx-auto w-full">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-blue-600">Select Pocket</CardTitle>
            <Button
              onClick={handleAddPocket}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Pocket
            </Button>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPocket} onValueChange={setSelectedPocket} className="space-y-4">
              {pockets.map((pocket) => (
                <div key={pocket.id} className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-blue-50">
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
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Add New Pocket</CardTitle>
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
                <Button onClick={handleSavePocket} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save Pocket
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Bill Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Bill Type</Label>
                <Select value={selectedBill} onValueChange={setSelectedBill}>
                  <SelectTrigger className="w-full border-2 border-blue-200">
                    <SelectValue placeholder="Select a bill type" />
                  </SelectTrigger>
                  <SelectContent>
                    {billTypes.map((bill) => (
                      <SelectItem key={bill.value} value={bill.value}>
                        <div className="flex items-center space-x-2">
                          <bill.icon className="h-5 w-5" />
                          <span>{bill.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billNumber" className="text-lg font-medium">Bill Number</Label>
                <Input
                  id="billNumber"
                  placeholder="Enter bill number"
                  value={billNumber}
                  onChange={(e) => setBillNumber(e.target.value)}
                  required
                  className="border-2 border-blue-200"
                />
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
                    className="border-2 border-blue-200 pl-10 text-lg"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">฿</span>
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
                      className="border-2 border-blue-200 hover:bg-blue-100 transition-colors"
                      onClick={() => setAmount(quickAmount.toString())}
                    >
                      ฿{quickAmount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg transition-all duration-200">
                <PlusCircle className="mr-2 h-5 w-5" /> Pay Bill
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}