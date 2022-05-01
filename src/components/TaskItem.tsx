import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { EditTask } from '../pages/Home';

interface TasksListProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({id, newTaskTitle}: EditTask) => void;
    index: number;
  }

const TaskItem = ({task, index, toggleTaskDone, removeTask, editTask}: TasksListProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewValue, setTaskNewValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    const handleStartEditing = () => {
        setIsEditing(true);
    }

    const handleCancelEditing = () => {
        setIsEditing(false);
        setTaskNewValue(task.title)
    }

    const handleSubmitEditing = () => {
        setIsEditing(false);
        editTask({id: task.id, newTaskTitle: taskNewValue})
    } 

    useEffect(() => {
        if(textInputRef.current) {
            if(isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

  return (
  <>
    <View>
        <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(task.id)}
        >
           <View testID={`marker-${index}`} style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
               { task.done && (
               <Icon name="check" size={12} color="#FFF"/>
               )}
            </View>
            <TextInput ref={textInputRef} value={taskNewValue} onChangeText={setTaskNewValue} onSubmitEditing={handleSubmitEditing} editable={isEditing} style={task.done ? styles.taskTextDone : styles.taskText}/>
        </TouchableOpacity>
    </View>

    <View style={styles.container}>
        {isEditing ? <TouchableOpacity testID={`cancel-${index}`} onPress={handleCancelEditing}>
            <Icon name="x" size={24} color='#b2b2b2'/>
            </TouchableOpacity> : <TouchableOpacity testID={`edit-${index}`} onPress={handleStartEditing}>
                <Image source={editIcon}/>
            </TouchableOpacity>}
            <View style={styles.divider}></View>
            <TouchableOpacity disabled={isEditing} testID={`trash-${index}`} onPress={() => removeTask(task.id)}>
                <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
            </TouchableOpacity>
    </View>
  </>        
  )
}

export default TaskItem

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    container: {
        flexDirection: 'row',
        paddingRight: 24
    }, 
    divider: {
        marginLeft: 12,
        marginRight: 12,
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    }
  })