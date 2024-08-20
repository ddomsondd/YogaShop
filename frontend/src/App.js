import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<About/>} />
        <Route path="/mats" element={<ShopCategory category="mats"/>} />
        <Route path="/clothes" element={<ShopCategory category="clothes"/>} />
        <Route path="/accessories" element={<ShopCategory category="accessories"/>} />
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>} />
        </Route>
        <Route path="/card" element={<Cart/>} />
        <Route path="/login" element={<LoginSignup/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
