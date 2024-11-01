export type Question = {
    id: number
    question: string
    options: string[]
    correctAnswer: number
  }
  
  export const itQuestions: Question[] = [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Managing Language"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<h>"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "In CSS, what does the 'font-size' property control?",
        options: ["The font color", "The font style", "The font height", "The font size"],
        correctAnswer: 3
      },
      {
        id: 4,
        question: "Which HTML element is used to define the title of a document?",
        options: ["<title>", "<head>", "<meta>", "<body>"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "What is the correct syntax for an external JavaScript file?",
        options: ["<script href='myfile.js'>", "<script src='myfile.js'>", "<script file='myfile.js'>", "<script link='myfile.js'>"],
        correctAnswer: 1
      },
      {
        id: 6,
        question: "Which method is used to select elements by class name in JavaScript?",
        options: ["getElementById", "querySelector", "getElementsByClassName", "querySelectorAll"],
        correctAnswer: 2
      },
      {
        id: 7,
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 1
      },
      {
        id: 8,
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "bgcolor", "background", "background-color"],
        correctAnswer: 3
      },
      {
        id: 9,
        question: "What does the HTML <p> element represent?",
        options: ["Paragraph", "Picture", "Panel", "Preformatted text"],
        correctAnswer: 0
      },
      {
        id: 10,
        question: "Which CSS property is used to change text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        correctAnswer: 2
      },
      {
        id: 11,
        question: "What does the 'position' property in CSS control?",
        options: ["Text alignment", "Element position", "Background position", "None of the above"],
        correctAnswer: 1
      },
      {
        id: 12,
        question: "Which of the following is NOT a semantic HTML tag?",
        options: ["<footer>", "<div>", "<article>", "<section>"],
        correctAnswer: 1
      },
      {
        id: 13,
        question: "Which HTML attribute specifies an alternate text for an image?",
        options: ["src", "title", "alt", "href"],
        correctAnswer: 2
      },
      {
        id: 14,
        question: "Which is the correct JavaScript syntax to change the content of an HTML element?",
        options: ["document.getElement('id').innerHTML", "document.getElementById('id').innerHTML", "document.getId('id').innerHTML", "document.innerHTML('id')"],
        correctAnswer: 1
      },
      {
        id: 15,
        question: "What is the default value of the position property in CSS?",
        options: ["absolute", "relative", "static", "fixed"],
        correctAnswer: 2
      },
      {
        id: 16,
        question: "Which HTML element is used to create a dropdown list?",
        options: ["<input>", "<select>", "<dropdown>", "<datalist>"],
        correctAnswer: 1
      },
      {
        id: 17,
        question: "Which JavaScript method is used to write on the browser console?",
        options: ["log.console()", "console()", "console.log()", "log()"],
        correctAnswer: 2
      },
      {
        id: 18,
        question: "Which CSS property is used to add spacing between letters?",
        options: ["letter-spacing", "spacing", "line-spacing", "text-spacing"],
        correctAnswer: 0
      },
      {
        id: 19,
        question: "In JavaScript, which symbol is used to comment a single line?",
        options: ["//", "/* */", "#", "<! >"],
        correctAnswer: 0
      },
      {
        id: 20,
        question: "Which CSS property is used to control the space between elements?",
        options: ["padding", "margin", "border", "spacing"],
        correctAnswer: 1
      },
      {
        id: 21,
        question: "Which of the following is a JavaScript framework?",
        options: ["Bootstrap", "React", "CSS", "HTML"],
        correctAnswer: 1
      },
      {
        id: 22,
        question: "In HTML, what does the <ul> tag create?",
        options: ["An ordered list", "An unordered list", "A table", "A hyperlink"],
        correctAnswer: 1
      },
      {
        id: 23,
        question: "What is the correct syntax for adding a background image in CSS?",
        options: ["background-image: url('image.jpg');", "background: image('image.jpg');", "img-background: url('image.jpg');", "bg-image: url('image.jpg');"],
        correctAnswer: 0
      },
      {
        id: 24,
        question: "Which attribute is used to specify the URL in an anchor tag?",
        options: ["href", "link", "src", "url"],
        correctAnswer: 0
      },
      {
        id: 25,
        question: "Which of the following is NOT a CSS layout model?",
        options: ["Flexbox", "Grid", "Box", "Carousel"],
        correctAnswer: 3
      },
      {
        id: 26,
        question: "What does 'DOM' stand for in web development?",
        options: ["Document Object Model", "Data Object Model", "Digital Object Management", "Document Orientation Model"],
        correctAnswer: 0
      },
      {
        id: 27,
        question: "Which CSS property is used to set the width of an element?",
        options: ["padding", "width", "margin", "height"],
        correctAnswer: 1
      },
      {
        id: 28,
        question: "In JavaScript, which of the following is a looping structure?",
        options: ["if", "for", "case", "break"],
        correctAnswer: 1
      },
      {
        id: 29,
        question: "What does AJAX stand for?",
        options: ["Asynchronous JavaScript And XML", "Application JavaScript And XML", "Advanced JavaScript And XHTML", "None of the above"],
        correctAnswer: 0
      },
      {
        id: 30,
        question: "Which of the following is used to parse JSON data in JavaScript?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.format()", "JSON.decode()"],
        correctAnswer: 0
      },
      {
        id: 31,
        question: "Which method is used to add new elements to an array in JavaScript?",
        options: ["add()", "push()", "insert()", "append()"],
        correctAnswer: 1
      },
      {
        id: 32,
        question: "Which CSS property is used to make text bold?",
        options: ["text-weight", "font-bold", "font-weight", "text-style"],
        correctAnswer: 2
      },
      {
        id: 33,
        question: "Which HTML tag is used to create a line break?",
        options: ["<lb>", "<break>", "<br>", "<ln>"],
        correctAnswer: 2
      },
      {
        id: 34,
        question: "Which of the following is NOT a valid HTML5 semantic tag?",
        options: ["<header>", "<footer>", "<aside>", "<title>"],
        correctAnswer: 3
      },
      {
        id: 35,
        question: "What is the default display value of a <div> element in CSS?",
        options: ["inline", "inline-block", "block", "flex"],
        correctAnswer: 2
      },
      {
        id: 36,
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "css", "font", "design"],
        correctAnswer: 0
      },
      {
        id: 37,
        question: "Which protocol is used to communicate securely over the internet?",
        options: ["HTTP", "FTP", "SMTP", "HTTPS"],
        correctAnswer: 3
      },
      {
        id: 38,
        question: "What is the main purpose of the <canvas> element in HTML5?",
        options: ["To display images", "To draw graphics", "To play audio", "To play video"],
        correctAnswer: 1
      },
      {
        id: 39,
        question: "Which CSS property controls the font style?",
        options: ["font-family", "font-weight", "font-style", "text-transform"],
        correctAnswer: 2
      },
      {
        id: 40,
        question: "Which JavaScript keyword is used to declare a constant variable?",
        options: ["let", "var", "const", "constant"],
        correctAnswer: 2
      }
  ]
  