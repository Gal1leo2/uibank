"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Plus, Share2, Lock, Unlock, Target, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

type Pocket = {
  id: string
  name: string
  balance: number
  isLocked: boolean
  sharedWith: string[]
  target: number | null
  lockOnTarget: boolean
}

export default function ManagePocketsPage() {
  const [pockets, setPockets] = useState<Pocket[]>([
    { id: "1", name: "Main Account", balance: 250000, isLocked: false, sharedWith: [], target: null, lockOnTarget: false },
    { id: "2", name: "Savings", balance: 175000, isLocked: false, sharedWith: ["Alice"], target: 100000, lockOnTarget: true },
    { id: "3", name: "Emergency Fund", balance: 50000, isLocked: true, sharedWith: [], target: 100000, lockOnTarget: false },
  ])
  const [newPocketName, setNewPocketName] = useState("")
  const [shareEmail, setShareEmail] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [lockOnTarget, setLockOnTarget] = useState(false)
  const [dailyPocketId, setDailyPocketId] = useState<string | null>(null)
  const [isDailyPocketMode, setIsDailyPocketMode] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleCreatePocket = () => {
    if (newPocketName) {
      const newPocket: Pocket = {
        id: (pockets.length + 1).toString(),
        name: newPocketName,
        balance: 0,
        isLocked: false,
        sharedWith: [],
        target: null,
        lockOnTarget: false,
      }
      setPockets([...pockets, newPocket])
      setNewPocketName("")
      toast({
        title: "Pocket Created",
        description: `Your new pocket "${newPocketName}" has been created successfully.`,
      })
    }
  }

  const handleToggleLock = (id: string) => {
    const pocket = pockets.find(p => p.id === id)
    if (pocket && pocket.target && pocket.balance < pocket.target) {
      toast({
        title: "Cannot Unlock Pocket",
        description: "Please call callcenter to unlock. The balance is less than the target amount.",
        variant: "destructive",
      })
      return
    }

    setPockets(pockets.map(pocket => 
      pocket.id === id ? { ...pocket, isLocked: !pocket.isLocked } : pocket
    ))
    toast({
      title: pocket?.isLocked ? "Pocket Unlocked" : "Pocket Locked",
      description: `Your pocket "${pocket?.name}" has been ${pocket?.isLocked ? 'unlocked' : 'locked'}.`,
    })
  }

  const handleSharePocket = (id: string) => {
    if (shareEmail) {
      setPockets(pockets.map(pocket => 
        pocket.id === id ? { ...pocket, sharedWith: [...pocket.sharedWith, shareEmail] } : pocket
      ))
      setShareEmail("")
      const pocket = pockets.find(p => p.id === id)
      toast({
        title: "Pocket Shared",
        description: `Your pocket "${pocket?.name}" has been shared with ${shareEmail}.`,
      })
    }
  }

  const handleSetTarget = (id: string) => {
    if (targetAmount) {
      const target = parseFloat(targetAmount)
      setPockets(pockets.map(pocket => 
        pocket.id === id ? { ...pocket, target: target, lockOnTarget: lockOnTarget } : pocket
      ))
      setTargetAmount("")
      setLockOnTarget(false)
      const pocket = pockets.find(p => p.id === id)
      toast({
        title: "Target Set",
        description: `Target for "${pocket?.name}" has been set to ${target.toLocaleString()} THB. ${lockOnTarget ? 'Pocket will lock when target is reached.' : ''}`,
      })
    }
  }

  const handleSetDailyPocket = (id: string) => {
    setDailyPocketId(id)
    setIsDailyPocketMode(true)
    const pocket = pockets.find(p => p.id === id)
    toast({
      title: "Daily Pocket Set",
      description: `"${pocket?.name}" has been set as your daily pocket. You can only use this pocket today.`,
    })
  }

  const handleToggleDailyPocketMode = () => {
    setIsDailyPocketMode(!isDailyPocketMode)
    if (!isDailyPocketMode) {
      toast({
        title: "Daily Pocket Mode Activated",
        description: "You can now only use your selected daily pocket.",
      })
    } else {
      setDailyPocketId(null)
      toast({
        title: "Daily Pocket Mode Deactivated",
        description: "You can now use all your pockets.",
      })
    }
  }

  const simulateDeposit = (id: string, amount: number) => {
    if (isDailyPocketMode && id !== dailyPocketId) {
      toast({
        title: "Transaction Blocked",
        description: "You can only use your daily pocket in Daily Pocket Mode.",
        variant: "destructive",
      })
      return
    }

    setPockets(pockets.map(pocket => {
      if (pocket.id === id) {
        const newBalance = pocket.balance + amount
        const shouldLock = pocket.lockOnTarget && pocket.target && newBalance >= pocket.target
        return { 
          ...pocket, 
          balance: newBalance,
          isLocked: shouldLock ? true : pocket.isLocked
        }
      }
      return pocket
    }))

    const updatedPocket = pockets.find(p => p.id === id)
    if (updatedPocket?.lockOnTarget && updatedPocket.target && updatedPocket.balance + amount >= updatedPocket.target) {
      toast({
        title: "Pocket Locked",
        description: `Your pocket "${updatedPocket.name}" has been automatically locked as it reached the target.`,
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1 text-purple-600">Manage Pockets</h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-purple-600 flex justify-between items-center">
              Daily Pocket Mode
              <Switch
                checked={isDailyPocketMode}
                onCheckedChange={handleToggleDailyPocketMode}
                aria-label="Toggle Daily Pocket Mode"
              />
            </CardTitle>
          </CardHeader>
          {isDailyPocketMode && (
            <CardContent>
              <RadioGroup value={dailyPocketId || ""} onValueChange={handleSetDailyPocket}>
                {pockets.map((pocket) => (
                  <div key={pocket.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={pocket.id} id={`radio-${pocket.id}`} />
                    <Label htmlFor={`radio-${pocket.id}`}>{pocket.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          )}
        </Card>

        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-purple-600 flex justify-between items-center">
              Create New Pocket
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" /> Create Pocket
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Pocket</DialogTitle>
                    <DialogDescription>
                      Give your new pocket a name. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newPocketName}
                        onChange={(e) => setNewPocketName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreatePocket}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
        </Card>

        {pockets.map((pocket) => (
          <Card key={pocket.id} className={`border-2 ${isDailyPocketMode && pocket.id === dailyPocketId ? 'border-green-400' : 'border-purple-200'} shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-xl text-purple-600 flex justify-between items-center">
                {pocket.name}
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Share Pocket</DialogTitle>
                        <DialogDescription>
                          Enter the email of the person you want to share this pocket with.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="shareEmail" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="shareEmail"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleSharePocket(pocket.id)}>Share</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Target className="mr-2 h-4 w-4" /> Set Target
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Set Target</DialogTitle>
                        <DialogDescription>
                          Set a target amount for this pocket.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="targetAmount" className="text-right">
                            Target (THB)
                          </Label>
                          <Input
                            id="targetAmount"
                            type="number"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="lockOnTarget"
                            checked={lockOnTarget}
                            onCheckedChange={(checked) => setLockOnTarget(checked as boolean)}
                          />
                          <Label htmlFor="lockOnTarget">Lock pocket when target is reached</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleSetTarget(pocket.id)}>Set Target</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Switch
                    checked={pocket.isLocked}
                    onCheckedChange={() => handleToggleLock(pocket.id)}
                    aria-label={`${pocket.isLocked ? 'Unlock' : 'Lock'} pocket`}
                  />
                  {pocket.isLocked ? (
                    <Lock className="h-4 w-4 text-red-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Balance: {pocket.balance.toLocaleString()} THB</p>
              {pocket.target && (
                <p className="text-sm text-gray-600 mt-1">
                  Target: {pocket.target.toLocaleString()} THB
                  {pocket.lockOnTarget && " (Will lock when reached)"}
                
                </p>
              )}
              {pocket.sharedWith.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Shared with: {pocket.sharedWith.join(", ")}
                </p>
              )}
              <div className="mt-4">
                <Button 
                  size="sm" 
                  onClick={() => simulateDeposit(pocket.id, 10000)}
                  disabled={isDailyPocketMode && pocket.id !== dailyPocketId}
                >
                  Simulate 10,000 THB Deposit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
      <Toaster />
    </div>
  )
}