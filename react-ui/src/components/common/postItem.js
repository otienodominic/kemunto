import React, {useContext, useEffect, useState,useMemo} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {useHistory, withRouter} from 'react-router-dom'
// import {Pagination} from 'antd'
import {TagRow} from './'
// import { PostGrid} from '../components/common'
import PostsContext from '../../context/posts/postsContext'
const PostItem =(props)=> { 
    const {getPosts, posts} = useContext(PostsContext)
    // const {id, first_name, last_name,description, created_at,title, categories,image} = post
    useEffect(()=>{
        getPosts()
    }, [])
    const [pageSize, setPageSize] = useState(9)
    const [current, setCurrent] = useState(1)

    const paginatedPosts = useMemo(() => {
        const lastIndex = current * pageSize
        const firstIndex = lastIndex - pageSize

        return posts.slice(firstIndex, lastIndex)
    }, [current, pageSize, posts])

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [current, pageSize])
    function Item(){
        return (
            <section className="grid-pagination-container">
            <section className='post-grid container'>
                {
                    posts.map((post, index) => (
                        <div className='post-container'>
                    <figure>                    
                        <Link to={`/post/${post.id}`}>
                            <img src={post.image} alt={post.image}/>
                        </Link>
                   </figure>
                   <TagRow tags={post.categories} />
                   <h2>{post.title}</h2>
                   <p className="author-text">
                        <span>
                            By:
                            {post.first_name + ' ' + post.last_name}
                            {/* <Link to={`/authors/${post.first_name}`} >
                                {post.first_name}
                            </Link> */}
                        </span>
                        <span>
                            - {moment(post.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                        </span>
                    </p>
                    <p className="description-text">
                    {post.description}
                    </p>
                    {/* <Link to={post.link}>Read More...</Link> */}
                </div>
                    ))
                }
            </section>
            
        </section>
        )
    }
    return (
        <>       
            <Item />      
        
        </>
    
    )
}

export default withRouter(PostItem)