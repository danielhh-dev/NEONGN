import { createSlice } from "@reduxjs/toolkit"

const initialState = {}



const categorySlice = createSlice ({

    name: "category",
    initialState,
    reducers: {
        setCategory(state, action){
            const {category} = action.payload
            state.category = category
        }
    }
})

export const {setCategory} = categorySlice.actions
export default categorySlice.reducer