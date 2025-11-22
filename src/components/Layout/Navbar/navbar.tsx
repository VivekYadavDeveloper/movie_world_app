/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import SearchBox from "@/components/Searchbox/searchbox";

import Link from "next/link";
import { useState } from "react";

const NavbarComponent = () => {
  /* Create A State To Handle Response */
  const [currentPath, setCurrentPath] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /* Now Create A Funtion To Handle On Click */

  const handleLinkClick = (url: string) => {
    setCurrentPath(url);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* This is first container which show when use go to mobile display or tablate */}
      <div className="navbar bg-sky-300 sm:hidden block ">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Movie World
        </Link>
      </div>
      {/* This is second container which is show when use on laptop or desktop */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="" href={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/movies"}>Explore</Link>
              </li>
              <li>
                <Link href={"/tv_show"}>Tv Show</Link>
                {/* TODO: <ThemeToggleButton /> */}
              </li>
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost text-xl sm:block hidden">
            Movies World
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="" href={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/movies"}>Explore</Link>
            </li>
            <li>
              <Link href={"/tv_show"}>Tv Show</Link>
            </li>
          </ul>
        </div>
        {/* TODO: <ThemeToggleButton /> */}
        <SearchBox />
      </div>
    </>
  );
};

export default NavbarComponent;
