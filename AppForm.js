import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Database from './Database';

export default function AppForm({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!route.params) return;
    setNome(route.params.nome);
    setIdade(route.params.idade.toString());
    setEmail(route.params.email);
  }, [route])

  async function handleButtonPress() {
    if (nome && idade && email) {
      let json = await Api.signIn(nome, idade, email)
      if (json.token) {
        await AsyncStorage.setItem('token', json.token)
        let usuario = await Api.checkToken(json.token)
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
        const listItem = { nome, idade: parseInt(idade), email };
        Database.saveItem(listItem, id)
          .then(response => navigation.navigate("AppList", listItem));          
      } else {
        let erro = json.errors ? json.errors[0].msg : ''
        alert(`Não foi possível salvar o usuário: ${erro}`)
      }
    } else {
      alert('Preencha todos os campos!')
    }

  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Usuários</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setNome(text)}
          placeholder="Nome"
          clearButtonMode="always"
          value={nome} />

        <TextInput
          style={styles.input}
          onChangeText={text => setIdade(text)}
          placeholder="Idade"
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={idade.toString()} />

        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          placeholder="E-mail"
          clearButtonMode="always"
          value={email} />

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={styles.buttonContainer}>
            <Icon name="save" size={22} color="white" />

          </View>
        </TouchableOpacity>

      </View>
      <StatusBar style="light" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 180,
    height: 60,
    width: 90,
    left: 195,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonSair: {
    marginTop: 10,
    height: 60,
    width: 90,
    left: 195,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: "row"
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});
