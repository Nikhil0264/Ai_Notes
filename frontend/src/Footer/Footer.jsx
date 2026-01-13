import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-xl">
              🎓
            </div>
            <h2 className="text-lg font-bold">NotesApp</h2>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            A smart e-learning platform designed to help students and instructors
            create, manage, and learn from AI-powered notes anytime, anywhere.
          </p>
        </div>

        {/* Learning */}
        <div>
          <h3 className="font-semibold mb-4">Learning</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="#" className="hover:text-white">Courses</Link></li>
            <li><Link to="#" className="hover:text-white">My Learning</Link></li>
            <li><Link to="#" className="hover:text-white">Notes</Link></li>
            <li><Link to="#" className="hover:text-white">Assignments</Link></li>
            <li><Link to="#" className="hover:text-white">Certificates</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="#" className="hover:text-white">Blog</Link></li>
            <li><Link to="#" className="hover:text-white">Documentation</Link></li>
            <li><Link to="#" className="hover:text-white">Tutorials</Link></li>
            <li><Link to="#" className="hover:text-white">Community</Link></li>
            <li><Link to="#" className="hover:text-white">Webinars</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="#" className="hover:text-white">About Us</Link></li>
            <li><Link to="#" className="hover:text-white">Careers</Link></li>
            <li><Link to="#" className="hover:text-white">Partners</Link></li>
            <li><Link to="#" className="hover:text-white">Press</Link></li>
            <li><Link to="#" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="#" className="hover:text-white">Help Center</Link></li>
            <li><Link to="#" className="hover:text-white">FAQs</Link></li>
            <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-white">Accessibility</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} NotesApp. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 text-lg">
            <a href="#" className="hover:text-blue-200 transition">🌐</a>
            <a href="#" className="hover:text-blue-200 transition">🐦</a>
            <a href="#" className="hover:text-blue-200 transition">📘</a>
            <a href="#" className="hover:text-blue-200 transition">💼</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
