import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import data from './data.js';
import Product from './Product.js';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Detail from './routes/Detail.js';
import About from './routes/About.js';
import axios from 'axios';
import Cart from './routes/Cart.js';



function App() {
    
    useEffect(() => {
        if('watched' === null){
            localStorage.setItem('watched', JSON.stringify( [] ))
        }
        
    },[])

    

    let [shoes, setShoes] = useState(data);
    let navigate = useNavigate();
    let [count, setCount] = useState(2); 
    let [loading , setLoading] = useState(false);
    
    
    const dataGet = () => {
        
        const url = `https://codingapple1.github.io/shop/data${count}.json`;
        setLoading(true); // dataget 함수 실행시 로딩중 발생 
        axios.get(url)
        .then((result)=> {
            let shoesCopy = [...shoes, ...result.data]
            setShoes(shoesCopy)
            setCount(count+1)
            console.log(count)
        })
        .catch(() => {
            console.log("Data get fail")
        }).finally(() => {
            // 로딩중 구현하기
            setLoading(false);
        });
    }

    
    return (
        <div className='App'>
           
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand onClick={() => navigate('./')}>Shopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link onClick={() => { navigate('./') }}>Home</Nav.Link>
                        <Nav.Link onClick={() => { navigate('./cart') }}>Cart</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
            <Route path='/' element={
            <>
            <div className='main-bg'></div>

            <div className='container'>
                <div className='row'>
                    {
                    shoes.map((a, i) => { 
                        return ( <Product shoes={ shoes[i] } i={i}/>
                        )})
                    }
                </div>
                {loading && <div>Loading...</div>}
                {
                    count === 4 ? null : <button onClick={dataGet}>더보기</button> // 3개의 데이터 까지 불러오고 버튼 없앰.
                }
                
            </div>
            </>
            } />
            
            <Route path='/detail/:id' element={<Detail shoes={shoes} /> }/>
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} >
                <Route path='member' element={<div>멤버임</div>} />
                <Route path='location' element={<div>위치임</div>} />
            </Route>
            </Routes>
            

        </div>
    )
}

export default App;