import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
    name:'teams',
    initialState: {
        isOpen: false,
        activeId: ''
    },
    reducers:{
        open:(state, action:PayloadAction<boolean>) => {
            return {
                ...state,
                isOpen: action.payload
            }
        },
        setActiveId: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                activeId: action.payload
            }
        }
    }
})

export const { open, setActiveId } = teamSlice.actions
const teamReducer = teamSlice.reducer

export default teamReducer