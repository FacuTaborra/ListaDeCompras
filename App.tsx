/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native';

const App = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [isAddingPrice, setIsAddingPrice] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = () => {
    if (item && quantity) {
      setShoppingList([...shoppingList, { key: item, quantity, price: null }]);
      setItem('');
      setQuantity('');
    }
  };

  const openPriceDialog = (selectedItem) => {
    setSelectedItem(selectedItem);
    setIsAddingPrice(true);
  };

  const addPrice = () => {
    if (selectedItem && price) {
      const updatedList = shoppingList.map((item) =>
        item === selectedItem ? { ...item, price } : item
      );
      setShoppingList(updatedList);
      setIsAddingPrice(false);
      setSelectedItem(null);
      setPrice('');
    }
  };

  const removeItem = (selectedItem) => {
    const updatedList = shoppingList.filter((item) => item !== selectedItem);
    setShoppingList(updatedList);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    shoppingList.forEach((item) => {
      if (item.price) {
        subtotal += item.price * item.quantity;
      }
    });
    return subtotal;
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Lista de Compras</Text>
      <TextInput
        placeholder="Artículo"
        value={item}
        onChangeText={(text) => setItem(text)}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Cantidad"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Agregar" onPress={addItem} />

      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'lightgray',
            }}
          >
            <View>
              <Text>{item.key}</Text>
              <Text>Cantidad: {item.quantity}</Text>
              {item.price ? <Text>Precio: ${item.price}</Text> : null}
            </View>
            <View>
              <Button
                title="Agregar Precio"
                onPress={() => openPriceDialog(item)}
              />
              <Button
                title="Eliminar"
                onPress={() => removeItem(item)}
                color="red"
              />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Subtotal: ${calculateSubtotal()}
            </Text>
          </View>
        )}
      />

      <Modal visible={isAddingPrice} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Agregar Precio
          </Text>
          <TextInput
            placeholder="Precio"
            value={price}
            onChangeText={(text) => setPrice(text)}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
            keyboardType="numeric"
          />
          <Button title="Agregar" onPress={addPrice} />
        </View>
      </Modal>
    </View>
  );
};

export default App;







