import { NavLink } from "react-router-dom"
import Home from "../page/Home"
import LoginForm from "../auth/LoginForm"


function MainNav(){
    return(
  <ul>
              <li><NavLink to='/home'>Home</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/contact'>Contact</NavLink></li>
              <li><NavLink to='/posts'>Posts</NavLink></li>
              <li><NavLink to='/posts/new'>New Post</NavLink></li>
              <li><NavLink to='/login'>Login</NavLink></li>

  
  
      </ul>
  
    )
  }


  export default MainNav