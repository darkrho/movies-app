import {useState} from 'react'
import { StyleSheet, Text, View} from 'react-native';


function App() {
  const [value, onChangeText] = useState('')
  const [modalVisible, setModeViseble] = useState(false)
  const [searchResult, setResearchResult] = useState({})
  const [isLoading, setLoadingVisble] = useState(false)
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>IMDb API</Text>
        <Text>The Open Movie Database</Text>
        <TextInput 
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 48,
    fontWeight: "bold"
  }
});

export default App;
