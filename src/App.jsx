import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar , Footer, ProductListContainer, Cart, CartContextProvider } from "./componets"
import './App.css'
function App() {
  return (
    <BrowserRouter>
    <CartContextProvider>
      <NavBar/>
      <Routes>
        <Route path="/" element={<ProductListContainer/>}/>
        {/* <Route path="/product/:id" element={<ProductDetailContainer/>}/> */}
        <Route path="/category/:category" element={<ProductListContainer/>}/>
        <Route path="/cart" element={<Cart/>} />
        {/* <Route path="/CheckOut" element={<CheckOut/>} /> */}
      </Routes>
      <Footer/>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
