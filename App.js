import {useState} from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native';


function App() {
  const [value, onChangeText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [searchResult, setSearchResult] = useState({})
  const [isLoading, setLoadingVisible] = useState(false)
  async function getMoviesFromApiAsync() {
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=67983407&t='+ value
      );
      let json = await response.json()
      setSearchResult(json)
      setLoadingVisible(false)
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  const onPress = () => {
    setModalVisible(true)
    setLoadingVisible(true)
    getMoviesFromApiAsync();
  }
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
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 10

  },
  button: {
    alignItems: "center",
    backgroundColor: "#4cb53d",
    margin: 10,
    padding: 10,
    alignSelf: "stretch"
  }
});

export default App;
