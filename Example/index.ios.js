/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
} = React;
var App = require('./App');

var FloatingLabel = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FloatingLabel', () => FloatingLabel);
