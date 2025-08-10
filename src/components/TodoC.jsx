import axios from 'axios';
import React, { useEffect, useState } from 'react';
import{useLocation} from 'react-router-dom';

const TodoC = () => {
  const company = useLocation().pathname.substring(1);
  const apiURL = process.env.REACT_APP_API_URL;
  const [todo,setTodo] = useState([]);
  const [department,setDepartment]  = useState(''); // 공백기
  useEffect(()=>{
    axios.get(`${apiURL}/todo/dash`,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
      },
      params :{
        company : company,
        department : department
      }
    }).then(res=>{
      console.log("todo data 확인",res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[todo])
  // todo 가 변경할때  
  return (
    <div className="mx-auto mt-2 bg-slate-100 h-[360px] w-11/12 rounded-xl flex flex-col items-center  overflow-hidden">
      <div className="flex items-center w-full  mt-4 mb-4">
        <p className="font-bold mb-2 text-lg m-auto text-center">TODO 리스트</p>
        <select className=" border border-gray-300 rounded px-2 py-1 text-sm absolute right-8">
          <option onClick={(e)=>setDepartment('개발 1팀')}>개발 1팀</option>
          <option onClick={(e)=>setDepartment('')}>강요한</option>
        </select>
      </div>
      <div className="flex w-full bg-blue-200 justify-around ">
        <div className='w-[30%]'>
            <p className="text-center bg-blue-500 text-white px-4 py-1 rounded">Done</p>
            <div className=''>
                <button>로그인</button>
            </div>
        </div>
        <div className='w-[30%]'>
            <p className="text-center bg-yellow-400 text-white px-4 py-1 rounded">Ing</p>
            <div className=''>
                <button>이슈처리</button>
            </div>
        </div>
        <div className='w-[30%]'>
            <p className="text-center bg-red-500 text-white px-4 py-1 rounded">End</p>
        </div>
      </div>
    </div>
  );
};

export default TodoC;
