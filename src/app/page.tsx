'use client'

import { useState } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputText('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-yellow-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-yellow-200">
          <h1 className="text-3xl font-bold text-yellow-800 mb-8 text-center">
            Todo List
          </h1>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-yellow-50"
            />
            <button
              onClick={addTodo}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {totalCount > 0 && (
            <div className="mb-4 text-sm text-yellow-700">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}

          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-yellow-600">
                No todos yet. Add one above to get started!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    todo.completed
                      ? 'bg-yellow-100 border-yellow-200'
                      : 'bg-white border-yellow-300'
                  } transition-colors`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? 'bg-yellow-500 border-yellow-500 text-white'
                        : 'border-yellow-400 hover:border-yellow-500'
                    }`}
                  >
                    {todo.completed && <Check size={12} />}
                  </button>
                  
                  <span
                    className={`flex-1 transition-all ${
                      todo.completed
                        ? 'text-yellow-600 line-through'
                        : 'text-yellow-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-yellow-600 hover:text-yellow-800 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}