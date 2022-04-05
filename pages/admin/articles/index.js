import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import MenuAdmin from '../../../components/MenuAdmin'

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

        <section className='pt-[3rem] h-full min-h-screen flex flex-col items-center'>
            <div className='flex flex-col md:flex-row w-full h-full my-6 gap-16'>
                <div className=' h-auto w-full md:h-full md:w-[20%] p-2 bg-slate-100'>
                    <MenuAdmin/>
                </div>
                <div className='h-auto w-full md:h-full md:min-h-screen md:w-[75%] flex flex-col gap-5 border-t-4 md:border-t-0 mt-7 md:mt-0 pt-2 md:pt-0'>
                    <div className='h-auto min-h-screen flex flex-col gap-5'>                        
                        <article className=' bg-gray-100 prose prose-xl leading-10 prose-p:my-16 p-5 md:0'>
                            <div className='flex justify-between my-10'>
                                <h1 className='text-3xl font-bold'>Publicaciones realizadas</h1>
                                <Link href="/admin/articles/create"><span className='bg-yellow-200 text-black p-2 hover:bg-yellow-300 rounded-md cursor-pointer'>Crear publicación</span></Link>
                            </div>

                            <section className='grid grid-cols-3 gap-4'>
                            {articles.map((post)=>{
                                return <article className='bg-white w-[300px] p-4 h-[320px] rounded-md flex flex-col justify-center transition-shadow duration-700 shadow-lg shadow-black hover:shadow-sm' key={post.id}>
                                    <img src={post.image}></img>
                                    <Link href={`/admin/posts/${post.id}`}><h3 className='text-1xl font-bold mb-3 cursor-pointer text-center mt-3'>{post.title}</h3></Link>
                                </article>
                            })}
                            </section>
                        </article>                        
                    </div>
                </div>
            </div>
        </section>            
        </>
    )
}