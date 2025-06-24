import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

const BASE_URL = 'http://10.81.205.37:5000/api/catalog';

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Buscar produtos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setProducts(data.catalog);
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Limpar formulário
  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setEditProductId(null);
  };

  // CREATE
  const addProduct = async () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Preencha todos os dados');
      return;
    }
    
    setFormLoading(true);
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price)
        }),
      });
      
      if (response.ok) {
        await fetchProducts();
        clearForm();
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    } finally {
      setFormLoading(false);
    }
  }

  // UPDATE
  const updateProduct = async () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Preencha todos os dados');
      return;
    }
    
    setFormLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${editProductId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price)
        }),
      });
      
      if (response.ok) {
        await fetchProducts();
        clearForm();
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    } finally {
      setFormLoading(false);
    }
  }

  // DELETE
  const deleteProduct = async (id) => {
    Alert.alert(
      'Confirme Exclusão',
      'Tem certeza que deseja excluir esse produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchProducts();
                Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              } else {
                throw new Error('Failed to delete product');
              }
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product');
            }
          }, 
        }
      ],
      { cancelable: true }
    );
  };

  const startEditing = (product) => {
    setEditProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
  };

  const renderProduct = ({item}) => (
    <View style={styles.productCard}>
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      
      <View style={styles.productButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => startEditing(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteProduct(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Produtos</Text>
      
      <Text style={styles.subHeader}>
        {editProductId ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Preço (ex: 6.50)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <View style={styles.formButtons}>
        {editProductId && (
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={clearForm}
            disabled={formLoading}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, editProductId ? styles.updateButton : styles.addButton]}
          onPress={editProductId ? updateProduct : addProduct}
          disabled={formLoading}
        >
          {formLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {editProductId ? 'Atualizar Produto' : 'Adicionar Produto'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Lista de Produtos</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text>Carregando produtos...</Text>
        </View>
      ) : products.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum produto cadastrado</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
          refreshing={loading}
          onRefresh={fetchProducts}
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    minWidth: 150,
  },
  addButton: {
    backgroundColor: '#2196F3',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  productButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});