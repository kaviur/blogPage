import React from 'react'
import FeaturedPosts from './FeaturedPosts'

const RightAside = ({featuredPosts}) => {
    return (
        <div>
            <h1 className='font-faudiowide text-lg py-2 px-2 border-b-2 border-pink-400'>Destacados</h1>
            <FeaturedPosts listOfPosts={featuredPosts} />
        </div>
    )
}

export default RightAside