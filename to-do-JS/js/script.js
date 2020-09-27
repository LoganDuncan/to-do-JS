// Add Task
const addTask = (e) => {
    const taskTitle = document.querySelector('#taskTitle').value
    const taskNotes = document.querySelector('#taskNotes').value

    if (!validate(taskTitle, taskNotes)) {
        return false
    }

    const task = {
        task: taskTitle,
        notes: taskNotes
    }

    if (localStorage.getItem("tasks") === null) {
        const tasks = []
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    // Clear form
    document.querySelector('#taskAdder').reset()
    document.querySelector('[data-title]').classList.remove('error')
    document.querySelector('[data-notes]').classList.remove('error')

    // Fetch tasks and prevent form submission
    fetchTasks()
    e.preventDefault()
}

// Function to complete task
const completeTask = (notes) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"))

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].notes == notes) {
            tasks.splice(i, 1)
        }
    }
    // Reset storage and re fetch array
    localStorage.setItem("tasks", JSON.stringify(tasks))
    fetchTasks()
}

// get and display tasks
const fetchTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const taskDisplay = document.querySelector('#taskDisplay')

    // Build display for tasks
    taskDisplay.innerHTML = ""
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i].task
        let notes = tasks[i].notes

        taskDisplay.innerHTML += "<div class=\"card\">" + "<h3>" + task + "</h3>" + "<p>" + notes + "</p>" + " <img onclick=\"completeTask('" + notes + '\')" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAxMWMyLjc2MS41NzUgNi4zMTIgMS42ODggOSAzLjQzOCAzLjE1Ny00LjIzIDguODI4LTguMTg3IDE1LTExLjQzOC01Ljg2MSA1Ljc3NS0xMC43MTEgMTIuMzI4LTE0IDE4LjkxNy0yLjY1MS0zLjc2Ni01LjU0Ny03LjI3MS0xMC0xMC45MTd6Ii8+PC9zdmc+\"> ' + "</div>"
        
    }
}

// Form Validation
const validate = (taskTitle, taskNotes) => {
    if (!taskTitle) {
        document.querySelector('[data-title]').classList.add('error')
        return false
    }
    if (!taskNotes) {
        document.querySelector('[data-notes]').classList.add('error')
        return false
    }
    return true
}

document.getElementById("taskAdder").addEventListener("submit", addTask)

fetchTasks()