import React from 'react';
import Header from "../components/Header.jsx"
import MainBody from '../components/MainBody.jsx';
import {Route,Routes} from 'react-router-dom';
import NoticePage from './NoticePage.jsx';
import TodoPage from './TodoPage.jsx';
const MainPage = () => {
    
    return (
        <div className='h-screen'>
            <Header/>
            <Routes>
                <Route index element={<MainBody/>}/>
                <Route path="notice" element={<NoticePage/>}/>
                <Route path='todo' element={<TodoPage/>}/>
            </Routes>

        </div>
    );
};

export default MainPage;