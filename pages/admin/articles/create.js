import React, { useRef } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
// import Editor from '../../../components/Editor'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


const EditorV2 = dynamic(
    ()=>import("../../../components/EditorV2"),{
        ssr:false
    }
)


export default function RichText() {
    const router = useRouter()
    //Ref de editorInstance
    const ejInstance = useRef()

    const {data:session} = useSession()

    const title = useRef()
    const image = useRef()
    const highlight = useRef()
    
    const saveContent = async () =>{
        const content = await ejInstance.current.save()
        try{
            const res = await axios.post("/api/articles/create",{
                title:title.current.value,
                author:session.user,
                image:image.current.value,
                date: new Date(),
                highlight:highlight.current.checked,
                content,
            })

            console.log(res)

            router.replace("/admin")
        }catch(error){
            console.log(error)
        }
    }
    

    return (
        <div>
            <div className='p-5 mx-auto mt-10 flex items-center'>
                <input type="text" ref={title} placeholder="Titulo de la publicación"></input>
                <input type="text" ref={image} placeholder="Imagen de la publicación"></input>
                <label className='text-2xl ml-10' htmlFor='highlight'>¿Highlight?</label>
                <input id='highlight' type="checkbox" ref={highlight}></input>
                <button className='bg-yellow-200 text-slate-700 px-10 py-2 ml-auto' onClick={saveContent}>Create</button>
            </div>
            {/* <Editor ejInstance={ejInstance}/> */}
            {EditorV2 && <EditorV2/>}
        </div>
    )
}