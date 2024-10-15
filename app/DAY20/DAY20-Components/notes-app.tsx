"use client";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface NoteType {
  title: string;
  content: string;
}

const NotesApp = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState("");

  const addNote = () => {
    if (!title || !content) {
      setError("Please enter both title and content");
      return;
    }
    setNotes([...notes, { title, content }]);
    setTitle("");
    setContent("");
    setIsOpen(false);
    setError("");
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex justify-between py-3 w-full items-center bg-gray-400">
        <h1 className="text-3xl font-bold text-white underline ml-8">Notes</h1>
        <button
          className="px-4 py-2 bg-gray-900 mr-8 text-white rounded hover:bg-gray-700 transition"
          onClick={() => setIsOpen(true)}
        >
          Add Note
        </button>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 mt-8">
          {notes.map((note, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4 transition-transform transform duration-300 hover:scale-105 h-60 sm:h-72 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="mt-2 break-words sm:h-32 h-40 overflow-y-auto">
                  {note.content}
                </p>
              </div>

              <div className="flex justify-end mt-2 relative">
                <button
                  className="absolute bg-red-600 bottom-0 text-white p-2 rounded hover:bg-red-700"
                  onClick={() => deleteNote(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl my-auto font-semibold ">No Notes Available.</div>
      )}

      <div
        className={`fixed inset-0 z-50 flex justify-center items-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-white z-50 border border-gray-200 shadow-xl rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">New Note</h2>
            <button
              className="text-gray-500 hover:text-red-500 transition duration-300"
              onClick={onClose}
            >
              <RxCross2 size={24} />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter Notes"
            className="border border-gray-300 rounded w-full p-2 h-40 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {error && (
            <p className="text-red-500 font-medium text-center text-xl my-2">
              {error}
            </p>
          )}
          <button
            className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
