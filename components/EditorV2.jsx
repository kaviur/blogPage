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

export default function EditorV2({instance,blocks=null}) {
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
        <div className='prose prose-xl max-w-none leading-10 prose-p:my-16 p-5 md:0 mx-auto border-2 border-gray-300 w-10/12 rounded-sm'>
            <h2 className='text-gray-400'>Ingresa el contenido del post, puedes pegar citas, listas, links, enlaces de youtube y enlaces de imágenes</h2>
            <ReactEditorJS onInitialize={initialize}tools={tools} defaultValue={blocks}/>
        </div>
    )
}