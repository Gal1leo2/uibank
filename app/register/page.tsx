"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  const handleLogin = () => {
    // Handle login logic here (e.g., API call)
    // On successful login, redirect to /home
    console.log("Logging in with:", credentials);
    window.location.href = '/home'; // Redirect after login
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-2 border-blue-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">Welcome to DashCash</CardTitle>
            <CardDescription className="text-lg mt-2">
              Your trusted partner for modern banking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              onClick={() => setIsModalOpen(true)} // Open modal on button click
            >
              <LogIn className="mr-2 h-5 w-5" />
              I have an account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/signup" passHref>
              <Button
                variant="outline"
                className="w-full py-6 text-lg border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Create an account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="password"
              placeholder="Account Number"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <div className="flex justify-between">
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)} // Close modal on cancel
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center p-4 text-sm text-gray-600">
        © 2024 BankApp. All rights reserved.
      </footer>
    </div>
  );
}
