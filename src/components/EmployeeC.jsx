import React from 'react';
import CircularC from './CircularC';
import { Animate } from "react-move";
import { easeExpOut } from "d3-ease";

const EmployeeC = () => {
    return (
        <div className="mx-auto  mt-2 bg-slate-100 h-[160px] w-11/12 rounded-xl flex items-center justify-around overflow-hidden perspective-1000">
            <div className='bg-red-100 rounded-lg h-5/6 w-2/6'>
                    <img  src="https://image.zdnet.co.kr/2017/11/27/sontech_UwHtMeBQIL6z.jpg"
                     className='w-full h-full rounded-lg'
                     alt="" />
            </div>
            <div className=' h-5/6 w-3/6'>
                <div className='flex justify-evenly bg-white'>
                <p className='text-black'>개발 1팀</p>
                <p className='text-black'>강요한 부장</p>
                </div>
                <div className='flex border-solid'>
                    <CircularC/>
                    <div className='w-2/5 h-1/2 m-auto grid'>
                        <button className='mt-2 px-4 py-2 border border-green-300 text-green-500 rounded hover:bg-green-50 hover:text-green-700 transition'>출근</button>
                        <button className='mt-2 px-4 py-2 border border-red-300 text-red-500 rounded hover:bg-red-50 hover:text-red-700 transition'>퇴근</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeC;