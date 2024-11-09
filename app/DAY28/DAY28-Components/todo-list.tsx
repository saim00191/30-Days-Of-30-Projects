'use client'

import { useState, useEffect } from 'react'
import { FaPlus, FaTrash, FaEdit, FaCheck, FaUndo } from 'react-icons/fa'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const startEditing = (id: number) => {
    setEditingId(id)
    const todoToEdit = todos.find((todo) => todo.id === id)
    if (todoToEdit) {
      setInputValue(todoToEdit.text)
    }
  }

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: inputValue } : todo
        )
      )
      setEditingId(null)
      setInputValue('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-purple-600 to-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none  "
            placeholder="Add a new todo"
          />
          <button
            onClick={editingId !== null ? saveEdit : addTodo}
            className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-opacity-50"
          >
            {editingId !== null ? <FaCheck /> : <FaPlus />}
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                todo.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <span
                className={`flex-grow ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`p-1 rounded-full ${
                    todo.completed ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-green-400 hover:bg-green-500'
                  } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {todo.completed ? <FaUndo /> : <FaCheck />}
                </button>
                <button
                  onClick={() => startEditing(todo.id)}
                  className="p-1 rounded-full bg-blue-400 hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 rounded-full bg-red-400 hover:bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}