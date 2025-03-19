import React from "react";

const Footer = ({ websiteName }) => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
      <p>© 2025 {websiteName}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
