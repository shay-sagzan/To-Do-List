import { v4 as uuidV4 } from "uuid"

// Type declaration
type Task = {
    id: string,
    title: string
    completed: boolean
}

// Variables declaration
let counter: number = 0;
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const newForm = document.querySelector<HTMLFormElement>("#new-lines")
const text = document.querySelector(".counter-text") as HTMLSpanElement
let tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
    e.preventDefault()
    if(input?.value == "" || input?.value == null) return

// Variable to save new li item
const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false
    }
    tasks.push(newTask)
    addListItem(newTask)
    input.value = ""
})

  /**
   * @function addListItem
   * The function create a new section of HTML elements to create another list item
   * and save the task into array of tasks.
   * @param task - New To-Do with values of: id, title, completed 
   * @returns
   * Void.
   */
function addListItem(task: Task): void {
    const ul = document.getElementById("items") as HTMLUListElement
    const button = document.getElementById("button") as HTMLButtonElement
    const newData = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    const trashIcon = document.createElement("button")
    trashIcon.addEventListener("click", removeItem);

    label.id = "task-line"
    trashIcon.id = "trash-icon"
    newData.id = task.id;
    checkbox.id = "my-check"
    trashIcon.classList.add("delete")
    trashIcon.innerText = "Delete"
    counter++;

    checkbox.addEventListener("click", () => {
            task.completed == checkbox.checked;
            label.classList.add("completed");
            if(checkbox.checked === false){
                label.classList.remove("completed");
            }
    })

    saveTasks()
    checkbox.type = "checkbox"
    label.contentEditable = "true"
    ul.append(newData)
    newData.append(checkbox)
    newData.append(label)
    newData.append(trashIcon)
    label.innerText = task.title;
    newForm?.append(ul)

    // Event which delete all list items.
    button.addEventListener('click', () => {
        document.querySelector<HTMLUListElement>("ul")?.remove()
        tasks = [];
        saveTasks()
        text.innerText = `You don't have tasks to do`;
    })
}

/**
   * @function removeItem
   * The function create a new section of HTML elements to create another list item
   * and save the task into array of tasks.
   * @param task - New To-Do with values of: id, title, completed 
   * @returns
   * Void.
   */function removeItem(e): void {
    const deletedLi = e.target.parentNode.id
    e.target.parentNode.remove();
    for (let i = 0; i < tasks.length; i++){ 
        if ( tasks[i].id === deletedLi) { 
            tasks.splice(i, 1); 
        }
    }
    counter--;
    saveTasks() // Save new array with the remaining tasks
}

/**
   * @function saveTasks
   * The function save all the tasks which in the tasks array at the local storage,
   * and update the counter at the bottom of the To-Do-List.
   * @returns
   * Void.
   */function saveTasks(): void {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
    text.innerText = `You have ${counter} tasks to do`;
}

/**
   * @function loadTasks
   * The function load the tasks from the tasks array which is in the local storage.
   * @returns
   * The function returns a type of Task array.
   */function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    if(taskJSON == null) return []
    return JSON.parse(taskJSON)
}