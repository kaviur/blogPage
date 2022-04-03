import React, { useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'

const ReactEditorJS = createReactEditorJS()
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";


export default function EditorV2({instance}) {
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
        },
        simpleImage:SimpleImage
        }

        //se le pasa la instancia a la referencia 'instance'
        const initialize = useCallback((ins)=>{
            instance.current = ins
        },[])

    return (
        <div className='prose prose-xl max-w-none leading-10 prose-p:my-16 p-5 md:0 mx-auto border-2 border-slate-200 rounded-sm'>
        <ReactEditorJS onInitialize={initialize}tools={tools} />
        </div>
    )
}