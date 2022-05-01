import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTask = {
  id: number;
  newTaskTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dones, setDones] = useState<number>()

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    const sameTask = tasks.find((task) => {
      return task.title === data.title
    })
    if (sameTask) {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome');
    } else {
      setTasks([...tasks, data])
    }
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
        const updateTasksDone = updateTasks.filter((itemDone) => {
          return itemDone.done === true;
        })
        setDones(updateTasksDone.length)
      }
      console.log('tasks', tasks);
      console.log('update', updateTasks)
      console.log('dones', dones)
    }
  }

  function handleRemoveTask(id: number) {
    if (id) {
      Alert.alert(
        'Remover item',
        'Tem certeza que você deseja remover esse item?',
        [
          {
            text: 'Não',
            style: 'cancel',
            onPress: () => console.log('Cancelou')
          },
          {
            text: 'Sim',
            onPress: () => {
              setTasks(tasks.filter((task) => {
                return task.id !== id
              }))
              const updateTasksId = tasks.filter((itemDone) => {
                return itemDone.id === id
              })
              if (updateTasksId[0].done) {
                const newDones = dones && dones - 1
                console.log('new', newDones)
                setDones(newDones)
              }
            }
          }
        ]
      )
    }
  }

  const handleEditTask = ({id, newTaskTitle}: EditTask) => {
    const editTask = tasks.map((task) => {
      return {...task}
    })
    const taskupdate = editTask.find((task) => {
      return task.id === id;
    })
    if(taskupdate) {
      taskupdate.title = newTaskTitle
      setTasks(editTask)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} tasksDone={dones} />

      <TodoInput addTask={handleAddTask} />
      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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