import React from "react";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh", padding: "0 1rem" }}>{children}</main>
      <ToastContainer />
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "RS Store🛍️",
  description:
    "We sell the best IT Courses for Web Applications development, and Software Development",
  keywords: "web development, programming, courses, IT",
  author: "Harish Rawal",
};
export default Layout;
