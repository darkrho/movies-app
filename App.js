import {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import { Pressable, Modal, ScrollView, ActivityIndicator} from 'react-native';


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
      <Modal 
        style={styles.modalSettings}
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={
          ()=> {
            setModalVisible(false)
          }
        }
      >
        {(!isLoading) ? 
        <ScrollView>

          <Image 
            source={{ uri: searchResult.Poster}}
            style={styles.backgroundImage}
            resizeMode='contain'
          />
          <Text>Title: {searchResult.Title}</Text>
          <Text>Type: {searchResult.Type}</Text>
          <Text>Genre: {searchResult.Genre}</Text>
          <Text>Actors: {searchResult.Actors}</Text>
          <Text>Awards: {searchResult.Awards}</Text>
          <Text>Director: {searchResult.Director}</Text>
          <Text>Languages: {searchResult.Languages}</Text>
          <Text>Sinopsis: {searchResult.Sinopsis}</Text>
          <Text>Released: {searchResult.Released}</Text>
          <Text>Runtime: {searchResult.Runtime}</Text>
          <Text>Writer: {searchResult.Writer}</Text>
          <Text>ImdbRating: {searchResult.ImdbRating}</Text>
          <Text>ImdbVotes: {searchResult.ImdbVotes}</Text>
          <Text>Seasons: {searchResult.Seasons}</Text>
        </ScrollView>
         
        :
          <View style={[styles.container]}>
            <ActivityIndicator size={100} color="#4CB53D" />
          </View>     
        }
      </Modal>
      <View style={styles.container}>
        <Text style={styles.title}>IMDb API</Text>
        <Text>The Open Movie Database</Text>
        <TextInput 
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <Pressable 
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
  },
  modalSettings: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    aspectRation: 1
  }
});

export default App;
