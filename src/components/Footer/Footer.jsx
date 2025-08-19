import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-300 py-10 mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold text-white">☕ Sein Gyi Coffee Shop</h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              The perfect spot to relax, enjoy your favorite coffee,
              and spend quality time with friends. Freshly brewed happiness!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <Link to="/" className="hover:text-orange-400 transition">Home</Link>
            <Link to="/menu-page" className="hover:text-orange-400 transition">Menu</Link>
            <Link to="/process" className="hover:text-orange-400 transition">Our Process</Link>
            <Link to="/contact" className="hover:text-orange-400 transition">Contact Us</Link>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-orange-500 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-orange-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-orange-500 transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sein Gyi Coffee Shop | made by Kaung Zaw Thein(Full Stack Developer).
        </div>
      </div>
    </footer>
  );
};

export default Footer;
