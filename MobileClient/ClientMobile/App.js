import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import io from "socket.io-client/dist/socket.io.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://192.168.137.1:3000");
    this.state = {
      // randomNumber
      NumberHolder: '#',
      // stringHandle
      string: {
        stringSend: "This is an object to handle the character!",
        sCount: 0,
      },
      // actionHandle
      action: {
        actionSend: "Took action!",
        aCount: 0,
      },
    }
  }

  // Handle Random Number
  createRandomNumber = () => {
    let randomNumber = Math.floor(Math.random()*6) + 1;
    this.setState({
      NumberHolder: randomNumber,
    });
    this.socket.emit("send-random-number", this.state.NumberHolder);
  }
  // Handle String
  sendAndCountSendString = () => {
    this.setState({
      string: {
        sCount: this.state.string.sCount + 1,
      }
    })
    this.socket.emit("send-string",this.state.string.stringSend);
  }
  // Handle Action
  sendAndCountSendAction = () => {
    this.setState({
      action: {
        aCount: this.state.action.aCount + 1,
      }
    })
    this.socket.emit("send-action",this.state.action.actionSend);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>Testing Client!</Text>
          <View style={styles.btnArea}>
            <View style={styles.rArea}>
              <Text style={styles.rTextArea}>{this.state.NumberHolder} </Text>
              <TouchableOpacity style={styles.handleBtn} onPress={this.createRandomNumber}>
                <Text style={styles.btnContent}>Send Random Number!</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sArea}>
              <Text style={styles.sTextArea}>String here: The ({this.state.string.sCount}) time(s).</Text>
              <TouchableOpacity style={styles.handleBtn} onPress={this.sendAndCountSendString}>
                <Text style={styles.btnContent}>Send "String"! </Text>
              </TouchableOpacity>
              </View>
            <View style={styles.sArea}>
              <Text style={styles.sTextArea}>Action Here: The ({this.state.action.aCount}) time(s).</Text>
              <TouchableOpacity style={styles.handleBtn} onPress={this.sendAndCountSendAction}><Text style={styles.btnContent}>Send Action!</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#333333"
  },
  contentContainer: {
    backgroundColor: '#555555',
    height: 500,
    width: 350,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  content: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
        btnArea: {
          flex: 1,
          alignItems: 'center',
          margin: 10,
          justifyContent: 'space-around'
        },
              handleBtn: {
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: '#00BFFF',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                width: 250,
                marginLeft: 0,
              },
                    btnContent: {
                      textAlign: 'center',
                      color: 'white',
                      fontStyle: 'italic',
                      fontSize: 20,
                    },
              rArea: {
                flex: 1,
                flexDirection: 'row',
                alignItems: "center",
              },
                    rTextArea: {
                      fontSize: 30,
                      marginLeft: 20,
                      color: 'white',
                    },
              sArea: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              },
                    sTextArea: {
                      fontSize: 15,
                      marginLeft: 20,
                      color: 'white',
                    },
});
