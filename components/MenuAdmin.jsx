import React from 'react'
import Link from 'next/link'

const MenuAdmin = () => {
    return (
        <>
            <h1 className='font-faudiowide text-lg py-2 px-2 border-b-2 border-purple-600'>Acciones</h1>
            <div className='w-full h-auto flex flex-col gap-2 mt-2 box-border'>                        
                <ul className="">
                    <li><Link href="/admin">Dashboard</Link></li>
                    <li><Link href="/admin/articles">Tus publicaciones</Link></li>
                    <li><Link href="/admin/categories">Categorías creadas</Link></li>
                </ul>
            </div>
        </>
    )
}

export default MenuAdmin