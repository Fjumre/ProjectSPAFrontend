import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Applayout from './layout/Applayout';
import PageNotFound from './page/PageNotFound';
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import Posts from './page/Posts';
import Post from './page/Post';
import { useState } from 'react';
import LoginForm from './auth/LoginForm';
import ProtectedRoute from './auth/ProtectedRoute';
import Calendar from './page/Calendar';
import ToDoList from './page/ToDoList';


const Test = styled.div`
  background-color: var(--color-purple-50);
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ isLoading: false, error: false, user: { name: '', roles: [] } });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Applayout />}>
          <Route index element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='/calendar/:date' element={<ToDoList />} />
          <Route
            path='/posts'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Posts />
              </ProtectedRoute>
            }
          >
            <Route path='new' element={<h1>New Posts</h1>} />
            <Route path=':postid' element={<Post />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
