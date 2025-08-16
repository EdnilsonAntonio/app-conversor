import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './src/utils/convertCurrency';

export default function App() {

  const [amount, setAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangerate, setExchangeRate] = useState('');

  // Função para buscar a taxa de câmbio
  async function fetchExchangeRate() {
    try {
      setLoading(true);
      if (!amount) return;

      const data = await exchangeRateApi(fromCurrency);
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);

      const convertedAmount = convertCurrency(amount, rate);
      setResult(convertedAmount);
    } catch (error) {
      alert("Erro, tente novamente!");
      console.error("Erro ao buscar taxa de câmbio:", error);
    } finally {
      setLoading(false);
    }

  }

  // Função para inverter as moedas
  function swapCurrencies() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Tela principal scrollavel'*/}
      <ScrollView>
        <View style={styles.content}>
          {/* Barra de status */}
          <StatusBar style="light" />

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>Conversor de moedas</Text>
            <Text style={styles.subTitle}>Converta valores entre diferentes moedas</Text>
          </View>

          {/* Cartão de conversão */}
          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>

            {/* Botões de seleção de moeda */}
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  key={currency.code}
                  variant='primary'
                  currency={currency.code}
                  onPress={() => { setFromCurrency(currency.code); setResult(''); }}
                  isSelected={fromCurrency === currency.code}
                />
              ))}
            </View>

            {/* Campo de entrada de valor */}
            <Input label='Valor' value={amount} onChangeText={setAmount} />

            {/* Botão de inversão */}
            <TouchableOpacity
              style={styles.swapButton}
              onPress={swapCurrencies}
            >
              <Text style={styles.swapButtonText}>
                ↓↑
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>

            {/* Botões de seleção de moeda */}
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  key={currency.code}
                  variant='secondary'
                  currency={currency.code}
                  onPress={() => { setToCurrency(currency.code); setResult(''); }}
                  isSelected={toCurrency === currency.code}
                />
              ))}
            </View>
          </View>

          {/* Botão de conversão */}
          <TouchableOpacity
            onPress={fetchExchangeRate}
            style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisabled]}
            disabled={!amount || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.swapButtonText}>
                Converter
              </Text>
            )}
          </TouchableOpacity>

          {/* Cartão de resultado */}
          <ResultCard
            result={result}
            exchangeRate={exchangerate}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />

        </View>
      </ScrollView>

    </KeyboardAvoidingView>

  );
}
