import { FaFacebookF } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
export default function Footer() {
  return (
    <div>
      <footer className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl font-bold">30-Days-Of-Projects</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            Developed By <span className="font-bold">Saim Amjad</span>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/saim.amjad.14"
              className="text-gray-500 text-2xl cursor-pointer hover:text-gray-900"
              target="_blank"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://github.com/saim00191"
              className="ml-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-900"
              target="_blank"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/amjad_saim_9/"
              className="ml-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-900"
              target="_blank"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/saim-raza-b7a7172b6/"
              className="ml-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-900"
              target="_blank"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:saimamjad198@gmail.com"
              className="ml-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-900"
            >
              <FaEnvelope />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
