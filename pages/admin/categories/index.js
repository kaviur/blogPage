import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../../components/DashboardLayout'
import axios from 'axios'
import Loading from '../../../components/Loading'
import { BsPlusLg } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import CategoriesList from '../../../components/CategoriesList'
import CategoryModal from '../../../components/CategoryModal'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const res = await axios.get(url)

    return {
        props: {
            categories: res.data
        }
    }
}

const Categories = ({ categories }) => {
    const [isLoading, setIsLoading] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isError, setIsError] = useState(false)
    const categoryRef = useRef(null)
    const categoryRefImg = useRef(null)
    const { data: session } = useSession()
    const [allCategories, setAllCategories] = useState(categories)
    const [refreshData, setRefreshData] = useState(false)
    const [addNewCategory, setAddNewCategory] = useState(false)

    const getAllCategories = () =>{
        setIsLoading(true)
        axios.get('/api/categories').then(res => {
            setIsLoading(false)
            setAllCategories(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        if(refreshData == true){
            getAllCategories()
            setRefreshData(false)
        }
    },[refreshData])

    const addCategory = () => {
        if (categoryRef.current.value == '') {
            setIsError(true)
        } else {
            setIsError(false)
            setIsLoading(true)
            axios.post("/api/categories", {
                name: categoryRef.current.value,
                img:categoryRefImg.current.value,
                author: session.user,
                date: new Date()
            }).then(res => {
                categoryRef.current.value = ''
                categoryRefImg.current.value = ''
                setIsLoading(false)
                getAllCategories()
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <DashboardLayout>
            <section className='w-full h-screen flex flex-col md:flex-row'>
                <div className='w-full'>
                    <h1 className='font-faudiowide text-2xl px-8 pt-7'>Categorías</h1>
                    {isError && (<p className='text-red-500 font-fgrotesque font-bold text-lg'>ingrese una categoria</p>)}
                    <button 
                    onClick={()=>{setAddNewCategory(true)}} 
                    className='bg-yellow-200 text-black p-3 mt-4 hover:bg-yellow-300 rounded-md cursor-pointer float-right mr-20 inline-block'>
                        <BsPlusLg className='inline-block'/> Crear categoría
                    </button>

                    <div className=' w-full h-auto p-8 flex flex-wrap gap-5 justify-start'>
                        {
                            isLoading
                                ? <Loading />
                                : <CategoriesList listOfCategories={allCategories} selectCategory={setSelectedCategory} />
                        }
                    </div>
                </div>
                <AnimatePresence>
                    {selectedCategory &&
                        <CategoryModal
                            categorySelected={selectedCategory}
                            selectCategory={setSelectedCategory}
                            refreshingData={setRefreshData}
                            addNewCategory={setAddNewCategory}
                            isLoading={setIsLoading}
                            isError={setIsError}
                            getAllCategories={getAllCategories}
                        />
                    }
                    {addNewCategory &&
                        <CategoryModal
                            categorySelected={selectedCategory}
                            selectCategory={setSelectedCategory}
                            refreshingData={setRefreshData}
                            addNewCategory={setAddNewCategory}
                            isLoading={setIsLoading}
                            isError={setIsError}
                            isNewCategory={true}
                        />
                    }
                </AnimatePresence>
            </section>
        </DashboardLayout>
    )
}

export default Categories