import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store/store'
import { IEmployee, ApiStatus } from '../../types/Employee.types'
import { getEmployees } from '../../app/store/employeeSlice'
import { useEffect } from 'react'
import { Modal } from '../../components/Modal/Modal'
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard'
import { FaUser } from 'react-icons/fa'


const DashBoard = () => {

    const [userData, setUserData] = useState<IEmployee | null>(null)
    const { employees, getEmployeesStatus } = useAppSelector((state: RootState) => state.employee)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    return (
        <div className="grid grid-cols-auto-fill gap-4 px-[1rem] pb-[2rem] pt-[1rem] ">

            {
                getEmployeesStatus === ApiStatus.loading && <div className="fixed left-0 top-0 flex justify-center w-full h-screen">
                    <span className='text-5xl text-white mt-[19rem] font-[900]'>
                        LOADING.....
                    </span>
                </div>
            }
            {
                getEmployeesStatus === ApiStatus.error && <div className="fixed flex left-0 top-0 bg-red-700 justify-center w-full h-screen">
                <span className='text-5xl text-white  mt-[19rem] font-[900]'>
                    ERROR
                </span>
            </div>
            }

            {
                getEmployeesStatus === ApiStatus.ideal &&  employees.map((employee: IEmployee) => {
                    return <EmployeeCard data={employee} setUserData={setUserData} />
                })
            }

            {
                userData &&
                <Modal setUserData={setUserData} onClose={() => { setUserData(null) }}>
                    <>
                        <div className='max-w-[30rem] h-[20rem] w-full sm:border z-[300] border-white oveflow-hidden rounded-md mt-[2rem] flex flex-col items-center justify-center bg-neutral-900'>
                            <div className="w-[10rem] h-[10rem] bg-gray-700 flex items-center justify-center rounded-full overflow-hidden">
                                <FaUser className="text-[4rem] text-yellow-400"/>
                            </div>
                            <div className='w-full max-w-[10rem] justify-center items-center flex flex-col'>
                            <div className='text-white text-xl font-[500]'>{userData.firstname + " " + userData.lastname}</div>
                            <div className='text-white'>{userData.email}</div>
                            <div className='text-white'>{userData.country}</div>
                            </div>
                        </div>
                    </>
                </Modal>
            }

        </div>
    )
}

export default DashBoard