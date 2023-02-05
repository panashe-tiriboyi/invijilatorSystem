import { useState, useEffect } from "react";
import DropdownItem from "../components/dropdownItem";
import Nav from "../components/nav";
import { PrismaClient } from "@prisma/client";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  try {
    const initialSubjects = await prisma.subjects.findMany({
      select: {
        id: true,
        subjectName: true,
        form: true,
        teachers: { select: { id: true } },
        invijilation: { select: { id: true } },
      },
    });
    const initialTeachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        invijilationMinutes: true,
        subjects: { select: { id: true } },
        invijilation: { select: { id: true } },
      },
    });
    const invijilation = await prisma.invijilation.findMany({
      select: {
        id: true,
        teacherId: true,
        Subjects: true,
        time: true,
        date: true,
        paper: true,
        minutes: true,
      },
    });

    return {
      props: {
        initialSubjects,
        initialTeachers,
        invijilation: JSON.parse(JSON.stringify(invijilation)),
      },
    };
  } catch (err) {
    console.log(err);
  }
}

let date = new Date();
async function updateInvijilation(teacherId, subjectId, p, m) {
  const response = await fetch("/api/addInvijilation", {
    method: "POST",
    body: JSON.stringify({
      teacherId: { connect: { id: teacherId } },
      Subjects: { connect: { id: subjectId } },
      time: "AM",
      date: new Date(
        date.getFullYear() +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2) +
          "T00:00:00.000Z"
      ),
      paper: p,
      minutes: m,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

async function updateTeacherMinutes(teacherId, minutes) {
  console.log("minutes passed in PACTH request", minutes);
  const response = await fetch("/api/updateTeacherMinutes", {
    method: "PATCH",
    body: JSON.stringify({
      id: teacherId,
      invijilationMinutes: minutes,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

function App({ initialSubjects, initialTeachers, invijilation }) {
  const [selectedSubject, setSelectedSubject] = useState(true);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState(false);
  const [showSelectedSubject, setShowSelectedSubject] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [invijilationTime, setInvijilationTime] = useState(["AM", "PM"]);
  const [showSelectedTime, setSelectedTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [paper, setPaper] = useState("");
  const [minutes, setMinutes] = useState("");

  let time = "AM";

  // console.log("invijilation records", invijilation);

  const handleSelectSubject = (data, id) => {
    console.log("form down props", id);
    setShowSubjectDropdown(false);
    setSelectedSubject(data);
    setSelectedSubjectId(id);
    setShowSelectedSubject(!showSelectedSubject);
  };

  const sorting = async () => {
    let Array = [...initialTeachers];
    let secondArray = [...initialTeachers];
    for (let i = 1; i < Array.length; i++) {
      console.log(i);

      for (let j = 0; j < Array.length - 1; j++) {
        if (
          parseInt(Array[j].invijilationMinutes) >
          parseInt(Array[j + 1].invijilationMinutes)
        ) {
          const a = Array[j];
          const b = Array[j + 1];
          secondArray[j] = b;
          secondArray[j + 1] = a;
          Array = [...secondArray];

          console.log("sorted", secondArray);
          setTeachers(Array);
          console.log("state teachers", teachers);
        }
      }
    }

    handleInvijilation(secondArray);
  };

  const handleInvijilation = (teacherArr) => {
    //loop through sorted array
    loop1: for (let i = 0; i < teacherArr.length; i++) {
      console.log("iteration ", i);
      // console.log(teacherArr[i].subjects);
      // console.log("selectedSubjectId", selectedSubjectId);

      let arr = [];
      let invijilationRecordArray = [];

      //loop trhough subjects of teacher at i to check if the teacher doesn't teach the seclected subject
      loop2: for (let j = 0; j < teacherArr[i].subjects.length; j++) {
        console.log("handleInvijilation", teacherArr[i].subjects[j].id);
        arr.push(teacherArr[i].subjects[j].id);
        // console.log(arr);
      }

      //if teacher teaches the selected subject move to next teacher
      if (arr.includes(selectedSubjectId)) {
        continue;
      } else {
        console.log(`teacher without selected subjctet ${teacherArr[i].name}`);

        //loop through invijilation records to filter all records which do not belong to selected teacher
        for (let k = 0; k < invijilation.length; k++) {
          let arr2 = [];

          //to add teacher id to an array so to check if the selected teacher id exist in a certain record
          for (let j = 0; j < invijilation[k].teacherId.length; j++) {
            arr2.push(invijilation[k].teacherId[j].id);
            console.log("arr2", arr2);
          }
          if (arr2.includes(teacherArr[i].id)) {
            console.log("Record with selected teacher", invijilation[k]);
            invijilationRecordArray.push(invijilation[k]);
          } else {
            continue;
          }
        }
        console.log("records", invijilationRecordArray);

        //invijilation records of selected teacher

        let timeArr = [];
        let dateArr = [];
        for (let j = 0; j < invijilationRecordArray.length; j++) {
          timeArr.push(invijilationRecordArray[j].time);
          dateArr.push(invijilationRecordArray[j].date);
        }

        // date = JSON.stringify(startDate);
        date.setHours(0, 0, 0, 0);
        console.log("startDate before check", date);
        console.log(typeof date);
        console.log(dateArr);
        let dateString =
          date.getFullYear() +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2) +
          "T00:00:00.000Z";

        if (timeArr.includes(time) && dateArr.includes(dateString)) {
          console.log(
            `found record with of ${teacherArr[i].name} with ${time} and != ${dateString}`
          );
        } else {
          console.log(
            `found no record with ${teacherArr[i].name} with ${time} and != ${dateString} so update and break`
          );

          updateInvijilation(
            teacherArr[i].id,
            selectedSubjectId,
            paper,
            minutes
          );

          let num = parseInt(minutes);

          console.log("NaN value? ", initialTeachers[i].invijilationMinutes);

          let numString = num.toString();
          console.log("New teacher hours", numString);

          updateTeacherMinutes(teacherArr[i].id, numString);

          break;
        }
      }
    }
  };
  const handleSelectTime = (d) => {};

  const formatDateFn = (d) => {
    setStartDate(d);
    const selectedDate = new Date(d);
    selectedDate.setHours(0, 0, 0, 0);
    console.log("before formating", selectedDate);
    // console.log(
    //   selectedDate.getFullYear() +
    //     "-" +
    //     ("0" + (selectedDate.getMonth() + 1)).slice(-2) +
    //     "-" +
    //     ("0" + selectedDate.getDate()).slice(-2)
    // );
    date = selectedDate;

    console.log(typeof date);
    console.log(typeof selectedDate);

    return selectedDate;
  };

  useEffect(() => console.log(paper));
  useEffect(() => console.log(minutes));

  const handleChange = (event) => {
    if (event.target.name == "paper") {
      setPaper(event.target.value);
    } else if (event.target.name == "minutes") {
      setMinutes(event.target.value);
    } else {
      console.log("invalid event");
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <Nav />

      <p>Click on the Tauri, Next, and React logos to learn more.</p>

      <div className="row">
        <div>
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
              <div>
                {invijilationTime.map((time, index) => (
                  <div className="column">
                    <DropdownItem
                      itemtype="subject"
                      itemname={time}
                      handleSelect={handleSelectTime}
                      itemId={index}
                      form={""}
                    />
                    <label> {""}</label>
                  </div>
                ))}
              </div>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(d) => formatDateFn(d)}
                />
              </div>
              <div>
                <input type="text" name="paper" onChange={handleChange} />
                <input type="text" name="minutes" onChange={handleChange} />
              </div>
            </div>
          ) : null}
          <button type="button" onClick={() => sorting()}>
            Sort
          </button>
          {/* <button type="button" onClick={updateInvijilation}>
            Update
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
