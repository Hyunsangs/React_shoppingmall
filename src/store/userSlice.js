import { createSlice } from "@reduxjs/toolkit"
let user = createSlice({
    name: 'user',
    initialState: { name : 'john kim', age : 20},
    reducers : {
        changeName(state){
            state.name = 'john park'
        },
        increase(state , action) {
            state.age += action.payload
        },
        //action 파라미터 사용하기 위한 방법
        //increase(10) (숫자) 넣어서 파라미터 전달
    }
})

export let {changeName, increase } = user.actions

export default user