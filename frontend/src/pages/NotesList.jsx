import React, { useEffect, useState } from "react";
import api from "../services/api";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/user/all_notes")
      .then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  /* Search + Sort */
  useEffect(() => {
    let temp = [...notes];

    if (search) {
      temp = temp.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    temp.sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

   
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
        <div className="flex gap-3">
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
              key={note.id}
              className="bg-white rounded-2xl border border-gray-200 p-6
                         shadow-md hover:shadow-xl transition"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {note.title}
              </h3>

              {/* Content */}
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {note.content}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>
                  📅 {new Date(note.createdAt).toLocaleDateString()}
                </span>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesList;
