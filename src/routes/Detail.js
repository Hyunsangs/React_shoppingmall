import React, { useEffect, useState, Use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { addItem } from "../store";
import { useDispatch } from "react-redux";

function Detail (props) {
    let navigate = useNavigate();
    let {id} = useParams();
    let dispatch = useDispatch();
    let searchProdcut = props.shoes.find(x => x.id === id)
    let [ tab, SetTab] = useState(0)
    
    let [alert , setAlert] = useState(true)
    let [text, setText] = useState('');
    let [ error, setError] = useState(false)
    let [ fade, setFade] = useState('');

    useEffect(() => {
        // 최근 본 상품 local에 저장
        let localItem = localStorage.getItem('watched')
        localItem = JSON.parse(localItem)
        localItem.push(searchProdcut.id)
        localItem = new Set(localItem)
        localItem = Array.from(localItem)
        localStorage.setItem('watched', JSON.stringify(localItem))
    }, [])

    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(false)
        }, 2000)

        return () => {
            clearTimeout(a)
        }
    }, [])

    useEffect(() => {
        setError(isNaN(text))
   }, [text])
    
    useEffect(() => {
        setTimeout(() => { setFade('end')}, 10) //탈부착 end를 붙이는 것
        

        return () => {
            setFade('')
        }
    }, [tab]) //애니메이션 만드는 함수
  
    
    return (
        <div className="container">
            {
                alert === true ? (
                <div className="alert alert-warning">2초이내 구매시 할인</div>) 
                :
                null

            }
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${searchProdcut.id+1}.jpg`} width="100%" />
                </div>
                {
                    error && <div>숫자만 입력하세요</div>
                }
                <input onChange={(e) => { setText(e.target.value) }}
                type="text" 
                placeholder="수량 입력란">
                </input>
                <div className="col-md-6">
                    <h4 className="pt-5">{searchProdcut.title}</h4>
                    <p>{searchProdcut.content}</p>
                    <p>{searchProdcut.price}원</p>
                    <button onClick={() => {
                        dispatch(addItem({ 
                            id : searchProdcut.id,
                            name : searchProdcut.title,
                            count : parseInt(text) || 1,
                            }))
                        navigate('/cart');
                    }} className="btn btn-danger">주문하기</button>
                </div>
            </div>
            <Nav variant="tabs" defaultActivekey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => SetTab(0)} eventKey="link0">
                        버튼0
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => SetTab(1)} eventKey="link1">
                        버튼1
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => SetTab(2)} eventKey="link2">
                        버튼2
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            { tab === 0 && <div className={'start ' + fade}>{searchProdcut.title}</div>}
            { tab === 1 && <div className={'start ' + fade}>내용1</div>}
            { tab === 2 && <div className={'start ' + fade}>내용2</div>}
        </div>
    )
}

export default Detail;