import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (response.ok) {
        setNewTitle('');
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Team Tasks</h1>
        <p>Manage your projects with ease</p>
      </header>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add Task</button>
      </form>

      {loading ? (
        <div className="loader">Loading tasks...</div>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks found. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-item">
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
