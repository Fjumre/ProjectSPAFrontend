import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Applayout from './layout/Applayout';
import PageNotFound from './page/PageNotFound';
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import { useState } from 'react';
import LoginForm from './auth/LoginForm';
import ProtectedRoute from './auth/ProtectedRoute';
import Calendar from './page/Calendar';
import RegistrationForm from './auth/Registration';
import LogoutForm from './auth/LogoutForm';
import ToDoListForm from './page/ToDoListForm';
import MainNav from './layout/MainNav';
import UpdateForm from './page/UpdateForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ isLoading: false, error: false, user: { username: '', roles: [] } });

  return (
    <BrowserRouter>
      <MainNav isLoggedIn={isAuthenticated} />
      <Routes>
        <Route element={<Applayout />}>
          <Route index element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/registration' element={<RegistrationForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path='/calendar'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ToDoListForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/calendar/:date'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ToDoListForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/update/:id'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/logout'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LogoutForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
