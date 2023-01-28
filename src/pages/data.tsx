import React from "react";
import { useState } from "react";
import Nav from "../components/nav";
import { PrismaClient } from "@prisma/client";
import { Teacher } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const teachers = await prisma.teacher.findMany();
  return {
    props: {
      initialTeachers: teachers,
    },
  };
}
export type TeacherWithSubInvij = Teacher & {
  invijilationHours: "0";
  _count: { subjects: number; inijilation: number };
};

interface teacherProp {
  teachers: TeacherWithSubInvij;
}

const Data = (props: teacherProp) => {
  async function saveTeacher(teacher) {
    const response = await fetch("/api/addTeacher", {
      method: "POST",
      body: JSON.stringify({
        ...teacher,
        invijilationHours: "0",
        subjects: {},
        invijilation: {},
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();

    // await prisma.teacher.create({
    //     data:{
    //      name: teacherData.name,
    //      invijilationHours: '0',
    //      subjects: {},
    //      invijilation:{}

    //     }
    // });
  }

  const handleSubmitTeacher = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
    let teacherData = Object.fromEntries(data.entries());

    console.log(teacherData);
    saveTeacher(teacherData);
  };

  const handleSubmitSubject = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
    let subjectData = Object.fromEntries(data.entries());
  };
  return (
    <div className="container">
      <div className="row">
        {" "}
        <Nav />
        <div className="row">
          <div className="column">
            <form onSubmit={handleSubmitTeacher}>
              <input
                name="name"
                type="text"
                placeholder="Enter Teacher's Name..."
              />
              {/* <input
                name="subject"
                type="text"
                placeholder="Enter subject name..."
              /> */}
              <button>Save</button>
            </form>
          </div>
        </div>
        <div className="row" style={{ marginTop: "200px" }}>
          <form onSubmit={handleSubmitSubject}>
            <input
              name="name"
              type="text"
              placeholder="Enter Subject Name..."
            />
            <input
              name="subject"
              type="text"
              placeholder="Enter Subject form..."
            />
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Data;
