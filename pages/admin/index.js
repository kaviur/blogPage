import React from 'react'
import Link from 'next/link'
import MenuAdmin from '../../components/MenuAdmin'

export default function Admin() {
    return (
        <section className='pt-[6rem] h-full min-h-screen flex flex-col items-center'>
            <div className='flex flex-col md:flex-row w-full h-full my-6 gap-16'>
                <div className=' h-auto w-full md:h-full md:w-[20%] p-2 bg-slate-100'>
                    <MenuAdmin/>
                </div>
                <div className='h-auto w-full md:h-full md:min-h-screen md:w-[75%] flex flex-col gap-5 border-t-4 md:border-t-0 md:border-r-4 border-purple-600 mt-7 md:mt-0 pt-2 md:pt-0'>
                    <div className='h-auto min-h-screen flex flex-col gap-5'>                        
                        <article className='prose prose-xl leading-10 prose-p:my-16 p-5 md:0 mx-auto'>
                            <h1>Administra tus publicaciones</h1>
                        </article>                        
                    </div>
                </div>
            </div>
        </section>
    )
}