import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const cardVariants = {
  offscreen: {
    y: 180
  },
  onscreen: {
    y: 10,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 0.9
    }
  }
}

const titleVariants = {
  over: {
    y: 10,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 0.9
    }
  }
}

const CategoryList = ({categoryList}) => {
  return <section className='flex flex-wrap justify-center gap-x-8 gap-y-6 mb-10 container mx-auto'>  {
    categoryList == ''
        ? <p className='font-fgrotesque text-lg tracking-widest p-3 h-20 flex items-center justify-center'>No hay categorías</p>
        : (
            categoryList.map((category, index) => (
                <Link key={category.id} href={`/articles?category=${category.name.toLowerCase()}`} passHref>
                    <a className=''>
                        <motion.button
                            key={category.id}//relative justify-center items-center w-[284px] h-[300px] rounded-md flex flex-col transition-shadow duration-700 shadow-lg shadow-black hover:bg-gray-200 hover:opacity-90
                            className='relative justify-center items-center w-[284px] h-[300px] rounded-md flex flex-col shadow-md shadow-black transition-shadow duration-700 hover:shadow-lg hover:shadow-black mx-4 mb-5 mt-2'
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <motion.img
                              className='h-full w-full object-cover object-center transition-all hover:object-bottom duration-1000 rounded-md'
                              src={category.img}
                            />
                            
                            <motion.div
                            className={`absolute hover:px-4 duration-1000 bg-sky-300 border-2 border-red-500 text-2xl p-3 rounded-full flex text-black`}
                            >
                              {category.name}
                            </motion.div>
                        </motion.button>
                    </a>
                </Link>
            ))
        )
}
</section>
}

export default CategoryList