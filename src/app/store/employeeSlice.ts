import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployeeState, ApiStatus, IEmployeeForm, IUpdateEmployeeActionProps } from "../../types";
import { getEmployeesApi, addEmployeeApi, deleteEmployeeApi, updateEmployeeApi } from "../../service/api/api";



const initialState: IEmployeeState = {
    employees: [],
    getEmployeesStatus: ApiStatus.ideal,
    addEmployeeFormStatus: ApiStatus.ideal,
    updateEmployeeFormStatus: ApiStatus.ideal
}

export const getEmployees = createAsyncThunk(
    'employee/getEmployees',
    async () => {
        const response = await getEmployeesApi()
        return response.data
    }
)

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (data: IEmployeeForm) => {
        const response = await addEmployeeApi(data)
        return response.data
    }
)
export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id: number) => {
        await deleteEmployeeApi(id)
        return id;
    }
)


export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async ({ id, data }: IUpdateEmployeeActionProps) => {
        const response = await updateEmployeeApi(id, data)
        return response.data
    })


const employeeSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetAddEmployeeStatus: (state) => {
            state.updateEmployeeFormStatus = ApiStatus.ideal
        },
        resetUpdateEmployeeStatus: (state) => {
            state.addEmployeeFormStatus = ApiStatus.ideal
        }
    },
    extraReducers: (builder) => {
        

        //get Employees
        builder.addCase(getEmployees.pending, (state) => {
            state.getEmployeesStatus = ApiStatus.loading
        });
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.getEmployeesStatus = ApiStatus.ideal
            state.employees = action.payload
        });
        builder.addCase(getEmployees.rejected, (state) => {
            state.getEmployeesStatus = ApiStatus.error;
        });


        //add Employee
        builder.addCase(addEmployee.pending, (state) => {
            state.addEmployeeFormStatus = ApiStatus.loading

        });
        builder.addCase(addEmployee.fulfilled, (state) => {
            state.addEmployeeFormStatus = ApiStatus.success

        });
        builder.addCase(addEmployee.rejected, (state) => {
            state.addEmployeeFormStatus = ApiStatus.error;
        });


        //delete Employee
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            const newList = state.employees.filter(x => x.id !== action.payload)
            state.employees = newList
        });


        //update Employee
        builder.addCase(updateEmployee.pending, (state) => {
            state.updateEmployeeFormStatus = ApiStatus.loading
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.updateEmployeeFormStatus = ApiStatus.success
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.updateEmployeeFormStatus = ApiStatus.error
        });
    }
})


export default employeeSlice.reducer;
export const { resetAddEmployeeStatus, resetUpdateEmployeeStatus } = employeeSlice.actions