import { NavLink } from "react-router-dom"



function MainNav(){
    return(
  <ul>
              <li><NavLink to='/home'>Home</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/contact'>Contact</NavLink></li>
              <li><NavLink to='/calendar'>Calendar</NavLink></li>
              <li><NavLink to='/calendar/new'>New ToDo</NavLink></li>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/logout'>Logout</NavLink></li>
              <li><NavLink to='/registration'>Registration</NavLink></li>
              

  
  
      </ul>
  
    )
  }


  export default MainNav