import axios from 'axios'
import React from 'react'
import dynamic from 'next/dynamic'

const Output = dynamic(
    ()=>import("editorjs-react-renderer").then((mod)=>mod.default),{
        ssr:false
    }
)

export async function getServerSideProps(context){
    const secure = context.req.connection.encrypted
    const url = `${secure?"https":"http"}://${context.req.headers.host}/api/articles/${context.params.idArticle}`

    const res = await axios.get(url)

    return {
        props:{
            article:res.data
        }
    }
}

export default function Article({article}) {

    return (
        <>
            <article className='prose prose-xl leading-10 prose-p:my-16 p-5 md:0 mx-auto'>
                <h1>{article.title}</h1>
                <img src={article.image}></img>
                <Output data={article.content} />
            </article>
        </>
    )
}
