import HttpService from '../../service/HttpService'
import ApiConfig from '../../service/ApiConfig'
import { IEmployeeForm,IEmployee } from '../../types'


export const getEmployeesApi = async() =>{
   return await  HttpService.get<IEmployee[]>(ApiConfig.employee)
}



export const addEmployeeApi = async(data:IEmployeeForm)=>{
   return await HttpService.post(ApiConfig.employee, data)
}


export const deleteEmployeeApi = async(id:number)=>{
   const url = `${ApiConfig.employee}/${id}`
   return await HttpService.delete(url)
}


export const  updateEmployeeApi = async(id:number,data:IEmployeeForm)=>{
   const url = `${ApiConfig.employee}/${id}`
   return await HttpService.put(url,data)
}