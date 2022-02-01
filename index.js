/* == Class == */
class Todo {
  constructor(name) {
    this._id = createUUID();
    this._name = name;
    this._status = taskStatus[0];
  }

  get name() {
    return this._name.toUpperCase();
  }

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  changeStatus() {
    let oldStatus = this._status;
    let newStatus = oldStatus === taskStatus[0] ? taskStatus[1] : taskStatus[0];

    this._status = newStatus;
  }

  toString = () => {
    return `${this.id}\n${this.name}\n${this.status} `;
  };
}

class ManageTodo {
  constructor() {
    this._todoMap = new Map();
  }

  addTask(task) {
    this._todoMap.set(task.id, task);
  }

  removeTask(uuid) {
    this._todoMap.delete(uuid);
  }

  changeTaskStatus(uuid) {
    let task = this._todoMap.get(uuid);
    task.changeStatus();
  }

  getAllTasks() {
    return this._todoMap;
  }

  viewAllTasksConsole() {
    this._todoMap.forEach((value, key) => {
      console.log(value.toString());
    });
  }
}
/* == Class == */

/* == Variable == */
const taskStatus = {
  0: "Init",
  1: "Complete"
};
/* == Variable == */

/* == Method == */
const createUUID = () => {
  let dt = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

const appendNewTaskHTML = (task) => {
  let taskItem = document.createElement("div");
  let taskItemUuid = document.createAttribute("uuid");

  let taskWrapper = document.createElement("div");
  let faCheck = document.createElement("i");
  let taskName = document.createElement("span");
  let removeBtn = document.createElement("button");
  let faCircle = document.createElement("i");

  taskItem.className = "todo__details__task";
  faCheck.className = "fas fa-check";
  taskName.className = "todo__details__task__name";
  faCircle.className = "far fa-times-circle";

  taskName.appendChild(document.createTextNode(task.name));

  removeBtn.appendChild(faCircle);
  removeBtn.setAttribute("onclick", "removeTask(this)");

  taskItemUuid.value = task.id;

  taskWrapper.setAttribute("onclick", "completeTask(this)");
  taskWrapper.appendChild(faCheck);
  taskWrapper.appendChild(taskName);


  taskItem.setAttributeNode(taskItemUuid);
  taskItem.appendChild(taskWrapper);
  taskItem.appendChild(removeBtn);

  todoDetails.appendChild(taskItem);
};

const initTempTask = (size) => {
  for (let index = 0; index < size; index++) {
    let task = new Todo(`Task ${index + 1}`);
    manageTask.addTask(task);
  }

  manageTask.getAllTasks().forEach((value, key) => {
    appendNewTaskHTML(value);
  });
};

const completeTask = (e) => {
  let oldclassName = e.parentElement.className;

  let newClassName = oldclassName.includes("complete")
    ? oldclassName.replace(" complete", "")
    : oldclassName.concat(" complete");

  e.parentElement.className = newClassName;
  manageTask.changeTaskStatus(e.parentElement.getAttribute("uuid"));

  manageTask.viewAllTasksConsole();
};

const removeTask = (e) => {
  let uuid = e.parentElement.getAttribute("uuid");
  manageTask.removeTask(uuid);
  e.parentElement.remove();
};
/* == Method == */

/* == DOM Element == */
const taskAddBtn = document.querySelector(".todo__control button");
const taskTextInput = document.querySelector(".todo__control input");
const todoDetails = document.querySelector(".todo__details");
/* == DOM Element == */

/* == DOM Events == */
taskAddBtn.onclick = () => {
  let newTaskName = taskTextInput.value;
  if(newTaskName === "") return;
  let newTask = new Todo(newTaskName);
  manageTask.addTask(newTask);
  appendNewTaskHTML(newTask);

  taskTextInput.value = "";
};

taskTextInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    taskAddBtn.click();
  }
});
/* == DOM Events == */

const manageTask = new ManageTodo();
initTempTask(5);
