/*let tasks = [
  { id: 1, description: "Buy groceries", completed: false },
  { id: 2, description: "Finish JS revision", completed: true },
  { id: 3, description: "Clean room", completed: false }
];*/
let taskarr = [];
let status = "incompleted";

let inputcontainer = document.getElementById("input-container");

inputcontainer.addEventListener("change", (e) => {
  let usertask = document.getElementById("user-input").value;
  console.log(usertask);
  toStoreTask(usertask);
  showTask(taskarr);
});

// store task in the localstorage
function toStoreTask(task) {
  taskarr = JSON.parse(localStorage.getItem("tasklist")) ?? taskarr;
  let taskobj = {
    id: Date.now(),
    description: task,
    status: status,
  };

  taskarr.push(taskobj);
  localStorage.setItem("tasklist", JSON.stringify(taskarr));
}

function showTask(taskarr) {
  let taskul = document.getElementById("taskul");
  taskul.innerHTML = "";

  taskarr.forEach((element) => {
    let checkboxinput = document.createElement("input");
    let span = document.createElement("span");
    checkboxinput.setAttribute("type", "checkbox");

    let li = document.createElement("li");
    li.setAttribute("id", `task li id${element.id}`);

    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");

    editbtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    deletebtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    span.textContent = element.description;

    console.log(element.description);

    li.appendChild(checkboxinput);
    li.appendChild(span);
    li.append(editbtn, deletebtn);
    taskul.appendChild(li);

    checkboxinput.addEventListener("change", (event) => {
      if (event.target.checked) {
        status = "completed";
        element.status = status;
        console.log(element.status);
        console.log(`check box checked at ${element.id}`);
      } else {
        status = "incompleted";
        element.status = status;
        console.log(`check box unchecked at ${element.id}`);
      }
    });
  });
}

let completedbtn = document.getElementById("Complete-btn");

completedbtn.addEventListener("click", (e) => {
  toFiltertask();
});
// to show completed task
function toFiltertask(taskarr) {
  let completedtask = taskarr.filter((element) => {
    return (element.status = "completed");
  });
  showTask(completedtask);
}
