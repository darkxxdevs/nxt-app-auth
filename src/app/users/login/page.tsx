"use client"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import dynamic from "next/dynamic"
import React, { useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [isvisible, setVisibility] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setVisibility(false)
  }, [])

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/user/login", user)
      toast.success("Logged in successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      router.push("/users/profile")
    } catch (error: any) {
      toast.error("Incorrect email or username!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {loading ? (
        <h1>processing.....</h1>
      ) : (
        <div className="card  w-[30%] h-[65%] p-3">
          <div className="title w-full text-center font-bold text-3xl mb-4">
            LOGIN
          </div>
          <div className="field w-full flex flex-col gap-1">
            <label htmlFor="email">email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email address"
              className="p-3 rounded-lg text-black outline-none"
              autoComplete="off"
            />
          </div>
          <div className="field w-full flex flex-col gap-1">
            <label htmlFor="password ">password</label>
            <span className="pass flex items-center bg-white rounded-lg">
              <input
                type={isvisible ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="p-3 rounded-lg text-black w-[90%] outline-none bg-transparent"
                autoComplete="off"
              />
              {isvisible ? (
                <button
                  onClick={() => setVisibility(false)}
                  className="bg-transparent text-black rounded-md font-bold"
                >
                  <Eye />
                </button>
              ) : (
                <button
                  onClick={() => setVisibility(true)}
                  className="bg-transparent text-black rounded-md font-bold"
                >
                  <EyeOff />
                </button>
              )}
            </span>
          </div>
          <span className="pt-5 text-sm mb-6">
            don't have an accout ?
            <Link href={"/users/signup"} className="text-zinc-400">
              Signup
            </Link>
          </span>

          <div className="btn flex items-center w-full mt-[3%] justify-center">
            <button
              onClick={onLogin}
              className={`${
                buttonDisabled ? "line-through" : "no-underline"
              } bg-slate-400 rounded-md font-bold p-5 w-96`}
            >
              <span className="font-bold">logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Login), { ssr: false })
