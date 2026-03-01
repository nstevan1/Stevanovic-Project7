import { Component } from 'react';
import {
  FlatList,
  NativeModules,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { HelloManager } = NativeModules;

export default class App extends Component {
  state = {
    greetingMessage: null,
    isAdmin: false,
    people: [],
    userName: null,
  }

  updateGreetingMessage = (result) => {
    this.setState({ greetingMessage: result });
    this.setState({ people: [...this.state.people, `${this.state.userName} ${this.state.isAdmin ? 'was' : 'was not'} an admin`] });
  }

  greetUser = () => {
    this.refs.userName.blur();
    HelloManager.greetUser(
      this.state.userName,
      this.state.isAdmin,
      this.updateGreetingMessage
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter User Name</Text>
        <TextInput
          autoCorrect={false}
          placeholder='User Name'
          ref='userName'
          onChangeText={(text) => this.setState({ userName: text })}
          style={styles.input}
        />
        <Text>Admin</Text>
        <Switch
          value={this.state.isAdmin}
          onValueChange={(value) => this.setState({ isAdmin: value })}
          style={styles.radio}
        />
       <TouchableOpacity
          disabled={!this.state.userName}
          onPress={this.greetUser}
          style={[
            styles.button,
            !this.state.userName ? styles.disabled : null,
          ]}
        >
          <Text>Greet</Text>
        </TouchableOpacity>
        <Text>Response:</Text>
        <Text>{this.state.greetingMessage}</Text>
        <FlatList
          data={this.state.people}
          renderItem={({ item }) => (<Text>{item}</Text>)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3066be',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#b4c5e4',
    flex: 1,
  },
  disabled: {
    backgroundColor: '#ff0000',
  },
  input: {
    fontSize: 30,
  },
  radio: {
    marginBottom: 10,
  },
});