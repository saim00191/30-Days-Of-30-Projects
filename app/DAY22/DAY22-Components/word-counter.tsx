"use client";
import { useState } from "react";

const WordCounter = () => {
  const [text, setText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [letterCount, setLetterCount] = useState<number>(0);

  const countWordsAndLetters = () => {
    const words = text.trim().split(/\s+/)
    setWordCount(words.length);
    setLetterCount(text.replace(/\s/g, "").length);
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center">
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Word Counter
        </h1>
        <textarea
          className="border border-gray-300 rounded-md p-2 w-full h-40 mb-4 resize-none outline-none"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-medium">
            Word Count: <span className="font-bold">{wordCount}</span>
          </div>
          <div className="text-lg font-medium">
            Letter Count: <span className="font-bold">{letterCount}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={countWordsAndLetters}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Count Words & Letters
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
