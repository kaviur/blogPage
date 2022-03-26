import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import PostsList from '../../components/PostsList'
import Loading from '../../components/Loading'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    let postsRes
    let totalPagesRes 

    //get posts
    const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api${context.resolvedUrl}`
    console.log(postUrl)
    postsRes = await axios.get(postUrl)

    //console.log(postsRes)

    //get quantity of pages
    // const paginationUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/pagination${context.resolvedUrl}`
    // totalPagesRes = await axios.get(paginationUrl)

    // //get highlights for slider
    // const highlightsUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/highlights`
    // const highlightsRes = await axios.get(highlightsUrl)

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const categoriesRes = await axios.get(categoryUrl)

    return {
        props: {
            categories: categoriesRes.data,
            posts: postsRes.data,
            // highlights: highlightsRes.data,
            // pages: totalPagesRes.data
        }
    }
}


const RegularPosts = ({ categories, posts }) => {
    const searchRef = useRef(null)
    const router = useRouter()
    // const [maxPage, setMaxPage] = useState()
    // const [currentPage, setCurrentPage] = useState(1)

    // useEffect(() => {
    //     router.query.page
    //         ? setCurrentPage(router.query.page)
    //         : setCurrentPage(1)
    //     setMaxPage(pages)
    // }, [posts])


    // const nextPage = () => {
    //     if (currentPage < maxPage) {
    //         router.query
    //             ? router.push({ pathname: router.pathname, query: { ...router.query, page: parseInt(currentPage) + 1 } })
    //             : router.push(`/posts?page=${parseInt(currentPage) + 1}`)
    //     }
    // }

    // const prevPage = () => {
    //     if (currentPage > 1) {
    //         router.query
    //             ? router.push({ pathname: router.pathname, query: { ...router.query, page: parseInt(currentPage) - 1 } })
    //             : router.push(`/posts?page=${parseInt(currentPage) - 1}`)
    //     }
    // }

    // const firstPage = () => {
    //     if (maxPage > 1) {
    //         router.query
    //             ? router.push({ pathname: router.pathname, query: { ...router.query, page: 1 } })
    //             : router.push('/posts?page=1')
    //     }
    // }

    // const lastPage = () => {
    //     if (maxPage > 1) {
    //         router.query
    //             ? router.push({ pathname: router.pathname, query: { ...router.query, page: maxPage } })
    //             : router.push(`/posts?page=${maxPage}`)
    //     }
    // }

    return (
        <section className='pt-[6rem] px-6 h-full min-h-screen flex flex-col items-center'>
            <div className='flex flex-col md:flex-row w-full h-full my-6 gap-16'>
                <div className='h-auto min-h-screen flex flex-col gap-5'>
                    {
                        posts
                            ? <PostsList listOfPosts={posts} />
                            : <Loading />
                    }
                </div>

                <div className=' h-auto w-full md:h-full md:w-[20%] p-2 bg-slate-100'>
                    <h1 className='font-faudiowide text-lg py-2 px-2 border-b-2 border-pink-400'>Categorias</h1>
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
            </div>
        </section>
    )
}

export default RegularPosts