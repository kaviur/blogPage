import React, { useRef, useState } from 'react'
import ReactMarkdown from "react-markdown"
import dynamic from 'next/dynamic'
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css'

import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const MarkDownEditor = dynamic(
    ()=>import("@uiw/react-markdown-editor").then((mod)=>mod.default),{
        ssr:false
    }
)

export default function Create() {
    const router = useRouter()
    const {data:session} = useSession()
    const titulo = useRef()
    const image = useRef()
    const [content,setContent] = useState("")

    const saveContent = () =>{
        console.log(content)
        axios.post("/api/posts/create",{
            title:titulo.current.value,
            author:session.user,
            image:image.current.value,
            date: new Date(),
            content,
        }).then(res=>{
            router.replace("/admin/posts")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <input className='text-black' type="text" ref={titulo} placeholder="Titulo de la publicación"></input>
            <input className='text-black' type="text" ref={image} placeholder="Imagen de la publicación"></input>
            <MarkDownEditor
                value={content}
                onChange={(editor,data,value)=>{
                    setContent(value)
                }}
            />
            <button onClick={saveContent}>Guardar</button>

            <article className='prose'>
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        </div>
    )
}