import React from 'react';
import { Link } from 'react-router-dom';
import {
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20  border-2 text-foreground py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Info */}
          <div className="flex items-center gap-4">
            <img src="/logo2.png" alt="Adowise Logo" className="h-10 w-10" />
            <div>
              <h2 className="text-xl font-bold">adowise</h2>
              <p className="text-sm text-muted-foreground">Expert guidance for your career.</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-md bg-muted hover:bg-muted-foreground/10 transition"
                aria-label="Social Link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center md:justify-end gap-6 text-sm">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/experts" className="hover:text-primary">Experts</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>hello@adowise.com</span>
            </div>
          </div>
          <p className="mt-2">&copy; {new Date().getFullYear()} Adowise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
