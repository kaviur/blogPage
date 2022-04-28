import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {IoMdArrowDropdown} from 'react-icons/io'

const ActiveLink = ({link,title,dropdown=false,fnMenu,isOpen}) => {

  const {asPath} = useRouter()  

  return (
    <Link href={link}>
        <a className={`${asPath==link?"text-blue-300":"text-red-300"}`}>
            {title}
            {
                dropdown&&<IoMdArrowDropdown onClick={()=>{fnMenu(!isOpen)}} className='w-5 h-5 inline-block'/>
            }
        </a>
    </Link>
  )
}

export default ActiveLink