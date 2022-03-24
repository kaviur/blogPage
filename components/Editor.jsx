import React,{useEffect} from 'react'

// import List from "@editorjs/list"
// import Embed from "@editorjs/embed"

// const Header = dynamic(
//     ()=>import("@editorjs/header").then((mod)=>mod.default),{
//         ssr:false
//     }
//   )

//NOTA:finalmente no se usó este por no sorportar server side rendering --funciona bn con react pero no con next
const EDITOR_ID = "editorjs"

export default function Editor({ejInstance}) {

    useEffect(()=>{
        const importComponents = async ()=>{
            const EditorJS = await import("@editorjs/editorjs")
            const Header = await import("@editorjs/header")
            if(!ejInstance.current){
                initEditor(EditorJS.default,{
                    tools:{
                        header:Header,
                        // list:List,
                        // embed:Embed
                    }
                })
            }
        }
        

        importComponents()

        // Clean up
        return ()=>{
            if(ejInstance.current){
                ejInstance.current.destroy()
                ejInstance.current = null
            }
        }
    },[])

    const initEditor = (EditorJS,tools) =>{
        const editor = new EditorJS({
            holder:EDITOR_ID,
            logLevel:"ERROR",
            onReady:()=>{
                console.log("Editor listo")
                ejInstance.current = editor
            },
            onChange:()=>{
                
            },
            tools
        })
    }
    return (
        <div className='prose prose-xl prose-invert max-w-none leading-10 prose-p:my-16 p-5 md:0 mx-auto bg-slate-700 my-10'>
            <div id={EDITOR_ID}></div>
        </div>
    )
}