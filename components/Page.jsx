import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import AdminPage from './AdminPage'
import {FaUser} from 'react-icons/fa'
import {GoSignOut} from 'react-icons/go'
import { signOut,signIn } from 'next-auth/react'

export default function Page({children}) {
    const { data: session } = useSession()
    const [options,setOptions] = useState(false)
    return (
        <div className='min-h-screen bg-white flex flex-col'>
            <nav className="bg-white p-7 text-gray-800">
                <ul className='flex gap-5 items-center'>
                    <Link href="/">Home</Link>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    {session?.user?.role==="admin"&&<Link href="/admin">Admin</Link>}
                    {!session?.user?.email?<button onClick={() => signIn()}>Sign in</button>
                    :<li className='ml-auto'><span className='mr-2'>{session?.user?.name}</span><button className='bg-slate-700 rounded-full p-2'><FaUser onClick={()=>{setOptions(!options)}} className='w-5 h-5'/></button></li>}
                </ul>
                <ul className={`${options?"block":"hidden"} absolute right-7 top-20 bg-white p-2`}>
                    <li className='hover:bg-yellow-100 hover:text-gray-800 p-3 pl-20'>
                        <button className='flex items-center gap-3' onClick={() => signOut()}><GoSignOut/>Sign out</button>

                    </li>
                </ul>
            </nav>
            {session?.user?.role==="admin"?<AdminPage>{children}</AdminPage>:
            <main className="bg-white text-gray-800 h-full max-w-screen-2xl mx-auto">
                {children}
            </main>}
            <footer className="p-10 mt-auto bg-pink-200">
                <ul className='flex gap-5'>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                </ul>
            </footer>
        </div>
    )
}