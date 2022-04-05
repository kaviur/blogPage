import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
//import RegularPostsList from '../../components/RegularPostsList'
import Loading from '../../components/Loading'
import Link from 'next/link'
import { useRouter } from 'next/router'
//import Carousel from '../../components/Carousel'
import dynamic from 'next/dynamic'

const Output = dynamic(
    ()=>import("editorjs-react-renderer").then((mod)=>mod.default),{
        ssr:false
    }
)

export async function getServerSideProps(context){

    const secure = context.req.connection.encrypted

    const postUrl = `${secure?"https":"http"}://${context.req.headers.host}/api/articles/${context.params.idArticle}`
    const postResponse = await axios.get(postUrl)

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const categoriesResponse = await axios.get(categoryUrl)    
    

    return {
        props:{
            article:postResponse.data,
            categories: categoriesResponse.data
        }
    }
}

export default function Article({article,categories}) {

    return (
        <section className='pt-[6rem] h-full min-h-screen flex flex-col items-center'>
            <div className='flex flex-col md:flex-row w-full h-full my-6 gap-16'>
                <div className=' h-auto w-full md:h-full md:w-[20%] p-2 bg-slate-100'>
                    <h1 className='font-faudiowide text-lg py-2 px-2 border-b-2 border-purple-600'>Categories</h1>
                    <div className='w-full h-auto flex flex-col gap-2 mt-2 box-border'>
                        {
                            categories
                                ? (
                                    categories.map((category) => {
                                        return (
                                            <Link key={category.id} href={`/articles?category=${category.name.toLowerCase()}`} passHref>
                                                <a>
                                                    <p className='w-auto h-[40px] p-2 hover:bg-slate-200 font-fgrotesque text-lg font-semibold text-black flex jus items-center'>{category.name}</p>
                                                </a>
                                            </Link>
                                        )
                                    })
                                )
                                : <Loading />
                        }
                    </div>
                </div>
                <div className='h-auto w-full md:h-full md:min-h-screen md:w-[75%] flex flex-col gap-5 border-t-4 md:border-t-0 md:border-r-4 border-purple-600 mt-7 md:mt-0 pt-2 md:pt-0'>
                    <div className='h-auto min-h-screen flex flex-col gap-5'>
                        
                            <article className='prose prose-xl leading-10 prose-p:my-16 p-5 md:0 mx-auto'>
                                <h1>{article.title}</h1>
                                <img src={article.image}></img>
                                <Output data={article.content} />
                                {
                                    console.log(article.content)                                    
                                }
                                {article.content.blocks.map((bloque)=>{
                                    console.log(bloque.type)
                                    if(bloque.type==="simpleImage"){
                                        console.log(bloque.data.url) 
                                        return <img src={article.image}></img>
                                    }
                                })}
                            </article>                        
                    </div>
                    {/* <div className='w-full h-[70px] flex gap-4 items-center justify-center font-fgrotesque font-bold'>
                        <button onClick={() => firstPage()} className='py-1 px-2 bg-slate-50 rounded-md font-bold'><span className='text-xl'>&#171;</span> first</button>
                        <button onClick={() => prevPage()} className='py-1 px-4 bg-slate-50 rounded-md text-xl font-bold'>&#8249;</button>
                        {
                            maxPage && <p>{`${currentPage}-${maxPage}`}</p>
                        }
                        <button onClick={() => nextPage()} className='py-1 px-4 bg-slate-50 rounded-md text-xl font-bold'>&#8250;</button>
                        <button onClick={() => lastPage()} className='py-1 px-2 bg-slate-50 rounded-md font-bold'>last <span className='text-xl'>&#187;</span></button>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
