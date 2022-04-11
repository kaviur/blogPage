import React from 'react'
import Link from 'next/link'

const MenuAdmin = () => {
    return (
        <>
            <h1 className='font-faudiowide text-2xl bold py-2 px-2 border-b-2 border-gray-200 font-bold text-burnt-sienna'>Acciones</h1>
            <div className='w-full h-auto flex flex-col gap-2 mt-2 box-border'>                        
                <ul className="text-lg font-semibold text-gray-500">
                    <li className="hover:text-gray-400"><Link href="/admin">Dashboard</Link></li>
                    <li className="hover:text-gray-400"><Link href="/admin/articles">Tus publicaciones</Link></li>
                    <li className="hover:text-gray-400"><Link href="/admin/categories">Categorías creadas</Link></li>
                </ul>
            </div>
        </>
    )
}

export default MenuAdmin