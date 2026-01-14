import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import Pdf from "../components/Pdf.jsx";
import ChatAi from "../components/ChatAi.jsx";

function NotesList() {
  const [isSwapped, setIsSwapped] = useState(
  () => JSON.parse(localStorage.getItem("swapLayout")) || false
  );
  const [selectedNote, setSelectedNote] = useState(null);

  const [state,setState] = useState(null)
  const { role } = useAuth();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
  const handleKey = (e) => {
    if (e.key.toLowerCase() === "s") {
      setIsSwapped(prev => !prev);
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);


useEffect(() => {
  localStorage.setItem("swapLayout", JSON.stringify(isSwapped));
}, [isSwapped]);

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/user/all_notes")
      .then((res) => {
        setNotes(Array.isArray(res.data.notes) ? res.data.notes : []);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let temp = [...notes];

    if (search) {
      temp = temp.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    temp.sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    setFilteredNotes(temp);
  }, [search, sort, notes]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📘 My Notes</h1>
          <p className="text-sm text-gray-500">
            Manage your learning notes efficiently
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          {role === "admin" && (
            <Link to="/admin">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg
                         hover:bg-blue-700 transition ml-4"
              >
                Upload Note
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
        </div>
      )}

      {/* Empty */}
      {!isLoading && filteredNotes.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-semibold text-gray-700">No notes found</h2>
          <p className="text-sm text-gray-500 mt-2">
            Try creating or searching a different note.
          </p>
        </div>
      )}

      {/* Notes Grid */}
      {!isLoading && filteredNotes.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl border border-gray-200 p-6
                         shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {note.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{note.description}</p>

              {/* PDF Preview */}
              {note.fileUrl && (
                <iframe
                  src={note.fileUrl}
                  width="100%"
                  height="300px"
                  className="border rounded mb-2"
                  title={note.title}
                ></iframe>
              )}

              {/* Download PDF */}
              {note.fileUrl && (
                <button
            onClick={async () => {
              try {
                const res = await fetch(note.fileUrl);
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${note.title}.pdf`; // filename
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error("Download failed:", err);
              }
            }}
            className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download PDF
              </button>

              )}


              <button
                  onClick={() => {
                    setSelectedNote(note);
                    setState(true); // show PDF + Chat panel
                  }}
                  className="mt-3 text-green-600 hover:underline"
                >
                  See
                </button>      
            </div>
          ))}
          {state && (
            <div className="fixed inset-0 bg-gray-100 bg-opacity-95 z-50 flex flex-col md:flex-row">
              {/* Left: PDF Viewer */}
              <div className="md:w-2/3 w-full p-4">
                <Pdf fileUrl={selectedNote?.fileUrl} />
              </div>

              {/* Right: AI Chat */}
              <div className="md:w-1/3 w-full p-4 border-l border-gray-300">
                <ChatAi />
              </div>

              {/* Close Button */}
    <button
      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={() => setState(false)}
    >
      Close
    </button>
  </div>
)}


        </div>
      )}
    </div>
  );
}

export default NotesList;


