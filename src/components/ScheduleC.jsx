import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ScheduleC = () => {
  const company = useLocation().pathname.substring(1);
  const apiURL = process.env.REACT_APP_API_URL;
  const [schedules, setSchedules] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiURL}/schedules`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        params: {
          company: company,
          month: 7,
        },
      })
      .then(res => {
    
        console.log("데이터 만 가져옴",res.data.data);
        setSchedules(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  useEffect(() => {
    if (!schedules || schedules.length === 0) return;
  
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % schedules.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, [schedules]);

  return (
    <div className="mx-auto mt-2 bg-slate-100 h-[160px] w-11/12 rounded-xl flex flex-col items-center justify-center overflow-hidden perspective-1000 max-w-[1200px]" >
      <div className='flex items-center justify-center gap-2'>
      <img className='w-6 h-6 mb-2' src="/calendar.svg" alt="" />
      <p className="text-center font-bold mb-2">7월 회사 일정</p>
      </div>
      

      <AnimatePresence mode="wait">
        {schedules.length > 0 && (
          <motion.div
            key={current}
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="bg-white p-4 rounded-lg shadow-md w-3/4 text-center origin-top"
          >
            
            <p className="font-bold text-lg">{schedules[current].title}</p>
            <p className="text-sm text-gray-600 mt-1">{schedules[current].startDate}  {" "+ schedules[current].endDate ||'날짜없음 '}</p>
            <div bg-red></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScheduleC;
