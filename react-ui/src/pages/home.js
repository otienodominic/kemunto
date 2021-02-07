// import React, {useEffect, useContext, useState, useMemo} from 'react'
// // import { PostGrid} from '../components/common'
// import PostsContext from '../context/posts/postsContext'
// import {categoryColors} from '../components/common/style'
// import {Link} from 'react-router-dom'
// import {Pagination} from 'antd'
// // import TagRow from '../components/common/tag-row'
// import trending from '../assets/mocks/trending'
// import featured from '../assets/mocks/featured'

// const trendingConfig = {
//     1: {
//         gridArea: '1 / 2 / 3 / 3',
//     }
// }

// const featuredConfig = {
//     0: {
//         gridArea: '1 / 1 / 2 / 3',
//         height: '300px'
//     },
//     1: {
//         height: '300px'
//     },
//     3: {
//         height: '630px',
//         marginLeft: '30px',
//         width: '630px',
//     }
// }



// export default function Home () {
//     // const {getFeatured, featured, getPosts, getTrending, trending } = useContext(PostsContext)

//     // useEffect(() => {
//     //     getFeatured()
//     //     getPosts()
//     // },[])

//     const mergeStyles = function (posts, config){
//         posts.forEach((post, index) => {
//             post.style = config[index]
//             post.author = 'Dominic Ngalo'
//             post.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.'
//         })
//     }
    
//     const recentPosts = [...trending, ...featured, ...featured]
    
//     mergeStyles(featured, featuredConfig)
//     mergeStyles(trending, trendingConfig) 
    
     

//     function PostGrid ({posts}) {
//         const [pageSize, setPageSize] = useState(9)
//         const [current, setCurrent] = useState(1)
    
//         const paginatedPosts = useMemo(() => {
//             const lastIndex = current * pageSize
//             const firstIndex = lastIndex - pageSize
    
//             return posts.slice(firstIndex, lastIndex)
//         }, [current, pageSize, posts])
    
//         useEffect(() => {
//             window.scroll({
//                 top: 0,
//                 left: 0,
//                 behavior: 'smooth'
//             })
//         }, [current, pageSize])
    
    
    
//         return (
//             <section className="grid-pagination-container">
//                 <section className="post-grid container">
//                     {paginatedPosts.map((post, index) => (
//                         <div className="post-container">
//                             <figure>
//                                 <Link to={`/post/${post?.id}`}>
//                                     <img src={post.image} alt={post.image}/>
//                                 </Link>
//                             </figure>
//                             <TagRow tags={post.categories} />
//                             <h2>{post.title}</h2>
//                             <p className="author-text">
//                                 <span>
//                                     By:
//                                     <Link to={`/authors/${post.author}`} >
//                                         {post.author}
//                                     </Link>
//                                 </span>
//                                 <span>
//                                     - {post.date}
//                                 </span>
//                             </p>
//                             <p className="description-text">
//                                 {post.description}
//                             </p>
//                             <Link to={post.link}>Read More...</Link>
//                         </div>
//                     ))}
//                 </section>
//                 <Pagination
//                     simple
//                     showSizeChanger
//                     onShowSizeChange={setPageSize}
//                     pageSize={pageSize}
//                     total={posts.length}
//                     defaultCurrent={current}
//                     onChange={setCurrent}
//                 />
//             </section>
//         )
//     }

//     function TagRow ({tags}) {
//         return (
//             <div className='tags-container'>
//                 {
//                     tags.map((tag, index)=> 
//                     <span key={index} className='tag' style={{backgroundColor: categoryColors[tag]}}>
//                         {tag.toUpperCase()}
//                     </span>)
//                 }
//             </div>
//         )
//     }

//     function MasonryPost({post, tagsOnTop}){
//         const windowWidth = window.innerWidth
//     const imageBackground =  {backgroundImage: `url("${post.image}")`}

//     const style = windowWidth > 900 ? {...imageBackground, ...post.style} : imageBackground
//     return (        
//         <a className="masonry-post overlay" style={style} href={post.link}>
//             <div className="image-text" style={{justifyContent: tagsOnTop ? 'space-between' : 'flex-end'}}>
//                 <TagRow tags={post.categories} />
//                 <div>
//                     <h2 className="image-title">{post.title}</h2>
//                     <span className="image-date">{post.date}</span>
//                 </div>
//             </div>
//         </a>
//     )
//     }
    
//     function PostMasonry({posts, columns, tagsOnTop}){
//         return (
//             <section className='masonry' style={{gridTemplateColumns: `repeat(${columns}, minmax(275px,1fr))`}}>
//                 {
//                     posts.map((post, index) => 
//                     <MasonryPost {...{post, index, tagsOnTop, key:index}}  />)
//                 }
//             </section>
//         )
//     }

//     return (
//         <main className="home">            
//             <section className="container">
//                 <div className="row">
//                     <PostMasonry posts={trending} columns={3}/>
//                 </div>
//             </section>
            // <section className="bg-white">
            //     <section className="container">
            //         <div className="row">
            //             <h1>Recent Posts</h1>
            //             <PostGrid posts={recentPosts} />
            //         </div>
            //     </section>
            // </section>
            
//             <section className="container">
//                 <div className="row">
//                     <PostMasonry posts={trending} columns={3}/>
//                 </div>
//             </section>
//         </main>
//     )}



