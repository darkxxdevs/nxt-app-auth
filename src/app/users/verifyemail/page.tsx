"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

export default function VerifyMAil() {
  const [token, setToken] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState(false)

  const verfiEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", {
        token,
      })
      setIsVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verfiEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        token == {token ? `${token}` : "no token"}
      </h2>

      {isVerified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/users/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error: {error}</h2>
        </div>
      )}
    </div>
  )
}
