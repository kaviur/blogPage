import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import {FaTrashAlt} from 'react-icons/fa'
import {BsPencilFill} from 'react-icons/bs'
import {TiEyeOutline} from 'react-icons/ti'
import Swal from 'sweetalert2'
import axios from 'axios'

const Card = ({articles,refreshingData}) => {   

    const deletePost = (id,e) => {

        e.preventDefault()

        Swal.fire({
            title: '¿Seguro quieres eliminar esta publicación?',
            text: "Si la eliminas no podrás recuperarla!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Si, bórrala!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`/api/articles/${id}`)
                .then((res) => {
                    //router.replace('/admin/articles')
                    refreshingData(true)
                }).catch(error => console.log(error))

                Swal.fire(
                'Hecho!',
                'La publicación se ha eliminado',
                'success'
                )
            }
        })
    }

    return (
        <section className='grid grid-cols-3 gap-4'>
            {articles == ''
                    ? <p className='font-fgrotesque text-lg tracking-widest p-3 h-20 flex items-center justify-center'>No tienes publicaciones</p>
                    : 
                    articles.map((post)=>{
                return <article className='relative justify-center items-center bg-white w-[300px] p-4 h-[320px] rounded-md flex flex-col transition-shadow duration-700 shadow-lg shadow-black hover:bg-gray-200 hover:opacity-90 mb-5' key={post.id}>
                    <img className="h-40 w-full object-cover object-center transition-all hover:object-bottom duration-1000 rounded-b-md" src={post.image}></img>
                    <Link href={`/admin/posts/${post.id}`}><label className='leading-[1.5] font-bold mb-3 cursor-pointer text-center mt-3'>{post.title}</label></Link>
                    <div className={`absolute hover:px-4 duration-1000 bg-sky-300 border-2 border-red-500 text-2xl p-3 rounded-full flex`}>
                        <Link href={`/articles/${post.id}`}>
                            <TiEyeOutline
                            className='text-gray-500 ml-3 cursor-pointer hover:text-gray-600 hover:text-3xl duration-500'
                            />
                        </Link>
                        <Link href={`/admin/articles/update/${post.id}`}>
                            <BsPencilFill
                            className='text-green-500 ml-3 cursor-pointer hover:text-green-600 hover:text-3xl duration-500'
                            />
                        </Link>
                        <FaTrashAlt
                        className='text-red-500 ml-3 cursor-pointer hover:text-red-600 hover:text-3xl duration-500'
                        onClick={(e)=>deletePost(post.id,e)}
                        />
                    </div>
                </article>
            })}
        </section>
    )
}

export default Card