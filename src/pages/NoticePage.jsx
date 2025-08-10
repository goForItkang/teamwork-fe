import axios from 'axios';
import { a, div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageBar from '../components/PageBar';
import { motion } from 'framer-motion';
const NoticePage = () => {
    const [notice, setNotice] = useState([]);
    const company = useLocation().pathname.substring(1).split("/")[0];
    const apiURL = process.env.REACT_APP_API_URL;
    const [count, setCount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        axios.get(`${apiURL}/notices`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json'
            },
            params: {
                company: company,
                page: currentPage
            }
        }).then(res => {
            console.log(res.data.data);
            console.log("ddㅇ");
            setNotice(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }, [currentPage])
    useEffect(() => {
        axios.get(`${apiURL}/notices/count`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            params: {
                company: company
            }
        }).then(res => {
            console.log("count수", res.data.data);
            setCount(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className="bg-indigo-100 from-red-100 to-red-200 min-h-screen py-10">
          <h1 className="text-4xl text-center font-extrabold text-black mb-8">
            공지사항
          </h1>
      
          <div className="bg-white w-11/12 max-w-3xl mx-auto rounded-lg shadow-md p-6 space-y-4">
            {notice.length === 0 ? (
              <p className="text-center text-gray-500">등록된 공지사항이 없습니다.</p>
            ) : (
              notice.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center p-4 rounded-md hover:shadow-lg transition duration-200 border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="mr-4 bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm">
                    {item.id}
                  </p>
                  <p className="text-gray-800 font-medium text-base">{item.title}</p>
                </motion.div>
              ))
            )}
          </div>
      
          <div className="mt-8">
            <PageBar
              count={count}
              currentPage={currentPage}
              pageSize={10}
              pageBarSize={5}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
    );
};

export default NoticePage; 