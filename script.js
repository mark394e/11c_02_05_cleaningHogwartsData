"use strict";

document.addEventListener("DOMContentLoaded", init);

const studentArray = [];

const JSONArray = "https://petlatkea.dk/2021/hogwarts/students.json";

const Student = {
  firstname: "",
  lastname: "",
  middelname: "",
  nickname: "",
  gender: "",
  image: ".jpg",
  house: "",
};

async function init() {
  console.log("ready");

  loadData();
}

async function loadData() {
  const response = await fetch(JSONArray);
  const studentList = await response.json();
  console.table(studentList);
  prepareData(studentList);
}

function prepareData(studentList) {
  studentList.forEach((elm) => {
    const student = Object.create(Student);

    let fullName = elm.fullname.trim();
    let house = elm.house.trim();
    let gender = elm.gender.trim();

    student.firstname = fullName.substring(0, 1).toUpperCase() + fullName.substring(1, fullName.indexOf(" ")).toLowerCase();
    student.lastname = fullName.substring(fullName.lastIndexOf(" ") + 1, fullName.lastIndexOf(" ") + 2).toUpperCase() + fullName.substring(fullName.lastIndexOf(" ") + 2).toLowerCase();
    student.middelname = fullName.substring(fullName.indexOf(" "), fullName.lastIndexOf(" ")).trim().substring(0, 1).toUpperCase() + fullName.substring(fullName.indexOf(" "), fullName.lastIndexOf(" ")).trim().substring(1).toLowerCase();

    if (fullName.includes(`"`)) {
      student.nickname = fullName.substring(fullName.indexOf(`"`) + 1, fullName.indexOf(`"`) + 2).toUpperCase() + fullName.substring(fullName.indexOf(`"`) + 2, fullName.lastIndexOf(`"`)).toLowerCase();
      student.middelname = "";
    }

    console.log(student.nickname);
  });
}
