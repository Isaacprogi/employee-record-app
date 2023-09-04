export interface IEmployee {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    country: string,
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error"
}

export interface IUpdateEmployeeActionProps {
    id: number,
    data: IEmployeeForm
}

export interface IEmployeeState {
    employees: IEmployee[],
    getEmployeesStatus: ApiStatus,
    addEmployeeFormStatus: ApiStatus
    updateEmployeeFormStatus: ApiStatus
}

export interface IEmployeeForm {
    firstname: string,
    lastname: string,
    email: string,
    country: string,
}