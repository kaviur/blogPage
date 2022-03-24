import React, { useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'

const ReactEditorJS = createReactEditorJS()
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";

const instance = useRef(null)

export default function EditorV2() {
    const tools = {
        header:Header,
        list:List,
        embed:{
            class: Embed,
            config:{
                services:{
                youtube:true,
                coub: true
                }
            }
            }
        }

        const init =useCallback((ins)=>{
            console.log(ins)
        },[])

    return (
        <div className='prose prose-xl max-w-none leading-10 prose-p:my-16 p-5 md:0 mx-auto border-2 border-slate-200 rounded-sm'>
        <ReactEditorJS onInit={init} tools={tools} />
        </div>
    )
}