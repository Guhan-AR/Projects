import { useState, useEffect } from 'react';
import { Trash2, PlusCircle, CheckCircle, Circle } from 'lucide-react';

const API_URL = 'http://localhost:3001/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState(null);

    // Fetch todos on load
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch from backend');
            const data = await res.json();
            setTodos(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Cannot connect to backend server. Make sure it's running.");
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTodo })
            });
            const added = await res.json();
            setTodos([...todos, added]);
            setNewTodo('');
        } catch (err) {
            console.error(err);
            setError("Failed to save todo.");
        }
    };

    const toggleTodo = async (id, currentStatus) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !currentStatus })
            });
            if (res.ok) {
                setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setTodos(todos.filter(t => t.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="app-container">
            <h1>My Tasks</h1>

            {error && <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}

            <form className="input-container" onSubmit={handleAddTodo}>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="What needs to be done?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="add-button">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PlusCircle size={20} />
                        <span>Add</span>
                    </div>
                </button>
            </form>

            {todos.length === 0 && !error ? (
                <div className="empty-state">
                    <p>You have no tasks! Enjoy your day.</p>
                </div>
            ) : (
                <ul className="todo-list">
                    {todos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <div className="todo-content" onClick={() => toggleTodo(todo.id, todo.completed)}>
                                {todo.completed ? (
                                    <CheckCircle className="checkbox" color="#3b82f6" />
                                ) : (
                                    <Circle className="checkbox" color="#94a3b8" />
                                )}
                                <span className="todo-text">{todo.title}</span>
                            </div>
                            <button className="delete-button" onClick={() => deleteTodo(todo.id)} title="Delete Task">
                                <Trash2 size={18} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
