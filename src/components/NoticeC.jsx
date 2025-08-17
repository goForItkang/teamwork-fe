import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NoticeC = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const [notice, setNotice] = useState([]);
  const [current, setCurrent] = useState(0);
  const company = useLocation().pathname.substring(1);

  useEffect(() => {
    axios
      .get(`${apiURL}/notice`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        params: {
          company: company,
          month: 7
        }
      })
      .then(res => {
        console.log(res);
        setNotice(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (notice.length > 0) {
      const interval = setInterval(() => {
        setCurrent(prev => (prev + 1) % notice.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [notice]);

  return (
    <div className="mx-auto mt-2 bg-slate-100 h-[160px] w-11/12 rounded-xl flex flex-col items-center justify-center overflow-hidden perspective-1000 max-w-[1200px]">
      <div className='flex items-center justify-center gap-2'>
        <img className='w-6 h-6 mb-2' src="/campaign.svg" alt="공지 아이콘" />
        <p className="text-center font-bold mb-2">회사 공지사항</p>
      </div>

      <AnimatePresence mode="wait">
        {notice.length > 0 && (
          <motion.div
            key={current}
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="bg-white p-4 rounded-lg shadow-md w-3/4 text-center origin-top"
          >
            
            <div className=''>
            <p className="font-bold text-lg text-center">{notice[current].title}</p>      
            </div>
            <p className="text-sm text-gray-600 mt-1">{notice[current].createAt || '날짜 없음'}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticeC;
