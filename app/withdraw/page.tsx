"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Wallet, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const initialPockets = [
  { id: "main", name: "Main Account", balance: 250000, color: "bg-blue-500" },
  { id: "savings", name: "Savings", balance: 75000, color: "bg-green-500" },
  { id: "investment", name: "Investment", balance: 100000, color: "bg-purple-500" },
]

export default function WithdrawPage() {
  const [pockets, setPockets] = useState(initialPockets)
  const [selectedPocket, setSelectedPocket] = useState(pockets[0].id)
  const [amount, setAmount] = useState("")
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Number(amount) > 0) {
      setShowModal(true) // Show the modal with the QR code
    } else {
      alert("Please enter a valid amount.")
    }
  }

  const generateQRValue = () => {
    const selectedPocketData = pockets.find(pocket => pocket.id === selectedPocket)
    return JSON.stringify({
      action: "withdraw",
      pocket: selectedPocketData?.name,
      amount: amount
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1 text-blue-600">Withdraw</h1>
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

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Withdrawal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg transition-all duration-200">
                <PlusCircle className="mr-2 h-5 w-5" /> Generate QR Code
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Modal for QR Code */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdrawal QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <QRCode value={generateQRValue()} size={200} />
              <p className="text-center text-gray-600">
                Scan this QR code to withdraw ฿{Number(amount).toLocaleString()} from your {pockets.find(pocket => pocket.id === selectedPocket)?.name}
              </p>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
