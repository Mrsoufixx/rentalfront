import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./styles/footer.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom/dist";

function Footer() {
  return (
    <footer className="px-4 divide-y  ">
      <div className="container flex items-center py-10 mx-auto space-y-8 lg:flex-row lg:items-center lg:space-y-0">
        <div className="ml-[10%] w-2/3 grid grid-cols-1 text-sm gap-x-4 gap-y-8 sm:10/12 sm:grid-cols-3 ">
          <div className="space-y-3 w-full">
            <h3 className="tracking-wide uppercase text-xl ">Produit</h3>
            <ul className="space-y-1 text-[10px] leading-8">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Voitures
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Motos
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Vélos
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-xl">Societé</h3>
            <ul className="space-y-1 text-[10px] leading-8 ">
              <li className="">
                <a rel=" flex " href="#">
                  <FaEnvelope /> mobiloc@yahoo.com
                </a>
              </li>
              <li>
                <a rel=" flex" href="#">
                  <FaMapMarkerAlt /> Kenitra, Maroc
                </a>
              </li>
              <li>
                <a rel=" flex" href="#">
                  <FaPhone /> +212 602 880383
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase text-xl">Developpeur</h3>
            <ul className="space-y-1 text-[10px] leading-8">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Equipes
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Guides
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/3 space-y-3 flex flex-col items-center  sm:2/12 gap-4 justify-center -translate-y-32 sm:translate-y-32 md:-translate-y-16 lg:-translate-y-6">
          <Link
            to="/"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-28 h-12  rounded-full ">
              <img src={logo} alt="" className="w-40" />
            </div>
            <span className="self-center text-3xl text-slate-800 font-bold">MobiLoc</span>
          </Link>
          <div className="flex justify-start space-x-3">
            <a
              rel="noopener noreferrer"
              href="#"
              title="Facebook"
              className="flex items-center p-1"
            >
              <FaFacebookF size={20} className="icon"/>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="Twitter"
              className="flex items-center p-1"
            >
              <FaTwitter size={20} className="icon"/>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="Instagram"
              className="flex items-center p-1"
            >
              <FaInstagram size={20} className="icon"/>
            </a>
          </div>
        </div>
      </div>
      <div className="py-6 text-md text-center ">
        CopyRights © 2023 Mobiloc. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
