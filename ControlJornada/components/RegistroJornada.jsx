import moment from 'moment';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { insertMarcacoes } from '../src/database';
import gerarRelatorioPDF from '../src/utils/relatorio';

const RegistroJornada = () => {
  const [marcacoes, setMarcacoes] = useState({
    entrada: null,
    saida: null,
    almocoEntrada: null,
    almocoSaida: null,
  });

  const registrarMarca = (tipo) => {
    const horarioAtual = moment().format('HH:mm:ss');
    setMarcacoes(prev => {
      const newMarcacoes = { ...prev, [tipo]: horarioAtual };

      // Salvar no banco de dados
      const totalTrabalhado = calcularTempoTrabalhado(newMarcacoes); // Passar o novo estado
      insertMarcacoes(moment().format('YYYY-MM-DD'), newMarcacoes.entrada, newMarcacoes.saida, newMarcacoes.almocoEntrada, newMarcacoes.almocoSaida, totalTrabalhado);
      return newMarcacoes;
    });
  };

  const calcularTempoTrabalhado = (marcacoes) => {
    // Exemplo simplificado, o cálculo real dependeria das marcações
    return '8h00m'; // Retorne o cálculo correto do tempo trabalhado
  };

  const gerarRelatorio = async () => {
    try {
      const uri = await gerarRelatorioPDF();
      alert(`Relatório gerado: ${uri}`); // Corrigido o erro de sintaxe no alert
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Registrar Entrada" onPress={() => registrarMarca('entrada')} />
      <Button title="Registrar Entrada Almoço" onPress={() => registrarMarca('almocoEntrada')} />
      <Button title="Registrar Saída Almoço" onPress={() => registrarMarca('almocoSaida')} />
      <Button title="Registrar Saída" onPress={() => registrarMarca('saida')} />
      <Button title="Gerar Relatório em PDF" onPress={gerarRelatorio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default RegistroJornada;
