import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Print Shop</h3>
            <p className="text-gray-300">
              Your one-stop destination for high-quality printing services. 
              We specialize in custom cards and design solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-300 not-italic">
              123 Print Street<br />
              Designville, DV 12345<br />
              Email: info@printshop.com<br />
              Phone: (123) 456-7890
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Print Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;