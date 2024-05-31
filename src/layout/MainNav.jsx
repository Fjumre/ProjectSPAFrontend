import { NavLink, useNavigate } from 'react-router-dom';
import '../landscaping.css';

function MainNav({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    navigate(`/calendar/${currentDate}`);
  };

  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
  const username = localStorage.getItem('username'); // Retrieve username from local storage
  console.log("Retrieved userId:", userId);
  console.log("Retrieved username:", username);

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
            <li><NavLink to='/calendar' onClick={handleCalendarClick}>My List</NavLink></li>
            <li><NavLink to={`/update/${userId}`}>Edit Info</NavLink></li> 
            <li><NavLink to='/logout'>Logout</NavLink></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MainNav;