import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@firebase/app'
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIw9ZyiZ6ezaoyaGnD-FduSAZ74I7IspI',
      authDomain: 'authentication-71351.firebaseapp.com',
      databaseURL: 'https://authentication-71351.firebaseio.com',
      projectId: 'authentication-71351',
      storageBucket: 'authentication-71351.appspot.com',
      messagingSenderId: '781916874192'
    }); 

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
       <Header headerText="Authentication" />
             {this.renderContent()}
      </View>
    );
  }
}

export default App;