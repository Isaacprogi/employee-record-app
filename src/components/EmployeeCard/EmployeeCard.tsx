import { useNavigate } from 'react-router-dom'
import { IEmployee } from '../../types'
import { useAppDispatch } from '../../app/hooks'
import { deleteEmployee } from '../../app/store/employeeSlice'
import { FaUser } from 'react-icons/fa'


interface EmployeeCardProps {
  data: IEmployee;
  setUserData: React.Dispatch<React.SetStateAction<IEmployee | null>>;
}


const EmployeeCard = (props: EmployeeCardProps) => {


  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteEmployee(props.data.id))
    props.setUserData(null)
  }

  const handleEdit = () => {
    return navigate(`/form/edit/${props.data.id}`)
  }


  return (
    <div className=' bg-neutral-800 border-[.5px]  border-neutral-600 cursor-pointer group  rounded-md overflow-hidden'>
      <div className="w-full max-w-[6rem] mt-[2rem] text-yellow-400 flex items-center justify-center h-6rem rounded-full overflow-hidden mx-auto">
        <span><FaUser className='text-5xl' /></span>
      </div>
      <div className='relative h-[8rem] overflow-hidden w-full flex flex-col items-center justify-center group-hover:scale-90 ease-in-out duration-300 cursor-pointer'>
        <p className='bg-gradient-to-r from-white  to-gray-600 text-3xl truncate px-3 bg-clip-text text-transparent max-w-full'>{props.data.firstname}</p>
        <p className='text-white z-[12] truncate max-w-full px-3'>{props.data.lastname}</p>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 text-white p-2">
        <button onClick={() => props.setUserData(props.data)} className='text  w-full h-full flex items-center justify-center duration-300 bg-neutral-900 p-2 white hover:bg-neutral-700'>View</button>
        <button onClick={handleEdit} className='text white w-full h-full bg-neutral-900 p-2 flex items-center justify-center  duration-300 hover:bg-neutral-700'>Edit</button>
        <button onClick={handleDelete} className='text white w-full h-full bg-neutral-900 p-2 flex items-center justify-center  duration-300 hover:bg-neutral-700'>Delete</button>
      </div>
    </div>
  )
}

export default EmployeeCard