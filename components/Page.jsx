import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import AdminPage from './AdminPage'
import {FaUser} from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import {IoMdArrowDropdown} from 'react-icons/io'
import { signOut,signIn } from 'next-auth/react'

export default function Page({children}) {
    const { data: session } = useSession()
    const [options,setOptions] = useState(false)
    const [showCats,setShowCats] = useState(false)
    
    return (
        <div className='min-h-screen bg-white flex flex-col'>
            <nav className="bg-slate-300 text-gray-800 flex justify-center items-center">
                <ul className='flex gap-5 w-11/12'>
                    <Link className='flex gap-5 w-11/12' href="/">My Blog</Link>
                    {!session?.user?.email?<li className='ml-auto mr-1 text-gray-500' onClick={() => signIn()}>Login</li>
                    :<li className='ml-auto'><span className='mr-1'>{session?.user?.name}</span><button className='p-1 text-slate-400'><FaUser onClick={()=>{setOptions(!options)}} className='w-4 h-4 inline-block'/><IoMdArrowDropdown onClick={()=>{setOptions(!options)}} className='w-5 h-5 inline-block'/></button></li>}
                </ul>
                {session?.user?.role==="admin"
                ?
                <ul className={`${options?"block":"hidden"} absolute right-7 top-10 bg-white p-2`}>
                    <li><Link href="/admin">Dashboard</Link></li>
                    <li><Link href="/admin/articles">Tus publicaciones</Link></li>
                    <li><Link href="/admin/articles/create">Crea un artículo</Link></li>
                    <li><Link href="/admin/categories">Categorias</Link></li>
                    <li><Link href="/admin/comments">Commentarios</Link></li>
                    <li className='hover:bg-yellow-100 hover:text-gray-800 p-3 pl-20'>
                        <button className='flex items-center gap-3' onClick={() => signOut()}>Salir</button>
                    </li>
                </ul>
                :
                <ul className={`${options?"block":"hidden"} absolute right-7 top-20 bg-white p-2`}>
                    <li><Link href="/subscribers/novedades">Novedades</Link></li>
                    <li className='hover:bg-yellow-100 hover:text-gray-800 p-3 pl-20'>
                        <button className='flex items-center gap-3' onClick={() => signOut()}>Salir</button>
                    </li>
                </ul>
                }
            </nav>
            <nav className="flex flex-row content-center w-full p-2 mx-auto font-semibold bg-white text-pink-400 justify-evenly shadow-md shadow-gray">
                <ul className='flex px-7 py-2 gap-5 float-right bg-white'>
                    <li><Link href="/articles?filter=new">Lo más reciente</Link></li>
                    <li><Link href="/articles?filter=highlight">Destacados</Link></li>
                    {!session?.user?.email&&<li><Link href="/subscriber/register">Suscribirse</Link></li>}
                    <li className='menuCategories' onMouseOver={()=>{setShowCats(true)}}>Categorias <IoMdArrowDropdown onClick={()=>{setShowCats(!showCats)}} className='w-5 h-5 inline-block'/></li>
                    <li><Link href='/articles'>Posts</Link></li>
                    <li>Sobre mí</li>
                    <li>Tienda</li>
                    <li>Contacto</li>
                    <li><FaSearch size={20} /></li>                    
                </ul>
            </nav>
            <nav onMouseLeave={()=>{setShowCats(false)}} className={`${showCats?"block":"hidden"} relative top-30 bg-white p-2 flex flex-row content-center w-full mx-auto text-gray-800 justify-evenly shadow-md shadow-gray`}>
                <ul>Patronaje</ul>
                <ul>Tutoiales</ul>
                <ul>otro</ul>
                <ul>ummmm</ul>
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