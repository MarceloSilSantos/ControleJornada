import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import RegistroJornada from '../components/RegistroJornada';
import { createTable } from '../src/database';

export default function Index() {

  useEffect(() => {
    createTable(); // Criar a tabela no banco de dados
  }, []);



  return (

    <View>
      <Text style={styles.title}>App para Controle de Jornada</Text>

      <Image 
        source={require('../assets/images/icon.png')} 
        style={styles.image}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <RegistroJornada />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 60,
    backgroundColor: 'blue',
  },

  title: {
    fontSize: 30,
    fontStyle:'italic',
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 40,

  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    paddingLeft: 30,
    
  }

    
  }
);

