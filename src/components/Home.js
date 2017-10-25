import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';
import { Button } from 'react-native-elements'

import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
  state = {
    name: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
        <Image source={require('../images/rafeeq.png')}
        resizeMode="contain" style={{height: 200, width: 100}}
        />
        </View>
        <Text style={[styles.label]}>
          Enter your name:
        </Text>
        <TextInput
          placeholder='Fawaz Hamza'
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          value={this.state.name}
        />
        <Button
        backgroundColor="#25b7d3"
        iconLeft
        title='Start Chatting'
        icon={{name: 'chat'}}
          onPress={() => {
            Actions.chat({
              name: this.state.name,
            });
          }}
        fontFamily='Avenir'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginLeft: 15,
    fontFamily: 'Avenir',
  },
  textInput: {
    height: 40,
    marginLeft: 15,
    fontFamily: 'Avenir'
  },
});
