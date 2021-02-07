import React, {useEffect, useRef, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PostsContext from '../context/posts/postsContext'
// import {useQuery} from '@apollo/client';
import {Button} from 'antd';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
// import {GET_POST_QUERY} from '../queries/posts';


export default function PostViewer () {
    const {getPost, post} = useContext(PostsContext)
    const contentContainer = useRef(null)
    const {id} = useParams()
    let history = useHistory();
    console.log(id)

    useEffect(() => {
        getPost(id)
    },[])
    
    function editPost() {
        return history.push({
            pathname: '/edit-post',
            state: {
                post
            }
        });
    }

    useEffect(() => {
        if(contentContainer.current !== null) {
            const article = document.createElement('article')
            const options = {
                readOnly: true,
                modules: {
                    toolbar: '#toolbar'
                  }
            }

            new Quill(article, options)

            setTimeout(() => { contentContainer.current.appendChild(article) }, 0)
        }
    },[post])

    return (
        <main className="post-viewer">
            <Button type="primary" onClick={editPost}>Edit Post</Button>
            <section ref={contentContainer}></section>
        </main>
    )
}