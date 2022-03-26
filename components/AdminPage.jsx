import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function AdminPage({children}) {
    const { data: session } = useSession()
    const router = useRouter()

    if(session?.user?.role==="regular"){
        router.replace("/")
    }
    return (
        <>
        <main className='flex justify-center text-gray-800'>
            <section className="w-11/12 bg-white m-3">
                {children} 
            </section>
        </main>
        </>
    )
}