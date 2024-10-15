"use client"
import Link from "next/link"
import { useState } from "react"

const HTMLPreviewApp = () => {
    // State to store the HTML code input by the user
    const [htmlcode, setHtmlcode] = useState<string>('')

    // Function to handle changes in the HTML textarea input
    const handleHTMLChange = (e: { target: { value: string } }) => {
        setHtmlcode(e.target.value)
    }

    return (
        <div className={`bg-gray-100 min-h-screen p-5 flex flex-col items-center `}>
          
          {/* Header Section */}
          <div className="text-center my-8">
            <h1 className="text-4xl uppercase md:text-6xl font-bold text-blue-600 underline">
              HTML Preview App
            </h1>
          </div>
      
          {/* Main Container for the input and preview sections */}
          <div className="w-full h-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
            
            {/* HTML Input Section */}
            <div className="w-full md:w-1/2 h-full">
              <label className="block mb-2 text-2xl md:text-3xl font-semibold text-gray-700">
                HTML Code
              </label>
              {/* Textarea where users can input their HTML code */}
              <textarea
                onChange={handleHTMLChange}  // Updates the state with user input
                value={htmlcode}  // Binds textarea value to the current state
                className="w-full h-96 md:h-[650px] p-4 text-lg md:text-2xl border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your HTML Code Here..."
              />
            </div>
      
            {/* Preview Section */}
            <div className="w-full md:w-1/2 h-full">
              <label className="block mb-2 text-2xl md:text-3xl font-semibold text-gray-700">
                Preview
              </label>
              {/* The container for displaying the live preview of the HTML code */}
              <div className="border-2 border-gray-300 rounded-lg h-96 md:h-[650px] overflow-hidden">
                <iframe
                  // The 'srcDoc' attribute allows us to dynamically set the HTML content in the iframe
                  srcDoc={htmlcode}
                  className="w-full h-full"  // Ensures the iframe takes up the full height and width
                  title="HTML Preview"  // Describes the iframe for accessibility purposes
                ></iframe>
              </div>
            </div>
            </div>
            <div className="mt-8 w-full text-center">
          <Link
            href="/"
            className="hover:underline text-lg sm:text-xl text-black"
          >
            Back to Home
          </Link>
        </div>
        </div>
      );
}

export default HTMLPreviewApp