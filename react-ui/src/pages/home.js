import React,{useState, useEffect} from 'react'
import axios from 'axios'
function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`/api/v1/posts`)
            .then(res =>{                
                setPosts(res.data)
            }).catch(error => {
                console.error(error)
            })     
    }, [])
    
    return (
        <div>
          {            
              posts.map((post, index) => (
                  <>
                  <li key={index}>{post.title}</li>
                  <li>{post.description}</li>
                  </>
              ))            
          }
        </div>
    )
}

export default Home
