/** @typedef {{ id: string, title: string, done: boolean }} Todo */

/** @type {Todo[]} */
let todos = [];

const composer = document.querySelector("#composer");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
const error = document.querySelector("#error");

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) {
    error.hidden = false;
    input.focus();
    return;
  }

  error.hidden = true;
  todos = [
    { id: crypto.randomUUID(), title, done: false },
    ...todos,
  ];
  input.value = "";
  input.focus();
  render();
});

list.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');
  if (!checkbox) return;

  const item = checkbox.closest(".item");
  const todo = todos.find((entry) => entry.id === item.dataset.id);
  if (!todo) return;

  todo.done = checkbox.checked;
  render();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete");
  if (!button) return;

  const item = button.closest(".item");
  todos = todos.filter((entry) => entry.id !== item.dataset.id);
  render();
});

function render() {
  if (todos.length === 0) {
    list.innerHTML = '<li class="empty">아직 할 일이 없습니다.</li>';
    return;
  }

  list.replaceChildren(
    ...todos.map((todo) => {
      const li = document.createElement("li");
      li.className = `item${todo.done ? " is-done" : ""}`;
      li.dataset.id = todo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.setAttribute("aria-label", `${todo.title} 완료`);

      const title = document.createElement("span");
      title.className = "title";
      title.textContent = todo.title;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete";
      remove.setAttribute("aria-label", `${todo.title} 삭제`);
      remove.textContent = "삭제";

      li.append(checkbox, title, remove);
      return li;
    })
  );
}

render();
