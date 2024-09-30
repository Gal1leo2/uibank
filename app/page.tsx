"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [router])

  return null
}