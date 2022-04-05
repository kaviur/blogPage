import React, { useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'

const ReactEditorJS = createReactEditorJS()
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Image from '@editorjs/image'

export default function EditorV2({instance}) {
    const tools = {
        header:Header,
        list:List,
        quote: Quote,
        marker: Marker,
        warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message',
            },
        },
        embed:{
            class: Embed,
            config:{
                services:{
                youtube:true,
                coub: true
                }
            }
        },
        image: SimpleImage,
        //image: Image,
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