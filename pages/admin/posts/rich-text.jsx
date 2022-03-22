import React, { useEffect, useRef } from 'react'
//import EditorJS from '@editorjs/editorjs';
import axios from 'axios'
const EDITOR_ID = "editorjs"

export default function RichText() {
    const ejInstance = useRef()

    useEffect(()=>{
        import("@editorjs/editorjs")
        .then(EditorJS=>{
            if(!ejInstance.current){
                initEditor(EditorJS.default)
            }
        })

        // Clean up
        return ()=>{
            if(ejInstance.current){
                ejInstance.current.destroy()
                ejInstance.current = null
            }
        }
    },[])

    const initEditor = (EditorJS) =>{
        const editor = new EditorJS({
            holder:EDITOR_ID,
            logLevel:"ERROR",
            onReady:()=>{
                console.log("Editor listo")
                ejInstance.current = editor
            },
            onChange:()=>{

            }
        })
    }

    const create = async ()=>{
        const content = await ejInstance.current.save()
        await axios.post("/api/posts/create",{
            content,
        })
    }


    return (
        <div className='prose prose-xl leading-10 prose-p:my-16 md:0 mx-auto my-10 border-2 border-slate-200 rounded-sm'>
            <div id={EDITOR_ID}></div>
            <button onClick={create}>Guardar</button>
        </div>
    )
}