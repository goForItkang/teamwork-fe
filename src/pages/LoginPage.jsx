import React, { useState } from 'react';
import "../css/login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate(); 
    
    const loginSubmitHandler = (e)=>{
        e.preventDefault();
        const apiURL = process.env.REACT_APP_API_URL;
        axios.post(`${apiURL}/login`,{
            loginId : id,
            password : password 
        })
        .then(res=>{
            console.log(res.data.data);
            if(res.data.code===200){
              localStorage.setItem("token",res.data.data);
              const company = "samsung";
              navigate(`/${company}`);  
            }else{
              // 만약 데이터가 잘 못 전송되면 나는 오류 
              alert("패스워드 및 데이터를 확인해주세요")
            }
        }).catch(err=>{
            // 실패 했을때 로직 처리
            console.log(err);
        })
    }

    return (
        <div id='login-container'>
            <div className='m-auto bg-white/10 backdrop-blur-md border shadow-lg border-white/20 sm:w-4/5 lg:w-1/2 w-4/5 h-3/4 rounded-xl'>
        <h1 className='text-slate-200 text-White font-bold text-5xl lg:text-7xl text-center mt-4'>
          Company Space
        </h1>
        <form className="flex justify-center mt-14 w-4/6 m-auto min-h-[300px]  border-white/20 rounded-xl  py-10 px-6 sm:px-12">
  <div className="flex flex-col items-center w-full max-w-md text-white gap-6">
    <div className="w-full">
      <label className="block text-xl sm:text-2xl font-bold mb-2">ID</label>
      <input
        type="text" onChange={(e)=>setId(e.target.value)} value={id}
        className="w-full h-10 sm:h-12 px-4 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>

    <div className="w-full">
      <label className="block text-xl sm:text-2xl font-bold mb-2">Password</label>
      <input
        type="password" onChange={(e)=>setPassword(e.target.value)} value={password}
        className="w-full h-10 sm:h-12 px-4 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>

    <button
      type="submit" onClick={loginSubmitHandler}
      className="mt-6 w-40 sm:w-64 h-10 sm:h-14 bg-white/30 hover:bg-white/50 text-white font-extrabold rounded-md shadow transition"
    >
      Login
    </button>
  </div>
</form>

    
      </div>
        </div>
    );
};

export default LoginPage;