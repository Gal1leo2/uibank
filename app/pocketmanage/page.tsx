'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Plus, Share2, Lock, Unlock, Target, Calendar, Flame } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

type Pocket = {
  id: string
  name: string
  balance: number
  isLocked: boolean
  sharedWith: string[]
  target: number | null
  lockOnTarget: boolean
  dailyGoalEnabled: boolean
  dailyGoal: number
  dailyGoalProgress: number
  streak: number
  lastDepositDate: string | null
  
}

export default function EnhancedPocketManager() {
  const [pockets, setPockets] = useState<Pocket[]>([
    { id: "1", name: "Main Account", balance: 250000, isLocked: false, sharedWith: [], target: null, lockOnTarget: false, dailyGoalEnabled: false, dailyGoal: 100, dailyGoalProgress: 0, streak: 0, lastDepositDate: null },
    { id: "2", name: "Savings", balance: 175000, isLocked: false, sharedWith: ["Alice"], target: 100000, lockOnTarget: true, dailyGoalEnabled: true, dailyGoal: 200, dailyGoalProgress: 50, streak: 3, lastDepositDate: "2023-07-14" },
    { id: "3", name: "Emergency Fund", balance: 50000, isLocked: true, sharedWith: [], target: 100000, lockOnTarget: false, dailyGoalEnabled: true, dailyGoal: 300, dailyGoalProgress: 150, streak: 1, lastDepositDate: "2023-07-14" },
  ])
  const [newPocketName, setNewPocketName] = useState("")
  const [shareEmail, setShareEmail] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [lockOnTarget, setLockOnTarget] = useState(false)
  const [dailyPocketId, setDailyPocketId] = useState<string | null>(null)
  const [isDailyPocketMode, setIsDailyPocketMode] = useState(false)
  const [newDailyGoal, setNewDailyGoal] = useState<string>("")
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
        dailyGoalEnabled: false,
        dailyGoal: 0,
        dailyGoalProgress: 0,
        streak: 0,
        lastDepositDate: null
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

  const handleSetDailyGoal = (id: string) => {
    if (newDailyGoal) {
      const goal = parseFloat(newDailyGoal)
      setPockets(pockets.map(pocket => 
        pocket.id === id ? { ...pocket, dailyGoal: goal, dailyGoalProgress: 0, dailyGoalEnabled: true } : pocket
      ))
      setNewDailyGoal("")
      const pocket = pockets.find(p => p.id === id)
      toast({
        title: "Daily Goal Set",
        description: `Daily goal for "${pocket?.name}" has been set to ${goal.toLocaleString()} THB and enabled.`,
      })
    }
  }

  const handleToggleDailyGoal = (id: string) => {
    setPockets(pockets.map(pocket => 
      pocket.id === id ? { ...pocket, dailyGoalEnabled: !pocket.dailyGoalEnabled, streak: 0, dailyGoalProgress: 0 } : pocket
    ))
    const pocket = pockets.find(p => p.id === id)
    toast({
      title: pocket?.dailyGoalEnabled ? "Daily Goal Disabled" : "Daily Goal Enabled",
      description: `Daily goal for "${pocket?.name}" has been ${pocket?.dailyGoalEnabled ? 'disabled' : 'enabled'}. Streak has been reset.`,
    })
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

    const today = new Date().toISOString().split('T')[0]

    setPockets(pockets.map(pocket => {
      if (pocket.id === id) {
        const newBalance = pocket.balance + amount
        const shouldLock = pocket.lockOnTarget && pocket.target && newBalance >= pocket.target
        let newDailyGoalProgress = pocket.dailyGoalProgress
        let newStreak = pocket.streak
        let newLastDepositDate = pocket.lastDepositDate

        if (pocket.dailyGoalEnabled) {
          newDailyGoalProgress = Math.min(pocket.dailyGoalProgress + amount, pocket.dailyGoal)
          const isGoalMet = newDailyGoalProgress >= pocket.dailyGoal
          const isNewStreak = pocket.lastDepositDate !== today
          newStreak = isGoalMet ? (isNewStreak ? pocket.streak + 1 : pocket.streak) : 0
          newLastDepositDate = today
        }

        return { 
          ...pocket, 
          balance: newBalance,
          isLocked: shouldLock ? true : pocket.isLocked,
          dailyGoalProgress: newDailyGoalProgress,
          streak: newStreak,
          lastDepositDate: newLastDepositDate
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

    if (updatedPocket?.dailyGoalEnabled && updatedPocket.dailyGoalProgress + amount >= updatedPocket.dailyGoal) {
      toast({
        title: "Daily Goal Achieved",
        description: `Congratulations! You've reached your daily goal for "${updatedPocket.name}". Your streak is now ${updatedPocket.streak + 1} days!`,
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" /> Set Daily Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Set Daily Goal</DialogTitle>
                        <DialogDescription>
                          Set a daily savings goal for this pocket.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="dailyGoal" className="text-right">
                            Daily Goal (THB)
                          </Label>
                          <Input
                            id="dailyGoal"
                            type="number"
                            value={newDailyGoal}
                            onChange={(e) => setNewDailyGoal(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleSetDailyGoal(pocket.id)}>Set Goal</Button>
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
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium">Daily Goal</p>
                <Switch
                  checked={pocket.dailyGoalEnabled}
                  onCheckedChange={() => handleToggleDailyGoal(pocket.id)}
                  aria-label={`${pocket.dailyGoalEnabled ? 'Disable' : 'Enable'} daily goal`}
                />
              </div>
              {pocket.dailyGoalEnabled && (
                <>
                  <Progress value={(pocket.dailyGoalProgress / pocket.dailyGoal) * 100} className="mt-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    {pocket.dailyGoalProgress.toLocaleString()} / {pocket.dailyGoal.toLocaleString()} THB
                  </p>
                  <div className="mt-2 flex items-center">
                    <Flame className="h-4 w-4 text-orange-500 mr-2" />
                    <p className="text-sm font-medium">Streak: {pocket.streak} days</p>
                  </div>
                </>
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