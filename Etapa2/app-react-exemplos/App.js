import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);

  //// crud em memória
  const [items, setItems] = useState(null);
  const [text, setText] =  useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  const addItem = () => {
    if (text.trim() === ''){
      return
    }
    const newItem ={
      id: Math.random().toString(),
      text: text.trim()
    }
    setItems([...setItems, newItem]);
    setText('')
    console.log(items)
  }
  

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      value={text}
      onChangeText={setText}
      placeholder= 'Enter text item'
      />
      <Button
        title='Add Item'
        onpress={addItem}
      />
      <Text style={styles.text}>Olá App React Native!</Text>
      <Image
        source={{uri: "https://picsum.photos/200"}}
        style={{width: 200, height: 200}}
      />
      <StatusBar style="auto" />
      <Text style={styles.text}>Counter: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title='Increment' onPress={incrementCounter}/>
        <Button title='Decrement' onPress={decrementCounter}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});
