"use client";
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
        console.log("Logging in with:", credentials);
        window.location.href = '/home'; // Redirect after login
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <main className="flex-1 flex items-center justify-center p-6">
                <Card className="w-full max-w-lg border-0 shadow-2xl rounded-2xl bg-white overflow-hidden">
                    <CardHeader className="text-center p-8 bg-blue-50">
                        <CardTitle className="text-4xl font-extrabold text-blue-700">Welcome to DashCash</CardTitle>
                        <CardDescription className="text-lg mt-4 text-blue-500">
                            Your trusted partner for modern banking
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8 mb-5">
                        <Button
                            className="w-full py-5 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <LogIn className="mr-2  h-6 w-6" />
                            I have an account
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                        <Link href="/signup" passHref>
                            <Button
                                variant="outline"
                                className="w-full py-5 text-lg font-semibold border-2 border-blue-300 text-blue-600 hover:bg-blue-100 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                <UserPlus className="mr-2 h-6 w-6" />
                                Create an account
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </main>

            {/* Login Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
                        <input
                            type="password"
                            placeholder="Account Number"
                            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                        <div className="flex justify-between">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                onClick={handleLogin}
                            >
                                Log In
                            </Button>
                            <Button
                                variant="outline"
                                className="text-gray-600 hover:text-gray-800 px-6 py-3 border border-gray-300 rounded-lg transition-all duration-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="text-center p-6 text-sm text-gray-500 bg-gray-50 shadow-inner">
                © 2024 DashCash. All rights reserved. <br />
                “This App Serves as a Tutorial (Final Project) for Software Engineering, Business Analysis, and Database Systems Courses.”
                <br />
                <b>Computer Science, KMITL.</b>
            </footer>

        </div>
    );
}
