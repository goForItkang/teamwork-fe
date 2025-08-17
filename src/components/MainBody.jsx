import React from 'react';
import ScheduleC from './ScheduleC';
import NoticeC from './NoticeC';
import EmployeeC from './EmployeeC';
import TodoC from "./TodoC";

const MainBody = () => {
    return (
        <div className='min-h-3.5 flex flex-col  bg-indigo-100 overflow-y-auto '>
        <EmployeeC></EmployeeC>
        <ScheduleC></ScheduleC>
        <NoticeC></NoticeC>
        <TodoC></TodoC>
        
        </div>
    );
};

export default MainBody;