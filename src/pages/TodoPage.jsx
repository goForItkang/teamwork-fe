import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ModalCustomC from '../components/ModalCustomC';
import { button } from 'framer-motion/client';

const TodoPage = () => {
  const [user, SetUser] = useState('');
  const [progressIng, setPrograssing] = useState('done');
  const [todos, setTodos] = useState([]);
  const [detailsTodo, setDetailsTodo] = useState(null);
  const [open, setOpen] = useState(false);

  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiURL}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        company: 'samsung',
        status: progressIng,
      },
    })
      .then((res) => {
        console.log("데이터 가져온 정보 ",res.data)
        setTodos(res.data?.data ?? []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [progressIng, apiURL]);

  const todoHandler = (id) => {
    axios.get(`${apiURL}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => {
        setDetailsTodo(res.data?.data ?? null);
        setOpen(true); // ✅ 상세 받아오면 모달 열기
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const todoStart = (id) => {
    axios.put(
      `${apiURL}/todo/start`,
      null, // 바디 없음
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          id: id
        }
      }
    )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => { 
      console.log(err);
    });
  };
  const todoConfirm = (id) => {
    axios.put(
      `${apiURL}/todo/confirm`,
      null, // 바디 없음
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          id: id
        }
      }
    )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => { 
      console.log(err);
    });
  };

  return (
    <div className="bg-indigo-100 from-red-100 to-red-200 min-h-screen py-10">
      <h1 className="text-4xl text-center font-extrabold text-black mb-8">
        T O D O
      </h1>

      <div className="bg-white w-11/12 max-w-3xl mx-auto rounded-lg shadow-md p-6 space-y-4">
        <div className="flex">
          <select
            className="w-5/6 h-12 text-center text-4xl m-auto border rounded-md"
            value={progressIng}
            onChange={(e) => setPrograssing(e.target.value)}
          >
            <option value="done">Task</option>
            <option value="ing">Ing</option>
            <option value="end">End</option>
          </select>
        </div>

        {/* 리스트 */}
        {todos.map((item, index) => (
          <motion.div
            onClick={() => todoHandler(item.id)}
            key={item.id}
            className="flex items-center p-4 rounded-md hover:shadow-lg transition duration-200 border border-gray-200 cursor-pointer"
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
        ))}
      </div>

      {/* 모델창 컴포넌트 */}
      <ModalCustomC
        open={open}
        onClose={() => setOpen(false)}
        title={detailsTodo?.title ?? '상세 보기'}
      >
        {detailsTodo ? (
          <div className="space-y-3 text-sm text-gray-700">    
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-gray-900">상태</span>
              <span className="col-span-2">{detailsTodo.status}</span>

              <span className="font-semibold text-gray-900">생성일</span>
              <span className="col-span-2">{detailsTodo.createTime}</span>

              <span className="font-semibold text-gray-900">수정일</span>
              <span className="col-span-2">{detailsTodo.updatedAt}</span>

              <span className="font-semibold text-gray-900">만료기한</span>
              <span className="col-span-2">{detailsTodo.expiredTime}</span>
            </div>

            <div>
              <h3 className="font-semibold mb-1">내용</h3>
              <p className="rounded-lg border bg-gray-50 p-3 whitespace-pre-wrap">
                {detailsTodo.content ?? '-'}
              </p>
            </div>
            <div className='flex justify-between'>
                {detailsTodo.status === 'done' && (
                    <button className='hover:text-black' onClick={()=>todoStart(detailsTodo.id)} >시작하기</button>
                )}
                {detailsTodo.status === 'ing' && (
                    <button className='hover:text-black' onClick={()=>todoConfirm(detailsTodo.id)} >확인받기</button>
                )}
                
                <button className='hover:text-black'>문의 하기</button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">로딩 중…</div>
        )}
      </ModalCustomC>
    </div>
  );
};

export default TodoPage;
