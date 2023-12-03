import {Table} from 'react-bootstrap'
import {  useDispatch ,useSelector } from 'react-redux';
import { minusCount, plusCount, removeItem } from '../store.js';

function Cart () {
    
    let state = useSelector((state)=> state)
    let dispatch = useDispatch() //store에 있는 함수 호출
    
    //redux store state 꺼내는 방법
    
    return (
        <div>
            {state.user.name} {state.user.age}의 장바구니 
            <Table>
                <thead>
                    <tr>
                    <th>#</th> 
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {   
                        state.stock.length === 0 ? <p>담은상품이없습니다.</p> :
                        state.stock.map((a,i) => {
                            return <tr key={i}>
                                <td>{state.stock[i].id}</td>
                                <td>{state.stock[i].name}</td>
                                <td>{state.stock[i].count}</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(plusCount(state.stock[i].id))
                                    }}>+</button>
                                    <button onClick={() => {
                                        dispatch(minusCount(state.stock[i].id))
                                    }}>-</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(removeItem(state.stock[i].id))
                                    }}>삭제</button>
                                </td>

                            </tr>
                        })
                    }
                    
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;