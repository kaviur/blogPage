import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function Page({children}) {
        
    return (
        <div className='min-h-screen bg-white flex flex-col'>
            <NavBar />            
            <main className="bg-white text-gray-800 h-full container mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    )
}