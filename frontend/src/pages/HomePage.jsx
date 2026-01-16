import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-32 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          📘 Smart Notes App
        </h1>
        <p className="text-lg mb-8 max-w-xl mx-auto drop-shadow-sm">
          Organize, search, and manage your learning notes efficiently with a clean, modern interface.
        </p>
        <div className="flex justify-center gap-4">
          <Link to='/allNotes'>
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition">
            See all Notes
          </button>
          </Link>
            <Link to='/dashboard'>
              <button className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
            Your activity
          </button>
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose Our Notes App?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-semibold text-xl mb-2">Fast & Lightweight</h3>
            <p className="text-gray-500 text-sm">
              Access your notes instantly without lag, even with hundreds of notes.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-semibold text-xl mb-2">Smart Search</h3>
            <p className="text-gray-500 text-sm">
              Quickly find what you need using our advanced search and filtering.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-semibold text-xl mb-2">Organized & Sorted</h3>
            <p className="text-gray-500 text-sm">
              Keep your notes neat and sorted by newest or oldest for better tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Organize Your Notes?
        </h2>
        <p className="mb-8 text-gray-100 max-w-xl mx-auto">
          Start using our notes app today and take control of your learning journey.
        </p>
        <Link to="/allNotes" className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition">
          Start Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10 px-6 text-center">
        <p>© 2026 Smart Notes App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
