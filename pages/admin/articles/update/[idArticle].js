import React, { useRef, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
// import Editor from '../../../components/Editor' //así estaba antes sólo con editor.js
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import DashboardLayout from "../../../../components/DashboardLayout"

//importa el componente de forma dinámica porque la librería react-editor-js no funciona bien con serverSideRender
const EditorV2 = dynamic(
    ()=>import("../../../../components/EditorV2"),{
        ssr:false
    }
)

export async function getServerSideProps(context) {

    const secure = context.req.connection.encrypted

    const postUrl = `${secure?"https":"http"}://${context.req.headers.host}/api/articles/${context.params.idArticle}`
    const postResponse = await axios.get(postUrl)

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const categoriesResponse = await axios.get(categoryUrl)  


    return {
        props: {
            post: postResponse.data,
            categories: categoriesResponse.data
        }
    }
}

export default function RichText({categories,post}) {
    const { data: session } = useSession()
    const router = useRouter()

    //Ref de editorInstance
    const editor = useRef()
    const title = useRef()
    const image = useRef()
    const category = useRef()
    const highlight = useRef()
    
    const updateContent = async () =>{
        
        const content = await editor.current.save()   

        try{
            const res = await axios.put(`/api/articles/${post.id}`,{
                title:title.current.value,
                author:session.user,
                image:image.current.value,
                category: category.current.value.toLowerCase(),
                date: new Date(),
                highlight:highlight.current.checked,
                content,
            })

            router.replace("/admin/articles")
        }catch(error){
            console.log(error)
        }
    }
    

    return (
        <DashboardLayout>
            <div className='mt-10'>
                <h1 className='w-10/12 mx-auto text-2xl text-blue-500'>Modificar la publicación</h1>
                <div className='mt-10 flex flex-row w-10/12 mx-auto'>
                    <div className='basis-1/2'>
                        <input className='w-11/12 mb-6 p-2 border-solid border-2 border-gray-300' defaultValue={post.title} type="text" ref={title} placeholder="Titulo de la publicación"></input>
                    </div>
                    <div className='basis-1/2'>
                        <input className='w-11/12 mb-6 p-2 border-solid border-2 border-gray-300 float-right' defaultValue={post.image} type="text" ref={image} placeholder="Pega url de la imagen principal para la publicación"></input>
                    </div>                
                </div>
                {/* <Editor ejInstance={ejInstance}/> */}
                {EditorV2 && <EditorV2 instance={editor} blocks={post.content}/>}
                    <div className='my-10 w-10/12 mx-auto flex flex-col'>
                    <h1 className='font-fgrotesque text-gray-500'>Elige una categoría</h1>
                        <select defaulValue={post.category} ref={category} className=' float-right w-11/12 mb-6 border-solid border-2 border-gray-300  h-10 mt-3 py-2 cursor-pointer rounded-md bg-white'>
                            {
                                categories.map((categoria) => {
                                    return (
                                        <option key={categoria.id} value={categoria.name}>{categoria.name}</option>
                                        )
                                    })
                                }
                        </select>

                        <div className='flex-row-reverse'>
                            <div className='float-right'>
                                <label className='ml-3' htmlFor='highlight'>Marcar como artículo destacado</label>
                                <input defaultValue={post.highlight} id='highlight' type="checkbox" className=' ml-2 h-4 w-4 mt-3 rounded-lg bg-gray-400 shadow-inner shadow-slate-500 outline-none border-none' ref={highlight}></input>
                            </div>
                        </div>
                        <div className='mt-4 flex-row-reverse'>
                            <div className='float-right'>
                                <button className='bg-yellow-200 text-slate-700 px-10 py-2 ml-auto' onClick={updateContent}>Confirmar cambios</button>
                            </div>
                        </div>
                    </div>
            </div>
        </DashboardLayout>
    )
}
