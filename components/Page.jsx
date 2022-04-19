import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import Head from 'next/head'

export default function Page({children}) {
        
    return (
        <div className='min-h-screen flex flex-col'>
            <Head>
                <title>Mi centro de recursos educativos</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel='icon' href='/read.png'/>
            </Head>
            <NavBar />            
            <main className="text-gray-800 h-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}