import { use, useState } from "react";
import Nav from "../components/nav";
import { PrismaClient } from "@prisma/client";
import DropdownItem from "../components/dropdownItem";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  try {
    const initialSubjects = await prisma.subjects.findMany({
      include: {
        _count: {
          select: { teachers: true, invijilation: true },
        },
      },
    });
    const initialTeachers = await prisma.teacher.findMany({
      include: {
        _count: {
          select: { subjects: true, invijilation: true },
        },
      },
    });
    // const invijilation = await prisma.invijilation.findMany({
    //   include: {
    //     _count: {
    //       select: { teacherId: true },
    //     },
    //   },
    // });

    return {
      props: { initialSubjects, initialTeachers },
    };
  } catch (err) {
    console.log(err);
  }

  try {
    return {};
  } catch (err) {
    console.log(err);
  }

  try {
    return {
      props: {},
    };
  } catch (err) {
    console.log(err);
  }
}

let userId = "";
let subjectId = "";

function Allocate({ initialTeachers, initialSubjects }) {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [teachers, setTeachers] = useState(initialTeachers);

  const [showTeacherDropdown, setTeacherShowDropdwon] = useState(true);
  const [showSelectedTeacher, setShowSelectedTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("noteacher");
  const [selectedTeachertId, setSelectedTeacherId] = useState("");

  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showSelectedSubject, setShowSelectedSubject] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  console.log("initialSubjects", initialSubjects);
  console.log("teachers", initialTeachers);

  async function updateTeacher() {
    const response = await fetch("/api/updateTeacher", {
      method: "PATCH",
      body: JSON.stringify({
        id: selectedTeachertId,
        subjectId: selectedSubjectId,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  const handleDropDown = (data) => {
    if (data == "teacher") {
      setShowSelectedTeacher(false);
      console.log("initial Teachers", initialTeachers);
      setTeacherShowDropdwon(!showTeacherDropdown);
    }

    if (data == "subject") {
      setShowSelectedSubject(false);
      console.log("initial Teachers", initialTeachers);
      setShowSubjectDropdown(!showSubjectDropdown);
    }
  };

  const handleSelectTeacher = (data, id) => {
    setTeacherShowDropdwon(false);
    setSelectedTeacher(data);
    setSelectedTeacherId(id);
    setShowSelectedTeacher(!showSelectedTeacher);
  };

  const handleSelectSubject = (data, id) => {
    console.log("form down props", id);
    setShowSubjectDropdown(false);
    setSelectedSubject(data);
    setSelectedSubjectId(id);
    setShowSelectedSubject(!showSelectedSubject);
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
        </div>
      </div>
      <button type="button" onClick={updateTeacher}>
        Add Teacher
      </button>
      <div className="row">
        <div>
          <button type="button" onClick={() => handleDropDown("teacher")}>
            Click To select to Select Teacher
          </button>
          {showTeacherDropdown ? (
            <div className="DropDownList">
              {initialTeachers.map((teacher) => (
                <DropdownItem
                  itemtype="teacher"
                  itemname={teacher.name}
                  handleSelect={handleSelectTeacher}
                  itemId={teacher.id}
                  form={""}
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
        <div>
          <button type="button" onClick={() => handleDropDown("subject")}>
            Click To select to Select Subject
          </button>
          {showSubjectDropdown ? (
            <div className="DropDownList">
              {initialSubjects.map((subject) => (
                <div className="column">
                  <DropdownItem
                    itemtype="subject"
                    itemname={subject.subjectName}
                    handleSelect={handleSelectSubject}
                    itemId={subject.id}
                    form={subject.form}
                  />
                  <label>form {subject.form}</label>
                </div>
              ))}
            </div>
          ) : null}
          {showSelectedSubject ? (
            <div className="row">
              <div className="column">
                <h4>{selectedSubject}</h4>
              </div>
              <div className="column">
                <label> </label>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Allocate;
