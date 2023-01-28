import { useState } from "react";
//import { invoke } from "@tauri-apps/api/tauri";
import Nav from "../components/nav";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";
import { PrismaClient } from "@prisma/client";
import DropdownItem from "../components/dropdownItem";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  try {
    const initialTeachers = await prisma.teacher.findMany({
      include: {
        _count: {
          select: { subjects: true, invijilation: true },
        },
      },
    });

    return {
      props: { initialTeachers },
    };
  } catch (err) {
    console.log(err);
  }
}

function App({ initialTeachers }) {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showDropdown, setShowDropdwon] = useState(true);
  const [showSelectedTeacher, setShowSelectedTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("noteacher");

  const handleDropDown = () => {
    setShowSelectedTeacher(false);
    console.log("initial Teachers", initialTeachers);
    setShowDropdwon(!showDropdown);
  };

  const handleSelect = (data) => {
    setShowDropdwon(false);
    setSelectedTeacher(data);
    setShowSelectedTeacher(!showSelectedTeacher);
  };

  const sorting = () => {
    let Array = [...teachers];
    let secondArray = [...teachers];
    for (let i = 1; i < Array.length; i++) {
      console.log(i);

      for (let j = 0; j < Array.length - 1; j++) {
        if (
          parseInt(Array[j].invijilationHours) >
          parseInt(Array[j + 1].invijilationHours)
        ) {
          const a = Array[j];
          const b = Array[j + 1];
          secondArray[j] = b;
          secondArray[j + 1] = a;
          Array = [...secondArray];

          console.log("sorted", secondArray);
          setTeachers(Array);
        }
      }
    }
  };

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <div className="container">
      <div className="row">
        {" "}
        <Nav />
        <div className="column">
          <h1>Welcome to Invijilator System</h1>

          <button type="button" onClick={sorting}>
            Generate Report
          </button>
        </div>
      </div>

      <div className="row">
        <div>
          <button type="button" onClick={handleDropDown}>
            Click To select to Select Teacher
          </button>
          {showDropdown ? (
            <div className="DropDownList">
              {initialTeachers.map((teacher) => (
                <DropdownItem
                  itemname={teacher.name}
                  handleSelect={handleSelect}
                />
              ))}
            </div>
          ) : null}
          {showSelectedTeacher ? (
            <div>
              <h4>{selectedTeacher}</h4>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
