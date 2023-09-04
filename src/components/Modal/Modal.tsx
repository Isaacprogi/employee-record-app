import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { IEmployee } from '../../types';


interface IProps {
    children: JSX.Element;
    onClose: () => void
    setUserData: React.Dispatch<React.SetStateAction<IEmployee | null>>
}


export const Modal = (props: IProps) => {

    return (
        <div className='w-full fixed h-screen z-[900] top-0 left-0 bottom-0 right-0  flex flex-col items-center'>
            <div onClick={() => props.setUserData(null)} className="w-full h-full absolute top-0 left-0 opacity-[.7] bg-black">

            </div>
            <span onClick={() => props.setUserData(null)} className='absolute z-[300] cursor-pointer right-[2rem] top-[1rem]  text-white '><FaTimes /></span>
            <div className='mb-[4rem]'></div>
            {props.children}
        </div>
    )
}
