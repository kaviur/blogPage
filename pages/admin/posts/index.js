import React from 'react'
import Link from 'next/link'
import axios from 'axios'

export async function getServerSideProps(context){
    const secure = context.req.connection.encrypted
    const url = `${secure?"https":"http"}://${context.req.headers.host}/api/posts`

    const res = await axios.get(url)

    return {
        props:res.data
    }
}

export default function Posts({posts}) {

    console.log(posts)
    return (
        <>
            <div className='flex justify-between my-10'>
                <h1 className='text-3xl font-bold'>Publicaciones realizadas</h1>
                <Link href="/admin/posts/create"><span className='bg-yellow-200 text-black p-2 hover:bg-yellow-300 rounded-md cursor-pointer'>Crear publicación</span></Link>
            </div>

            <section className='grid grid-cols-3 gap-4'>
            {posts.map((post)=>{
                return <article className='p-5 bg-slate-50' key={post.id}>
                    <img src={post.image}></img>
                    <Link href={`/admin/posts/${post.id}`}><h3 className='text-1xl font-bold mb-3 cursor-pointer text-center mt-3'>{post.title}</h3></Link>
                    
                    <div className='flex items-center mb-5'>
                        <img className='h-6 w-6 rounded-full mr-3' src={post.author.image}></img>
                        <div className='flex flex-col justify-center'>
                            <p className='text-sm text-pink-500'>Por: {post.author.name} | {new Date(post.date).toLocaleDateString()}</p>
                            {/* <p className='text-xs'>{new Date(post.date).toLocaleTimeString()}</p> */}
                            <hr className='text-sm text-pink-600 mt-4'></hr>
                        </div>
                    </div>
                </article>
            })}
            </section>
            
        </>
    )
}