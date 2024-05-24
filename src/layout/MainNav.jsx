import { NavLink } from "react-router-dom";
import '../landscaping.css'; 

function MainNav({ isLoggedIn }) {
  return (
    <div className="myHeader">
      <ul>
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
        {!isLoggedIn && (
          <>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/registration'>Registration</NavLink></li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li><NavLink to='/calendar'>Calendar</NavLink></li>
            <li><NavLink to='/calendar/new'>New To Buy</NavLink></li>
            <li><NavLink to='/logout'>Logout</NavLink></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MainNav;
