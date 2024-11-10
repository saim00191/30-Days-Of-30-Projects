'use client'

import { useState, useEffect } from 'react'
import { IoReloadCircle, IoRefresh } from 'react-icons/io5' // Importing icons from react-icons

interface User {
  name: {
    first: string
    last: string
  }
  email: string
  phone: string
  picture: {
    large: string
  }
  location: {
    city: string
    country: string
  }
}

export default function RandomUserGenerator() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRandomUser = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      setUser(data.results[0])
    } catch (error) {
      console.error('Error fetching random user:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomUser()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white text-center">
          <h1 className="text-2xl font-bold">Random User Generator</h1>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-80">
            <IoReloadCircle className="w-12 h-12 text-purple-500 animate-spin" />
          </div>
        ) : user ? (
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-32 h-32 rounded-full border-4 border-purple-200"
              />
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {user.name.first} {user.name.last}
              </h2>
            </div>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <IoReloadCircle className="w-5 h-5 mr-2 text-purple-500" />
                {user.email}
              </p>
              <p className="flex items-center text-gray-600">
                <IoReloadCircle className="w-5 h-5 mr-2 text-purple-500" />
                {user.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <IoReloadCircle className="w-5 h-5 mr-2 text-purple-500" />
                {user.location.city}, {user.location.country}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">Failed to load user data.</div>
        )}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={fetchRandomUser}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
          >
            <IoRefresh className="w-5 h-5 mr-2" />
            Generate New User
          </button>
        </div>
      </div>
    </div>
  )
}
