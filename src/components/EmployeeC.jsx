import React, { useEffect, useState } from 'react';
import CircularC from './CircularC';
import { Animate } from "react-move";
import { easeExpOut } from "d3-ease";
import axios from 'axios';

const EmployeeC = () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const [attendance,setAttendance] = useState(null);
    const [employee,setEmployee] = useState(null);
    // 출근 버튼 로직
    const goToWork = () =>{
        axios.post(`${apiURL}/gotowork`,null, { 
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            console.log(res.data.data);
            
        }).catch(err=>{
            console.log(err);
        })
    }
    //출퇴근 가져오는 로직
    useEffect(()=>{
        axios.get(`${apiURL}/gotowork/check`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
                "Content-Type" : 'application/json'
            }
        }).then(res=>{
            console.log("출근 데이터",res.data.data);
            setAttendance(res.data.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    // 퇴근로직
    const getOffWork = () =>{
        axios.post(`${apiURL}/outwork`,null,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
                "Content-Type" : 'application/json' 
            }
        })
        .then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }
    // 유저 정보
    useEffect(()=>{
        axios.get(`${apiURL}/user/info`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            setEmployee(res.data.data);
        }).then(err=>{
            console.log(err);
        })
    },[])
    return (
        <div className="mx-auto  mt-2 bg-slate-100 h-[160px] w-11/12 rounded-xl flex items-center justify-around overflow-hidden perspective-1000
         sm:h-[250px] max-w-[1200px]
        " 
        >
            <div className='bg-red-100 rounded-lg h-5/6 w-2/6'>
                    <img  src="https://image.zdnet.co.kr/2017/11/27/sontech_UwHtMeBQIL6z.jpg"
                     className='w-full h-full rounded-lg'
                     alt="" />
            </div>
            <div className=' h-5/6 w-3/6 '>
                <div className='flex justify-evenly bg-white'>
                <p className='text-black sm:text-lg'>{employee?.department}</p>
                <p className='text-black text-center' >{employee?.username} {employee?.position}</p>
                </div>
                <div className='flex border-solid'>
                    <CircularC/>
                    <div className='w-2/5 h-1/2 m-auto grid'> 
                    {
                        attendance?.attendanceStart != null ? (
                            <button className='mt-2 px-4 py-2 border border-green-300 text-green-500 rounded hover:bg-green-50 hover:text-green-700 transition' onClick={()=>goToWork()}>출근 : {attendance?.attendanceStart}</button>
                        ):
                        (
                            <button className='mt-2 px-4 py-2 border border-green-300 text-green-500 rounded hover:bg-green-50 hover:text-green-700 transition' onClick={()=>goToWork()}>출근</button>
                        )
                    }
                    {
                        attendance?.attendanceEnd != null ? (
                            <button className='mt-2 px-4 py-2 border border-red-300 text-red-500 rounded hover:bg-red-50 hover:text-red-700 transition' onClick={()=>getOffWork()}>퇴근 : {attendance?.attendanceEnd}</button>   
                        ):
                        (
                            <button className='mt-2 px-4 py-2 border border-red-300 text-red-500 rounded hover:bg-red-50 hover:text-red-700 transition' onClick={()=>getOffWork()}>퇴근</button>
                        )
                    }   
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeC;