import React from 'react'
import Link from 'next/link'

const Card = ({articles}) => {
    return (
        <section className='grid grid-cols-3 gap-4'>
            {articles.map((post)=>{
                return <article className='bg-white w-[300px] p-4 h-[320px] rounded-md flex flex-col justify-center transition-shadow duration-700 shadow-lg shadow-black hover:shadow-sm' key={post.id}>
                    <img src={post.image}></img>
                    <Link href={`/admin/posts/${post.id}`}><h3 className='text-1xl font-bold mb-3 cursor-pointer text-center mt-3'>{post.title}</h3></Link>
                </article>
            })}
        </section>
    )
}

export default Card