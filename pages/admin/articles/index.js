import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import DashboarLayout from '../../../components/DashboardLayout'
import Card from '../../../components/Card'

export async function getServerSideProps(context){
    const secure = context.req.connection.encrypted
    const url = `${secure?"https":"http"}://${context.req.headers.host}/api/articles/byAthor`

    const res = await axios.get(url)
    console.log(res)

    return {
        props:{
            articles:res.data
        }
    }
}

export default function Articles({articles}) {

    console.log(articles)
    return (
        <>
            <DashboarLayout >
                <article className=' bg-gray-100 prose prose-xl leading-10 prose-p:my-16 p-5 md:0'>
                    <div className='flex justify-between my-10'>
                        <h1 className='text-3xl font-bold'>Publicaciones realizadas</h1>
                        <Link href="/admin/articles/create"><span className='bg-yellow-200 text-black p-2 hover:bg-yellow-300 rounded-md cursor-pointer'>Crear publicación</span></Link>
                    </div>
                    <Card articles={articles} />
                </article> 
            </DashboarLayout>                                                
        </>
    )
}