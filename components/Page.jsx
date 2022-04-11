import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function Page({children}) {
        
    return (
        <div className='min-h-screen bg-gray-200 flex flex-col'>
            <NavBar />            
            <main className="text-gray-800 h-full container mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    )
}