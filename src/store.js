import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js';

export let {changeName, increase } = user.actions

let stock = createSlice({
    name: 'stock',
    initialState: [ 
        
    ],

    reducers : {
        plusCount(state, action) {
            let numId = state.findIndex((a) => { return a.id === action.payload})
            state[numId].count++
        },
        minusCount(state, action){
            let numId = state.findIndex((a) => { return a.id === action.payload})
            state[numId].count--
        },
        addItem(state, action) {
            // 아이템이 이미 카트에 있는지 확인
            let existingItem = state.find(item => item.id === action.payload.id);

            if (existingItem) {
                // 이미 존재하는 경우 수량을 업데이트한 새로운 배열을 생성
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, count: item.count + action.payload.count }
                        : item
                );
            } else {
                // 카트에 없는 경우 새로운 아이템을 배열에 추가
                return [...state, action.payload];
            }
        },

        removeItem(state, action) {
            // id 일치시키기
            let indexToRemove = state.findIndex(item => item.id === action.payload);

            // 찾았으면 상품에서 제거 
            if (indexToRemove !== -1) {
                state.splice(indexToRemove, 1);
            }
        }
    }
})

export let { plusCount, minusCount, addItem , removeItem} = stock.actions
//useState랑 같은 역할 
export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer
    }
})