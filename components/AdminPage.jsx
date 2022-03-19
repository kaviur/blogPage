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
        <section className="bg-white p-7 text-gray-800">
            <ul className='flex px-7 py-5 gap-5'>
                <li><Link href="/admin">Admin</Link></li>
                <li><Link href="/admin/posts">Posts</Link></li>
                <li><Link href="/admin/articles">Articles</Link></li>
                <li><Link href="/admin/articles/create">Create Article</Link></li>
                <li><Link href="/admin/categories">Categories</Link></li>
                <li><Link href="/admin/comments">Comments</Link></li>
            </ul>
        </section>

        <main className='flex justify-center text-gray-800'>
            <section className="w-9/12">
                {children} 
            </section>
        </main>
        </>
    )
}