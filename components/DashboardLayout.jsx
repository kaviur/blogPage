import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import MenuAdmin from './MenuAdmin'

export default function DashboarLayout({children}) {
    const [currentPage, setCurrentPage] = useState(0)
    const { data: session } = useSession()
    const router = useRouter()

    {/* TODO:DESCOMENTAR ESTO CUANDO SE HABILITEN LOS ROLES: lo dejé así para micentroderecursos */}
    // if(session === null || session?.user?.role==="regular"){
    //     router.replace("/")
    // }

    if(session === null){
        router.replace("/")
    }
    
    // useEffect(()=>{
    //     if(router.route == '/admin') setCurrentPage(0)
    //     else if(router.route == '/admin/posts' || router.route == '/admin/posts/create' || router.route == '/admin/posts/create'|| router.route == '/admin/posts/search') setCurrentPage(1)
    //     else if(router.route == '/admin/categories') setCurrentPage(2)
    //     else if(router.route == '/admin/comments') setCurrentPage(3)
    // },[router.route])

    return (
        <>
            <div className='h-full min-h-screen flex flex-col items-center bg-gray-50 mt-6 rounded-md'>
                <div className='flex flex-col md:flex-row w-full h-full gap-16'>
                    <div className='w-full md:h-full md:w-[20%] p-2 mt-4 ml-5'>
                        <MenuAdmin/>
                    </div>
                    <div className='h-auto w-full md:h-full md:min-h-screen md:w-[75%] flex flex-col gap-5 border-t-4 md:border-t-0 mt-7 md:mt-0 pt-2 md:pt-0'>
                        <div className='h-auto min-h-screen flex flex-col gap-5'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}