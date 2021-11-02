
const inputBox = document.querySelector(".addTask input"),
addBtn = document.querySelector(".addTask button"),
todoList = document.querySelector(".todoList"),
clearBtn = document.getElementById("clearBtn");

showTasks();

addBtn.addEventListener("click", () => {
    let userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() != 0) { // only if the entered task is not just whitespaces, it will be addes
        let getLocalStorageData = localStorage.getItem("New Todo");

        if (getLocalStorageData == null) {
            listArray = [];
        } else {
            listArray = JSON.parse(getLocalStorageData);
        }

        listArray.push(userEnteredValue); // push the entered task to listArray
        localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string and updating it by adding the new task
        showTasks(); //calling showTask function
    }
})

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorageData); 
    }

    let pendingCount = document.getElementById("pendingTasks"); // the number of tasks shown at the footer
    pendingCount.textContent = listArray.length;

    let todos = "";
    listArray.forEach((element, index) => {
        todos += `<li><span>${element}</span> <button><i class="fas fa-trash-alt" id="delBtn" onclick="deleteTask(${index})"></i></button></li>`;
    });
    todoList.innerHTML = todos; // adding the new li's in the ul
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

clearBtn.addEventListener("click", ()=> { // deleting all the tasks
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
})