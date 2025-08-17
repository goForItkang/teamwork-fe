import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import "../css/calendar.css"; 
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { div } from 'framer-motion/client';

  
const SchedulePage = () => {
    const [month,setMonth] = useState(null);
    const [day,setDay] = useState(null);
    const [schedules,setSchedules] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;
    const company = useLocation().pathname.substring(1).split("/")[0];
    

    useEffect(()=>{
        axios.get(`${apiURL}/schedules`,
            {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
                "Content-Type" :  'application/json'
            },params : {
                month : 8,
                company : company
            }
        }).then(res=>{
            setSchedules(res.data.data);
            console.log(res.data.data);
        }).catch(err=>{
            console.log(err);
        })
        
    },[month,day])

    return (
        <div className="flex-grow bg-indigo-100 from-red-100 to-red-200 min-h-screen py-10">
            <div>
              dd
            </div>
            <Calendar
           tileContent={({ date, view }) => {
            if (view === "month") {
              const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
          
              for (let i = 0; i < (schedules?.length || 0); i++) {
                if (schedules[i].startDate === dateStr) {
                  return (
                    <div className="bg-red-700 w-5 h-5 rounded-full m-auto">
                      <p className='text-center text-white'>+5</p>
                    </div>
                  );
                }
              }
            }
            return null;
          }}          
             onActiveStartDateChange={({ activeStartDate, view }) => {
                if (view === "month") {
                  const month = activeStartDate.getMonth() + 1; // 현재 표시 중인 달
                  const year = activeStartDate.getFullYear();
                  console.log(`현재 달: ${year}-${month}`);
                }
              }}
            
                onClickDay={(value,event)=>{
                    const date = value.toISOString().split("T")[0];
                    console.log(date);
                    console.log(value);
                    console.log(event);
                }}
            />
        </div>
    );
};

export default SchedulePage;