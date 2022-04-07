import React from 'react'

const FormEditCat = ({nameRef,imgRef,categorySelected}) => {
    return (
        <div>
            <input 
            ref={nameRef} 
            className='font-fgrotesque text-lg text-gray-500 w-full outline-none border-b-2 border-gray-400 mt-2' 
            type="text" 
            defaultValue={categorySelected?categorySelected.name:""} 
            placeholder="Escribe el nombre de la categoría"
            />
            <input 
            ref={imgRef} 
            className='font-fgrotesque text-lg text-gray-500 w-full outline-none border-b-2 border-gray-400 mt-2' 
            type="text" 
            defaultValue={categorySelected?categorySelected.img:""} 
            placeholder="Pega la url de la imágen"
            />
        </div>
    )
}

export default FormEditCat