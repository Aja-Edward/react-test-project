import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProductDescriptionPage from './components/ProductDescriptionPage'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryPage from './components/CategoryPage'
import CartPage from './components/CartPage'
import { GlobalStyle } from './styles/GlobalStyles';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component  {
  render() {
    return (
      <div className="App">
       <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/:id" element={<CategoryPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/product/:productId" element={<ProductDescriptionPage />} />
          
         </Routes>
        </BrowserRouter>
        </Provider>
    </div>
    )
  }

}




