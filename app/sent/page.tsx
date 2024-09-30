"use client"
"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, CreditCard, Smartphone, Building } from "lucide-react"
import { useRouter } from "next/navigation"

const pockets = [
  { id: "main", name: "Main Account", balance: 250000, color: "bg-blue-500" },
  { id: "savings", name: "Savings", balance: 75000, color: "bg-green-500" },
  { id: "investment", name: "Investment", balance: 100000, color: "bg-purple-500" },
]

const banks = [
  "Bangkok Bank",
  "Kasikornbank",
  "Siam Commercial Bank",
  "Krung Thai Bank",
  "Bank of Ayudhya",
  "TMB Bank",
  "CIMB Thai",
  "Kiatnakin Bank",
  "UOB Thailand",
]

export default function SentPage() {
  const [selectedPocket, setSelectedPocket] = useState(pockets[0].id)
  const [transferType, setTransferType] = useState("account")
  const [bank, setBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [promptpay, setPromptpay] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const recipient = transferType === "account" ? `${bank} - ${accountNumber}` : promptpay
    console.log(`Sending ${amount} THB from ${selectedPocket} to ${recipient} via ${transferType}`)
    // Reset form and show confirmation (in a real app, you'd want to handle this more robustly)
    setAmount("")
    setAccountNumber("")
    setPromptpay("")
    setBank("")
    alert("Money sent successfully!")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1 text-blue-600">Send Money</h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-md mx-auto w-full">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Select Pocket</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPocket} onValueChange={setSelectedPocket} className="space-y-4">
              {pockets.map((pocket) => (
                <div key={pocket.id} className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-blue-50">
                  <RadioGroupItem value={pocket.id} id={pocket.id} />
                  <Label htmlFor={pocket.id} className="flex flex-1 items-center cursor-pointer">
                    <div className={`w-12 h-12 rounded-full ${pocket.color} flex items-center justify-center mr-4`}>
                      <CreditCard className="text-white" />
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

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Transfer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Transfer Type</Label>
                <RadioGroup value={transferType} onValueChange={setTransferType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="account" id="account" />
                    <Label htmlFor="account" className="flex items-center space-x-2 cursor-pointer">
                      <Building className="h-5 w-5 text-blue-500" />
                      <span>Account Number</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="promptpay" id="promptpay" />
                    <Label htmlFor="promptpay" className="flex items-center space-x-2 cursor-pointer">
                      <Smartphone className="h-5 w-5 text-green-500" />
                      <span>PromptPay</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {transferType === "account" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bank" className="text-lg font-medium">Bank</Label>
                    <Select value={bank} onValueChange={setBank}>
                      <SelectTrigger id="bank" className="border-2 border-blue-200">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-lg font-medium">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                      className="border-2 border-blue-200"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="promptpay" className="text-lg font-medium">PromptPay Number</Label>
                  <Input
                    id="promptpay"
                    placeholder="Enter PromptPay number"
                    value={promptpay}
                    onChange={(e) => setPromptpay(e.target.value)}
                    required
                    className="border-2 border-blue-200"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-lg font-medium">Amount (THB)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="border-2 border-blue-200"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg transition-all duration-200">
                <Send className="mr-2 h-5 w-5" /> Send Money
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}