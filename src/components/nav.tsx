import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="column menu">
      <ul>
        <li>
          <Link href="/">Home </Link>
        </li>
        <li>
          <Link href="/data">Add Teacher</Link>
        </li>
        <li>
          <Link href="/allocate">Allocate Subjects</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
