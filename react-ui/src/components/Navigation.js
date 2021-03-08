import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Avatar} from 'antd'

const navLinks = [
    {
        title: 'Blog',
        path: '/'
      },
      {
        title: 'Nutrition',
        path: '/nutrition'
      },
      {
        title: 'Mind & Body',
        path: '/mind'
      },
      {
        title: 'Lifestyle',
        path: '/lifestyle'
      },
      {
        title: 'Inspiration',
        path: '/inspiration'
      },
      {
        title: 'Login',
        path: '/login'
      },

]
 
function Navigation() {
    const [menuActive, setMenuActive] = useState(false)

    return (
       <nav className={`site-navigation ${menuActive && 'active'}`} role="navigation">  
        <span  className="menu-title">Brain health Blog</span>   
        <div  className="menu-content-container">
        <ul>
            {
                navLinks.map((navLink, index) => (                   
                        <li key={index}>
                            <Link to={navLink.path}>{navLink.title}</Link>
                        </li>  
                ))
            }
        </ul>  
        <div className='menu-avatar-container'>
            <Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <span className="menu-avatar-name">Dominic Ngalo</span>
        </div>
        </div>     
        <i 
            className="icon ionicons ion-ios-menu"
            onClick={(ev) => setMenuActive(!menuActive)}
        />        
       </nav>
    )
}

export default Navigation
