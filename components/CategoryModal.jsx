import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BiCategory } from 'react-icons/bi'
import { FaTimes, FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import FormEditCat from './FormEditCat'
import { useSession } from 'next-auth/react'
import { BsPlusLg } from 'react-icons/bs'

const CategoryModal = ({ categorySelected, selectCategory, refreshingData, addNewCategory, isNewCategory=false, isLoading, isError }) => {
    const [isEditing, setisEditing] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const nameRef = useRef(null)
    const imgRef = useRef(null)
    const categoryRef = useRef(null)
    const categoryRefImg = useRef(null)
    const { data: session } = useSession()

    const closeModal = (e) => {
        if (e.currentTarget === e.target) {
            selectCategory(null)
            addNewCategory(false)
        }
    }

    const close = () => {
            selectCategory(null)
            addNewCategory(false)
    }

    const editCategory = () => {
        if (nameRef.current.value == '') {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
            axios.put("/api/categories", {
                ...categorySelected,
                name: nameRef.current.value,
                img: imgRef.current.value
            }).then(res => {
                selectCategory(null)
                refreshingData(true)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const deleteCategory = () => {
        axios.delete("/api/categories", { data: { categorySelected } }).then(res => {
            selectCategory(null)
            refreshingData(true)
        }).catch(error => {
            console.log(error)
        })
    }

    const addCategory = () => {
        if (categoryRef.current.value == '') {
            isError(true)
        } else {
            isError(false)
            isLoading(true)
            axios.post("/api/categories", {
                name: categoryRef.current.value,
                img:categoryRefImg.current.value,
                author: session.user,
                date: new Date()
            }).then(res => {
                categoryRef.current.value = ''
                categoryRefImg.current.value = ''
                isLoading(false)
                selectCategory(null)
                addNewCategory(false)
                refreshingData(true)
            }).catch(error => {
                console.log(error)
            })
        }
    }


    return (
        <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-30'>
            <div className='flex h-screen pt-6' onClick={e => closeModal(e)}>
                <motion.div
                    animate={{ scale: [0.7, 1.5, 1] }}
                    exit={{ scale: 0 }}
                    className={`m-auto bg-white rounded-lg shadow-lg p-6 w-[570px] ${isEmpty ? 'h-[290px]':'h-[240px]'}  `}
                >
                    <div className='flex justify-between'>
                        <BiCategory color='#7e22ce' size={25} />
                        <motion.button onClick={close}><FaTimes size={25} /></motion.button>
                    </div>
                    <div className='mt-3 h-10 flex items-center pt-8'>
                        {
                            isNewCategory?<FormEditCat nameRef={categoryRef} imgRef={categoryRefImg} categorySelected={false}/>:
                            !isEditing
                                ? <h1 className='font-fgrotesque font-bold text-2xl capitalize'>{categorySelected.name}</h1>
                                : <FormEditCat nameRef={nameRef} imgRef={imgRef} categorySelected={categorySelected}/>
                        }
                    </div>
                    {isEmpty && <p className='font-fgrotesque text-red-600 font-bold'>ingrese un texto</p>}
                    
                    {
                    !isNewCategory?
                    <div className='flex justify-between mt-12 '>
                        <motion.button onClick={() => editCategory()} className={`${isEditing ? 'visible' : 'invisible'} bg-blue-500 hover:bg-blue-300 hover:text-blue-800 transition-colors duration-500 ease-in-out font-fgrotesque text-md font-bold flex items-center justify-center gap-2 p-2 text-blue-50 rounded-md px-3`}>Aceptar</motion.button>
                        <div className='flex justify-end gap-2'>
                        {!isEditing&&<motion.button onClick={() => setisEditing(!isEditing)} className='p-1 w-[30px] flex justify-center items-center bg-blue-500 rounded-sm ' title='edit'><FaEdit color='#ffffff' /></motion.button>}
                        <motion.button onClick={() => deleteCategory()} className='p-1 w-[30px] flex justify-center items-center bg-red-600 rounded-sm ' title='delete'><FaTrashAlt color='#ffffff' /></motion.button>
                        </div>
                    </div>
                    :
                    <button 
                        onClick={addCategory} 
                        className='bg-blue-500 hover:bg-blue-300 hover:text-blue-800 transition-colors duration-500 ease-in-out font-fgrotesque mt-10 text-md font-bold flex items-center justify-center gap-2 p-2 text-blue-50 rounded-md px-3'>
                            <BsPlusLg /> Agregar
                    </button>
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default CategoryModal