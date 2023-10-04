import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center text-capitalize mb-0 py-2 text-light fw-bold">
        All Right Reserved &copy; revisestudy.in
      </h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link> |<Link to="/contact">Contact</Link> |
        <Link to="/privacy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
