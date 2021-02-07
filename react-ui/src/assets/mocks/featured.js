import React, {useContext, useEffect} from 'react'
import moment from 'moment'
import PostsContext from '../../context/posts/postsContext'
// function Featured() {
    // const {featured, getFeatured} = useContext(PostsContext)
    // useEffect(()=>{
    //     getFeatured()
    // },[])
    // console.log(featured)
//     return featured
// }

// const FeaturedPosts = () => {
//     const {featured, getFeatured} = useContext(PostsContext)
//     useEffect(()=>{
//         getFeatured()
//     },[])
//     console.log(featured)
// }

// export default FeaturedPosts
export default [
    {
        title: 'Can anyone code?',
        date: moment().format('MMMM DD, YYYY') ,
        categories: ['Tech Culture', 'Tech News'] ,
        link: '#',
        image: 'https://source.unsplash.com/random' 
    },
    {
        title: 'Using AWS for storing images',
        date: moment().format('MMMM DD, YYYY') ,
        categories: ['cloud'] ,
        link: '#',
        image: 'https://source.unsplash.com/random'
    },
    {
        title: 'Popular programming language',
        date: moment().format('MMMM DD, YYYY') ,
        categories: ['Tech Culture', 'Tech News'] ,
        link: '#',
        image: 'https://source.unsplash.com/random'
    },
    {
        title: 'Using AWS for storing images',
        date: moment().format('MMMM DD, YYYY') ,
        categories: ['cloud'] ,
        link: '#',
        image: 'https://source.unsplash.com/random'
    }

]