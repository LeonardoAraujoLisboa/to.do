import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import logoImg from '../assets/images/logo/logo.png';

interface HeaderProps {
  tasksCounter: number;
  tasksDone: number | undefined;
}

export function Header({ tasksCounter, tasksDone }: HeaderProps) {
  const tasksCounterText = tasksCounter === 1 ? 'tarefa' : 'tarefas';
  const tasksCounterTextDone = tasksDone === undefined ? 'feitas' : 'feitas';
  
  return (
    <View style={styles.container}>
      <Image source={logoImg} />
      <View style={styles.tasks}>
        <View style={styles.tasksLength}>
          <Text style={styles.tasksCounter}>Você tem </Text>
          <Text style={styles.tasksCounterBold}>{tasksCounter} {tasksCounterText}</Text>
        </View>
        <View style={styles.tasksLength}>
          <Text style={styles.tasksCounter}>{tasksDone === undefined ? 'Sendo ' : 'Sendo '}</Text>
          <Text style={styles.tasksCounterBold}>{tasksDone === undefined ? '0' : tasksDone} {tasksCounterTextDone}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: '#8257E5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  tasksLength: {
    flexDirection: 'row'
  },
  tasksCounter: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Regular',
  },
  tasksCounterBold: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  }
});