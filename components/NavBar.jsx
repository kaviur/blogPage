import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import {IoMdArrowDropdown} from 'react-icons/io'
import { signOut,signIn } from 'next-auth/react'
import { setCookies,getCookie } from 'cookies-next'

const NavBar = () => {

    const { data: session } = useSession()
    const [options,setOptions] = useState(false)
    const [showCats,setShowCats] = useState(false)

    if(session?.user?.email){
        setCookies("email",session?.user?.email)
    }

    return (
    <div>
        <nav className="bg-pink-100 text-gray-900 flex justify-center items-center">
            {session?.user?.role==="admin"
            ?
            <ul className={`${options?"block":"hidden"} absolute right-7 top-10 bg-white p-2`}>
                <li><Link href="/admin">Dashboard</Link></li>
                <li><Link href="/admin/articles">Tus publicaciones</Link></li>
                <li><Link href="/admin/articles/create">Crea un artículo</Link></li>
                <li><Link href="/admin/categories">Categorias</Link></li>
                <li className='hover:bg-yellow-100 hover:text-gray-800 p-3 pl-20'>
                    <button className='flex items-center gap-3' onClick={() => signOut()}>Salir</button>
                </li>
            </ul>
            :
            <ul className={`${options?"block":"hidden"} absolute right-7 top-20 bg-white p-2`}>
                {/* <li><Link href="/subscribers/novedades">Novedades</Link></li>
                <li className='hover:bg-yellow-100 hover:text-gray-800 p-3 pl-20'>
                    <button className='flex items-center gap-3' onClick={() => signOut()}>Salir</button>
                </li> */}
                {/* TODO:MODIFICAR ESTE MENÚ DEPENDIENDO DEL ROL: lo dejé así para micentroderecursos */}
                <li><Link href="/admin">Dashboard</Link></li>
                <li><Link href="/admin/articles">Tus publicaciones</Link></li>
                <li><Link href="/admin/articles/create">Crea un artículo</Link></li>
                <li><Link href="/admin/categories">Categorias</Link></li>
                <li className='hover:bg-yellow-100 hover:text-gray-800 p-3 pl-20'>
                    <button className='flex items-center gap-3' onClick={() => signOut()}>Salir</button>
                </li>
            </ul>
            }
        </nav>
        <nav className="flex flex-row content-center w-full p-2 mx-auto bg-pink-500 text-gray-900 shadow-md shadow-gray">
            <div className="flex gap-5 w-11/12 justify-between mx-auto items-center">
                <div className="flex gap-5 text-white text-2xl items-center">
                    <img src="/bookshelf.png" alt="" width={70} height={70} />
                    <Link className='' href="/">Mi centro de recursos educativos</Link>  
                </div>               
                
                <div className=" text-md">
                    <ul className='flex px-7 py-2 gap-5'>
                        <li><Link href="/articles?filter=new">Juegos</Link></li>
                        <li><Link href="/articles?filter=highlight">Experimentos</Link></li>
                        {/* {!session?.user?.email&&<li><Link href="/subscriber/register">Suscribirse</Link></li>} */}
                        <li className='menuCategories' onMouseOver={()=>{setShowCats(true)}}>Categorias <IoMdArrowDropdown onClick={()=>{setShowCats(!showCats)}} className='w-5 h-5 inline-block'/></li>
                        <li><Link href='/articles'>Posts</Link></li>
                        <li><FaSearch size={20} /></li> 
                        {!session?.user?.email?<li className='ml-auto mr-1 text-gray-500 cursor-pointer' onClick={() => signIn()}>Login</li>
                        :<li className='ml-auto'><span className='mr-1'>{session?.user?.name}</span><button className='p-1 text-slate-400'><FaUser onClick={()=>{setOptions(!options)}} className='w-4 h-4 inline-block'/><IoMdArrowDropdown onClick={()=>{setOptions(!options)}} className='w-5 h-5 inline-block'/></button></li>}                   
                    </ul>
                </div>
            </div>
        </nav>
        <nav onMouseLeave={()=>{setShowCats(false)}} className={`${showCats?"block":"hidden"} relative top-30 bg-white p-2 flex flex-row content-center w-full mx-auto text-gray-800 justify-evenly shadow-md shadow-gray`}>
            <ul>5-8 años</ul>
            <ul>7-9 años</ul>
            <ul>10-14 años</ul>
            <ul>Juegos</ul>
        </nav>
    </div>
  )
}

export default NavBar