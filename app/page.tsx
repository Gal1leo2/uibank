"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/register')
  }, [router])

  return null
}