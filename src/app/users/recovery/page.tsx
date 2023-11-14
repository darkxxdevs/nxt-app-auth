"use client"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import { Mail } from "lucide-react"

function Recovery() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setDisabled(email.length === 0)
  }, [email])

  const verifyEmail = async () => {
    try {
      if (email.length > 0) {
        setLoading(true)
        const response = await axios.post("/api/user/verifyUser", {
          email: email,
        })
        setSuccess(response.data.success)
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container pl-[18%] flex items-center justify-center h-[100vh] w-[100vw]">
        <div className="card h-[35%] rounded-2xl border-[#3f3e3edd]  w-[30%] border-2 p-3 flex flex-col justify-center items-center">
          <Mail />
          <h2>Check your email!</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="page flex items-center justify-center h-[100vh] w-full">
      {loading ? (
        "processing..."
      ) : (
        <div className="card h-[35%] rounded-2xl border-[#3f3e3edd]  w-[30%] border-2 p-3 flex flex-col items-center">
          <h2 className="title font-bold">RECOVERY</h2>
          <div className="form h-[90%] w-full p-6 flex-col gap-4 flex">
            <label htmlFor="email">Enter verification email: </label>
            <input
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black p-4 outline-none rounded-2xl"
            />
          </div>
          <button
            onClick={verifyEmail}
            className={`align-middle mb-10 bg-slate-300 w-[70%] text-black p-5 rounded-2xl font-bold ${
              loading || disabled ? "line-through" : ""
            }`}
            disabled={disabled}
          >
            Get Mail
          </button>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Recovery), { ssr: false })
