const form = document.querySelector('#form')
const input = document.querySelector('#input')
const todUl = document.querySelector('.todoUL')
const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('.button')


let allTodo = getTodo()
updateTodo()


form.addEventListener('submit', function(e){
    e.preventDefault()
    addTodo()
})

function addTodo(){
    let todotext = input.value.trim()
   if(todotext !== ''){
        todobj ={
            text: todotext,
            complete: false
        }
        allTodo.push(todobj)
        saveTodo()
        updateTodo()
    }
    input.value = ''
}


function renderTodo(todolist){
    todUl.innerHTML = ''
    todolist.forEach((todo, todoindex) =>{
        let todoli = document.createElement('li')
        let todotext = ''
        if(todo){
            todotext = todo.text
        } 

        if(todo && todo.complete){
            todoli.classList.add('complete')
        }

        todoli.addEventListener('click', function(e){
            completeTodo(todo)
        })

        todoli.addEventListener('contextmenu', function(e){
            e.preventDefault()
            removeTodo(todoindex)
        })
        
        todoli.innerHTML = todotext
        todUl.appendChild(todoli)
    })

    
}

function updateTodo(){
    renderTodo(allTodo)
}

function searchToDo(){
    let searchText = searchInput.value.trim().toLowerCase();
    let filteredTodos = allTodo.filter(todo =>
        todo.text.toLowerCase().includes(searchText)
    );
    renderTodo(filteredTodos)
}


searchInput.addEventListener('input', searchToDo)
searchBtn.addEventListener('click', searchToDo)


function completeTodo(todo){
    todo.complete= !todo.complete
    saveTodo()
    updateTodo()
}

function removeTodo(index) {
    allTodo = allTodo.filter((_, i)=>i !== index)

    saveTodo()
    updateTodo()
}



function saveTodo(){
    localStorage.setItem('todos', JSON.stringify(allTodo))
}

function getTodo(){
    return JSON.parse(localStorage.getItem('todos')) || []
}

