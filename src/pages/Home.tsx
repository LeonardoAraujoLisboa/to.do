import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    if (id) {
      const updateTasks = tasks.map((task) => {
        return {...task}
      })
      const foundTask = updateTasks.find((item) => {
        return item.id === id;
      })
      if(foundTask) {
        foundTask.done = !foundTask.done
        setTasks(updateTasks)
      }
    }
  }

  function handleRemoveTask(id: number) {
    if (id) {
      setTasks(tasks.filter((task) => {
        return task.id !== id
      }))
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />
      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})