import React, { useState,useEffect } from 'react';
import {motion} from 'framer-motion';
import axios from 'axios';
const TodoPage = () => {
    const [user,SetUser] = useState('');
    const [progressIng,setPrograssing] = useState('done');
    const [todos,setTodos] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;
    useEffect(()=>{
       axios.get(`${apiURL}/todos`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            "Content-Type" : 'application/json'
        },params:{
            company : 'samsung',
            status : progressIng
        }
       }).then(res=>{
        console.log(res.data.data);
        setTodos(res.data.data);
       }).catch(err=>{
        console.log(err);
       }) 
    },[progressIng])
     // 즉 done, ing ,end 변경될따마다 컴포넌트 분리 
    return (
        <div className="bg-indigo-100 from-red-100 to-red-200 min-h-screen py-10">
          <h1 className="text-4xl text-center font-extrabold text-black mb-8">
            T O D O
          </h1>
          <div className="bg-white w-11/12 max-w-3xl mx-auto rounded-lg shadow-md p-6 space-y-4">
            <div className='flex-row'>
                <div className='flex'>
                <select className=' w-5/6 h-12 text-center text-4xl m-auto' 
                    value={progressIng}
                    onChange={(e)=>setPrograssing(e.target.value)}
                >
                    <option value="done">Done</option>
                    <option value='ing' >ing</option>
                    <option value='end'>end</option>  
                </select>
                </div>
            </div>
          {/* 출력될 데이터 */}
          {todos.map((item,index)=>(
            <motion.div
                key={item.id}
                className="flex items-center p-4 rounded-md hover:shadow-lg transition duration-200 border border-gray-200"
                initial={{opacity : 0, y:10}}
                animate={{opacity : 1, y: 0}}
                transition={{delay : index * 0.05}}
                whileHover={{scale : 1.02}}
            >
                              <p className="mr-4 bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm">
                    {item.id}
                  </p>
                  <p className="text-gray-800 font-medium text-base">{item.title}</p>
  
            </motion.div>
          ))}
          <div>
            
          </div>
          </div>
          
        </div>
    );
};

export default TodoPage;