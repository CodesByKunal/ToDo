let mytaskdatalocal = JSON.parse(localStorage.getItem("taskobject"));
let tasksdata = [];
const allBtn = document.getElementById("all");
const pendingBtn = document.getElementById("pending");
const completedBtn = document.getElementById("completed");
let taskBox = document.getElementById("task-box");
let taskinputBox = document.getElementById("task-input-box");
const addtaskBtn = document.getElementById("add-task-btn");
let cmpltTrigger = document.querySelectorAll(".cmplt-trigger");
let count = 0;
let time = document.getElementById("time");
let date = document.getElementById("date");
let Day = document.getElementById("Day");
let removeBtn = document.getElementById("remove-btn");
let btn = document.querySelectorAll(".remove");
removeBtn.addEventListener("click", function () {
  tasksdata = [];
  localStorage.clear();
  render();
});

function timenow() {
  let date = new Date();
  time.innerText =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  setTimeout(timenow, 1000);
}
timenow();

function datenow() {
  let datenow = new Date();
  date.innerText =
    datenow.getDate() + "-" + datenow.getMonth() + "-" + datenow.getFullYear();
}
datenow();

function daynow1() {
  let daynow = new Date();
  crntDay = daynow.getDay();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  Day.innerText = weekdays[crntDay];
}
daynow1();

function render() {
  taskBox.innerHTML = "";
  tasksdata.map((x, y) => {
    if (x.completed == true) {
      taskBox.innerHTML += `<div class="tasks-in-box">
              <button class="cmplt-trigger temp-class2" id="${y}"></button>
              <span id="${y}"><s>${x.task}</s></span>
              <i class="fa fa-trash remove" id="${y}0"aria-hidden="true"></i></div>`;
    } else {
      taskBox.innerHTML += `<div class="tasks-in-box">
      <button class="cmplt-trigger" id="${y}"></button>
      <span id="s${y}">${x.task}</span>
      <i class="fa fa-trash remove" id="${y}0"aria-hidden="true"></i></div>`;
    }
  });
  count = 3;
  bugfix();
  bugfix2();
}
if (mytaskdatalocal) {
  tasksdata = mytaskdatalocal;
  render();
}

addtaskBtn.addEventListener("click", function () {
  if (taskinputBox.value) {
    tasksdata.push({
      task: taskinputBox.value,
      pending: true,
      completed: false,
    });
    localStorage.setItem("taskobject", JSON.stringify(tasksdata));
    taskinputBox.value = "";
    allBtn.classList.add("temp-class");
    pendingBtn.classList.remove("temp-class");
    completedBtn.classList.remove("temp-class");
    render();
  }
});

allBtn.addEventListener("click", function () {
  allBtn.classList.add("temp-class");
  pendingBtn.classList.remove("temp-class");
  completedBtn.classList.remove("temp-class");
  render();
});

function pndng() {
  taskBox.innerHTML = "";
  tasksdata.map((x, y) => {
    if (tasksdata[y].pending === true) {
      taskBox.innerHTML += `<div class="tasks-in-box">
      <button class="cmplt-trigger" id="${y}"></button>
      <span id="s${y}">${x.task}</span>
      <i class="fa fa-trash remove" id="${y}0"aria-hidden="true"></i></div>`;
    }
  });
  count = 0;
  bugfix();
  bugfix2();
}
pendingBtn.addEventListener("click", function () {
  allBtn.classList.remove("temp-class");
  pendingBtn.classList.add("temp-class");
  completedBtn.classList.remove("temp-class");
  pndng();
});

function cmplt() {
  taskBox.innerHTML = "";
  tasksdata.map((x, y) => {
    if (x.completed == true) {
      taskBox.innerHTML += `<div class="tasks-in-box">
            <button class="cmplt-trigger temp-class2" id="${y}"></button>
            <span id="s${y}"><s>${x.task}</s></span>
            <i class="fa fa-trash remove" id="${y}0"aria-hidden="true"></i></div>`;
    }
  });
  count = -1;
  bugfix();
  bugfix2();
}
completedBtn.addEventListener("click", function () {
  allBtn.classList.remove("temp-class");
  pendingBtn.classList.remove("temp-class");
  completedBtn.classList.add("temp-class");
  count = -1;
  cmplt();
});

function bugfix() {
  cmpltTrigger = document.querySelectorAll(".cmplt-trigger");
  cmpltTrigger.forEach((element) => {
    element.addEventListener("click", function (event) {
      let id1 = event.target.id;
      console.log(id1);
      if (tasksdata[id1].completed === true) {
        tasksdata[id1].completed = false;
        tasksdata[id1].pending = true;
        localStorage.setItem("taskobject", JSON.stringify(tasksdata));
      } else {
        tasksdata[id1].completed = true;
        tasksdata[id1].pending = false;
        localStorage.setItem("taskobject", JSON.stringify(tasksdata));
      }
      if (count === 0) {
        pndng();
      } else if (count === -1) {
        cmplt();
      } else {
        render();
      }
    });
  });
}

function bugfix2() {
  btn = document.querySelectorAll(".remove"); // log the elements returned by querySelectorAll
  btn.forEach((element) => {
    element.addEventListener("click", function (event) {
      let idd = event.target.id;
      let index = idd / 10;
      tasksdata.splice(index, 1);
      localStorage.setItem("taskobject", JSON.stringify(tasksdata));
      if (count === 0) {
        pndng();
      } else if (count === -1) {
        cmplt();
      } else {
        render();
      }
    });
  });
}
