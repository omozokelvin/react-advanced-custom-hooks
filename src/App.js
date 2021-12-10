import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

const taskUrl =
  'https://react-http-54590-default-rtdb.firebaseio.com/tasks.json';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTask = (taskResponse) => {
      const loadedTasks = [];

      for (const [key, value] of Object.entries(taskResponse)) {
        loadedTasks.push({ id: key, text: value.text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks({ url: taskUrl }, transformTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
