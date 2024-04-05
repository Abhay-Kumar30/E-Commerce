import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/Search";
import { CartProvider } from "./context/cart";

// now we can use "antd" anywhere in the project
//  import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <AuthProvider>
     <SearchProvider>
             <CartProvider>
                 <BrowserRouter>
                             <App/>
                 </BrowserRouter>
             </CartProvider>
      </SearchProvider>
  </AuthProvider>


);

// here we can use <SearchProvider/>, <CartProvider/>, <AuthProvider/> in all pages or in all components

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();