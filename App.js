import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';

export default function App() {
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
          <View styles={styles.card}>
            <Text styles={styles.label}>De:</Text>
            <Button variant='secondary'></Button>
          </View>

        </View>
      </ScrollView>

    </KeyboardAvoidingView>

  );
}
