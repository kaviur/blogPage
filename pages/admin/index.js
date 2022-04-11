import React from 'react'
import { BsFilePost } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import axios from 'axios'
import DashboardLayout from '../../components/DashboardLayout'
import DashboardCard from '../../components/DashboardCard'

export async function getServerSideProps(context) {

    const secure = context.req.connection.encrypted

    const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/amounts/articles_amount`
    const postAmount = await axios.get(postUrl)

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/amounts/categories_amount`
    const categoryAmount = await axios.get(categoryUrl)

    const userUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/amounts/users_amount`
    const userAmount = await axios.get(userUrl)

    return {
        props: {
            posts: postAmount.data,
            categories: categoryAmount.data,
            users: userAmount.data,
        }
    }
}

export default function Admin({posts,categories,users}) {
    return (
        <DashboardLayout>
            <div className='h-auto w-full md:h-full md:min-h-screen flex flex-col gap-5 mt-5 md:mt-0 pt-2 md:pt-0 bg-slate-300 rounded-r-md'>
                <div className='h-auto min-h-screen flex justify-around mt-4 gap-2'>                        
                    <DashboardCard name={'Usuarios'} amount={users} >
                        <FaUsers color='#7e22ce' size={40} />
                    </DashboardCard>

                    <DashboardCard name={'Categorias'} amount={categories} >
                        <BiCategory color='#7e22ce' size={40} />
                    </DashboardCard>

                    <DashboardCard name={'Publicaciones'} amount={posts} >
                        <BsFilePost color='#7e22ce' size={40} />
                    </DashboardCard>
                </div>
            </div>
        </DashboardLayout>
    )
}