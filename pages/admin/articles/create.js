import React, { useRef, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
// import Editor from '../../../components/Editor' //así estaba antes sólo con editor.js
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import DashboardLayout from '../../../components/DashboardLayout'

//importa el componente de forma dinámica porque la librería react-editor-js no funciona bien con serverSideRender
const EditorV2 = dynamic(
    ()=>import("../../../components/EditorV2"),{
        ssr:false
    }
)

export async function getServerSideProps(context) {

    const secure = context.req.connection.encrypted
    const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const res = await axios.get(url)

    return {
        props: {
            categories: res.data,
        }
    }
}

export default function RichText({categories}) {
    const { data: session } = useSession()
    const router = useRouter()

    //Ref de editorInstance
    const editor = useRef()
    const title = useRef()
    const image = useRef()
    const category = useRef()
    const highlight = useRef()
    
    const saveContent = async () =>{
        
        const content = await editor.current.save()   

        try{
            const res = await axios.post("/api/articles/create",{
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
                <h1 className='w-10/12 mx-auto text-2xl text-blue-500'>Ingresa el contenido del artículo</h1>
                <div className='mt-10 flex flex-row w-10/12 mx-auto'>
                    <div className='basis-1/2'>
                        <input className='w-11/12 mb-6 p-2 border-solid border-2 border-gray-300' type="text" ref={title} placeholder="Titulo de la publicación"></input>
                    </div>
                    <div className='basis-1/2'>
                        <input className='w-11/12 mb-6 p-2 border-solid border-2 border-gray-300 float-right' type="text" ref={image} placeholder="Pega url de la imagen principal para la publicación"></input>
                    </div>                
                </div>
                {/* <Editor ejInstance={ejInstance}/> */}
                {EditorV2 && <EditorV2 instance={editor}/>}
                    <div className='my-10 w-10/12 mx-auto flex flex-col'>
                    <h1 className='font-fgrotesque text-gray-500'>Elige una categoría</h1>
                        <select ref={category} className=' float-right w-11/12 mb-6 border-solid border-2 border-gray-300  h-10 mt-3 py-2 cursor-pointer rounded-md bg-white'>
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
                                <input id='highlight' type="checkbox" className=' ml-2 h-4 w-4 mt-3 rounded-lg bg-gray-400 shadow-inner shadow-slate-500 outline-none border-none' ref={highlight}></input>
                            </div>
                        </div>
                        <div className='mt-4 flex-row-reverse'>
                            <div className='float-right'>
                                <button className='bg-yellow-200 text-slate-700 ml-8 px-10 py-2 ml-auto' onClick={saveContent}>Publicar</button>
                            </div>
                        </div>
                    </div>
            </div>
        </DashboardLayout>
    )
}
