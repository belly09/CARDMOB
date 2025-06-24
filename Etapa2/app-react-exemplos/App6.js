import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

const BASE_URL = 'http://10.81.205.37:3000';

export default function App() {
  const [compras, setCompras] = useState([]);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editCompraId, setEditCompraId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editQuantidade, setEditQuantidade] = useState('');
  const [loading, setLoading] = useState(false);

  // Buscar todas as compras
  const fetchCompras = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/compras`);
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error('Error fetching compras:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompras();
  }, []);

  // CREATE
const addCompra = async () => {
  if (item.trim() === '' || quantidade.trim() === '') {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/compras`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item: item.trim(),
        quantidade: parseInt(quantidade.trim())
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to add compra:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      Alert.alert('Erro', `Falha ao adicionar: ${response.status} ${response.statusText}`);
      return;
    }
    
    await fetchCompras();
    setItem('');
    setQuantidade('');
    
  } catch (error) {
    console.error('Error adding compra:', {
      message: error.message,
      stack: error.stack
    });
    Alert.alert('Erro', `Erro de conexão: ${error.message}`);
  }
}
  // UPDATE
  const updateCompra = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/compras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: editItem.trim(),
          quantidade: parseInt(editQuantidade.trim())
        }),
      });
      if (response.ok) {
        await fetchCompras();
        setEditCompraId(null);
        setEditItem('');
        setEditQuantidade('');
      } else {
        console.error('Failed to update compra:', response.status);
      }
    } catch (error) {
      console.error('Error updating compra:', error);
    }
  }

  // DELETE
  const deleteCompra = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchCompras();
              } else {
                console.error('Failed to delete compra:', response.status);
              }
            } catch (error) {
              console.error('Error deleting compra:', error);
            }
          }, 
        }
      ],
      { cancelable: true }
    );
  };

  // Renderizar cada item da lista
  const renderItem = ({item: compra}) => {
    if (compra.id !== editCompraId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>
            {compra.item} - Quantidade: {compra.quantidade}
          </Text>
          <View style={styles.buttons}>
            <Button 
              title='Editar' 
              onPress={() => {
                setEditCompraId(compra.id);
                setEditItem(compra.item);
                setEditQuantidade(compra.quantidade.toString());
              }}
            />
            <Button 
              title='Excluir' 
              onPress={() => deleteCompra(compra.id)}
            />
          </View>
        </View>
      );
    } else {
      // Modo edição
      return (
        <View style={styles.item}>
          <TextInput 
            style={[styles.editInput, {flex: 2}]}
            onChangeText={setEditItem}
            value={editItem}
            placeholder="Item"
            autoFocus
          />
          <TextInput 
            style={[styles.editInput, {flex: 1}]}
            onChangeText={setEditQuantidade}
            value={editQuantidade}
            placeholder="Qtd"
            keyboardType="numeric"
          />
          <Button 
            title='Atualizar' 
            onPress={() => updateCompra(compra.id)}
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={[styles.input, {flex: 2}]}
          value={item}
          onChangeText={setItem}
          placeholder='Item a comprar'
        />
        <TextInput 
          style={[styles.input, {flex: 1}]}
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder='Qtd'
          keyboardType="numeric"
        />
      </View>
      
      <Button 
        title='Adicionar Item'
        onPress={addCompra}
      />
      
      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={compras}
          renderItem={renderItem}
          keyExtractor={compra => compra.id}
          style={styles.list}
        />
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#ffe7f1'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffb8d4',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
  }
});