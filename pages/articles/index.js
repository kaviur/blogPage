import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import PostsList from '../../components/PostsList'
import Loading from '../../components/Loading'
import RightAside from '../../components/RightAside'
import Link from 'next/link'
import { useRouter } from 'next/router'
import FeaturedPosts from '../../components/FeaturedPosts'

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

    //get highlights for slider
    const highlightsUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/articles/featured`
    const highlightsRes = await axios.get(highlightsUrl)

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const categoriesRes = await axios.get(categoryUrl)

    return {
        props: {
            categories: categoriesRes.data,
            posts: postsRes.data,
            highlights: highlightsRes.data,
            // pages: totalPagesRes.data
        }
    }
}


const RegularPosts = ({ categories, posts, highlights }) => {
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
        <section className='pt-[3rem] h-full min-h-screen flex flex-col items-center bg-slate-600'>
            <div className='flex flex-wrap md:flex-row w-full lg:w-11/12 h-full my-6 bg-purple-600'>
                <div className=' h-auto w-full md:h-full md:bg-red-300 md:w-1/4 xl:bg-blue-500 p-2 bg-green-400'>
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
                    <hr></hr>
                    <div className="mt-4">
                        <h1 className='font-faudiowide text-lg py-2 px-2 border-b-2 border-pink-400'>Destacados</h1>
                        <FeaturedPosts listOfPosts={highlights} />
                    </div>                
                </div>    
                <div className='w-full h-auto md:w-3/4 min-h-screen'>
                    {
                        posts
                            ? <PostsList listOfPosts={posts} />
                            : <Loading />
                    }
                </div>  
            </div>
        </section>
    )
}

export default RegularPosts