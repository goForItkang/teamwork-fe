import React from 'react';
import "../css/header.css";
import { useState } from 'react';
import {Link, useParams} from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const {company} = useParams();
  // 포맷된 날짜와 시간
  const formattedDateTime = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${days[today.getDay()]}) ${hours}:${minutes}`;
  
  return (
    <div className="relative">
      <div className="bg-indigo-300  px-4 py-4">
        <div className='flex justify-end gap-3'>
        <p className=''>{formattedDateTime}</p>
        <p className="border-b-2 border-transparent hover:border-white hidden sm:block">마이페이지</p>
        <p className="border-b-2 border-transparent hover:border-white hidden sm:block">로그아웃</p>
        </div>
        
        <div className="flex items-center gap-6 sm sm:flex-col">
          {/* 일반적인 text */}
          <img
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer hover:bg-slate-900 p-2 rounded w-10 sm:hidden"
            src="/menu_40dp_CCCCCC_FILL0_wght400_GRAD0_opsz40.svg"
            alt="메뉴바"
          />
          <div className="m-auto mt-3">
          <h1 className='m-auto text-white w-auto'>"Talk is cheap. Show me the code."</h1>
          </div>
          <div className='flex w-4/5 justify-between mx-auto flex-wrap sm:flex hidden sm:block' id='div'>
          <p className="text-white hidden sm:block">채팅</p>
          <Link to={`/${company}/notice`} className="text-white hidden sm:block">공지 사항</Link>
          <Link to={`/${company}/todo`} className="text-white hidden sm:block">TODO</Link>
          <Link to={`/${company}/schedule`} className='text-white hidden sm:block'>일정</Link>

          <p className="text-white hidden sm:block">알림</p>
                
          </div>
        </div>
      </div>
      {/* 모바일 환경일때 */}
      {/* 슬라이드 사이드바 */}
      {/* <div
        className={`fixed top-0 left-0 h-full w-50 bg-gray-800 text-white p-4 
            transform transition-transform duration-[1000ms] z-[999]
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex items-center'>     
        <p className="font-bold text-xl mb-4 w-4/5"> 메뉴</p>
        <img onClick={()=>setMenuOpen(false)} className='w-6 ml-32 mb-4 hover:bg-slate-500 ' src="arrow_back.svg" alt="화살표" />
        </div>
        <ul className="space-y-2 gap-4">
          <li>채팅</li>
          <Link to={`/${company}/notice`}>공지사항</Link><br></br>   
          <Link to={`/${company}/todo`}>TODO</Link>         
          <li >일정</li>
          <li>알림</li>
          <li>로그아웃</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Header;
