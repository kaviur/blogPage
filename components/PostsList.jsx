import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const PostsList = ({ listOfPosts }) => {
    return (
        <section className='grid grid-cols-3 gap-4 justify-start'>  {
                listOfPosts == ''
                    ? <p className='font-fgrotesque text-lg tracking-widest p-3 h-20 flex items-center justify-center'>Aún no se han publicado artículos sobre el tema elegido</p>
                    : (
                        listOfPosts.map((post, index) => (
                            <Link key={post.id} href={`/posts/${post.id}`} passHref>
                                <a>
                                    <motion.button
                                        key={post.id}
                                        className='bg-white p-5 justify-start shadow-md shadow-black transition-shadow duration-700 hover:shadow-lg hover:shadow-black'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1] }}
                                        transition={{ duration: index / 5 }}
                                        drag={false}
                                        dragElastic={1}
                                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                                    >
                                        <img src={post.image}></img>
                                        <Link href={`/admin/posts/${post.id}`}><h3 className='text-1xl font-bold mb-3 cursor-pointer text-center mt-3'>{post.title}</h3></Link>
                                        
                                        <div className='flex items-center mb-5'>
                                            <div className='flex flex-col justify-center'>
                                                <p className='text-sm text-pink-500'>Por: {post.author.name} | {new Date(post.date).toLocaleDateString()}</p>
                                                {/* <p className='text-xs'>{new Date(post.date).toLocaleTimeString()}</p> */}
                                                <hr className='text-sm text-pink-600 mt-4'></hr>
                                            </div>
                                        </div>
                                    </motion.button>
                                </a>
                            </Link>
                        ))
                    )
            }
        </section>
    )
}

export default PostsList