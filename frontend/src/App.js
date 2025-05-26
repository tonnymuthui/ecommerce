import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// import Navbar from './components/Navbar';

// import Home from './pages/Home';
// import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Login from './pages/Login';

function App() {

    return <LoginPage/>;
    // return (
    //   <Router>
    //     <Navbar/>

    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/products" element={<Products />} />
    //         <Route path="/cart" element={<Cart />} />
    //         <Route path="/login" element={<Login />} />

    //        </Routes>




        
    //   </Router>
    // );

}

export default App;