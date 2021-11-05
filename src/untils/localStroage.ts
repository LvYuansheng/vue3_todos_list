import { Todo } from "../types/todo";

export function saveTodo(todos: Todo[]) {
  localStorage.setItem("todos_key", JSON.stringify(todos))
}

export function readTodo(): Todo[] {
  return JSON.parse(localStorage.getItem("todos_key") || '[]')
}