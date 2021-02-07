import React, {useEffect, useContext, useState, useMemo} from 'react'
import PostsContext from '../context/posts/postsContext'
import  PostItem from '../components/common/postItem'
import {Pagination} from 'antd'
import {withRouter} from 'react-router-dom'

const Blog = ({posts}) => {
    
    return (  
        <main className="home">
            

            <section className="bg-white">
                <section className="container">
                    <div className="row">
                        <h1>All Posts</h1>
                        {
                              <PostItem />
                        }  
                    </div>
                </section>
                
            </section>           
        </main>
        
    )
}
export default withRouter(Blog)