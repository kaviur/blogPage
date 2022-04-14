import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'
import DashboarLayout from '../../../components/DashboardLayout'
import Card from '../../../components/Card'
import Loading from '../../../components/Loading'
import { getCookie } from 'cookies-next'

export async function getServerSideProps({params,query,req,res}){
    const secure = req.connection.encrypted
    const url = `${secure?"https":"http"}://${req.headers.host}/api/articles/byAuthor`
    const email = getCookie("email",{ req, res })

    const response = await axios.get(url, {
        params: {
            email
        }
    })
    //console.log(response)

    return {
        props:{
            articles:response.data
        }
    }
}

export default function Articles({articles}) {

    const [refreshData, setRefreshData] = useState(false)
    const [allArticles, setAllArticles] = useState(articles)
    const [isLoading, setIsLoading] = useState(null)

    const getAllArticles = () =>{
        setIsLoading(true)
        axios.get('/api/articles/byAuthor').then(res => {
            setIsLoading(false)
            setAllArticles(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        if(refreshData == true){
            getAllArticles()
            setRefreshData(false)
        }
    },[refreshData])

    return (
        <>
            <DashboarLayout >
                <article className='prose prose-xl leading-10 prose-p:my-16 p-3 px-6 md:0'>
                    <div className='flex justify-between my-5'>
                        <h1 className='text-3xl font-bold'>Publicaciones realizadas</h1>
                        <Link href="/admin/articles/create"><span className='bg-yellow-200 text-black p-2 hover:bg-yellow-300 rounded-md cursor-pointer'>Crear publicación</span></Link>
                    </div>
                    {
                        isLoading
                        ? <Loading/>
                        : <Card articles={allArticles} refreshingData={setRefreshData}/>
                    }
                </article> 
            </DashboarLayout>                                                
        </>
    )
}