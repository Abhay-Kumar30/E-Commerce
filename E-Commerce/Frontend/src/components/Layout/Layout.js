import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
    <Helmet>
        {/* // it use to make our titlebar dynamicly change according to page */}
        {/* we provide this feactise of meta tags to make our website more visible on to on search engine optimization */}
       <meta charset="UTF-8" />
       <meta name="description" content={description} />
       <meta name="keywords" content={keywords} />
       <meta name="author" content={author} />
       <title>{title}</title>

    </Helmet>
      <Header />
         <main style={{ minHeight: "100vh" }}>
         <Toaster />
            {children}
         </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps={
  title: "E-commerce",
  description: "My project",
  keywords:"Smart work",
  author:"Abhay Kumar"
}

export default Layout;