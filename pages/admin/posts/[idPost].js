import axios from 'axios'
import React from 'react'
import ReactMarkdown from "react-markdown"

export async function getServerSideProps(context){
    const secure = context.req.connection.encrypted
    const url = `${secure?"https":"http"}://${context.req.headers.host}/api/posts/${context.params.idPost}`

    const res = await axios.get(url)

    return {
        props:{
            post:res.data
        }
    }
}

export default function Post({post}) {
    return (
    <div>
        <h1>Post</h1>
        <article className='prose prose-invert'>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    </div>
    )
}