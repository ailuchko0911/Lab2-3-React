const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let id = 100;
let todos = loadTodos();

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  let text = prompt('Enter todo');
  if (text) {
    let todo = { id: id++, text: text, checked: false };
    todos.push(todo);
    saveTodos();
    console.log('todos:', todos);
    render();
    updateCounter();
  }
}

function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  saveTodos();
  render();
  updateCounter();
}

function checkTodo(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    todo.checked = !todo.checked;
    saveTodos();
  }
  render();
  updateCounter();
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join("");
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodo(${todo.id})"/>
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

render();
updateCounter();
