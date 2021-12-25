import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TimePicker from '../components/TimePicker';
import ListAlarms from '../components/ListAlarms';
import Clock from '../components/Clock';
import {
  BG_COLOR,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  largeFont,
  mediumFont,
} from '../styles';
import auth, {firebase} from '@react-native-firebase/auth';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    cpassword: '',
    error: '',
  };

  componentDidMount() {}

  doSingIn = () => {
    const {email, password} = this.state;
    if (email == '') {
      this.setState({error: 'Email empty'});
      return;
    } else if (!this.isValidEmail(email)) {
      this.setState({error: 'Email Not Valid'});
      return;
    } else if (!password && password.trim() && password.length > 6) {
      this.setState({error: 'Password Empty'});
      return;
    }

    this.SingIn(email, password);
  };
  isValidEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  SingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert('Success ✅', 'Logged successfully');
        this.props.navigation.navigate('Home');
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  render() {
    return (
      <ImageBackground
        source={require('../images/logo/background.jpeg')}
        resizeMode="cover"
        style={styles.mainContainer}>
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.titlePage}>ALARM Ya-Hoo!</Text>
            <View style={styles.containerWraper}>
              <TextInput
                style={{
                  height: 40,
                  width: 250,
                  backgroundColor: '#FFFF',
                  paddingVertical: 8,
                  borderColor: 'gray',
                  borderWidth: 2,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
                onChangeText={text => {
                  this.setState({email: text});
                }}
                // Adding hint in TextInput using Placeholder option.
                placeholder="Email"
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={{
                  height: 40,
                  width: 250,
                  backgroundColor: '#FFFF',
                  paddingVertical: 8,
                  borderColor: 'gray',
                  borderWidth: 2,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
                onChangeText={text => {
                  this.setState({password: text});
                }}
                // Adding hint in TextInput using Placeholder option.
                placeholder="Password"
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
              />

              {this.state.error != '' && (
                <Text style={styles.error}>{this.state.error}</Text>
              )}
              <View style={styles.signInButtonContainerStyle}>
                <TouchableOpacity
                  style={styles.signInButtonStyle}
                  onPress={() => {
                    this.doSingIn();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text style={styles.signInButtonTextStyle}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Register');
                }}>
                <Text style={styles.titlePage2}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  containerWraper: {
    top: WINDOW_WIDTH * 0.4,
    alignContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  signInButtonStyle: {
    width: 150,
    height: 40,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 130 / 4,
    alignItems: 'center',
    backgroundColor: '#80FF00',
  },
  signInButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    width: WINDOW_WIDTH * 0.9,
    alignSelf: 'center',
    position: 'relative',
  },
  titlePage: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    top: WINDOW_WIDTH * 0.1,
  },
  titlePage2: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    top: WINDOW_WIDTH * 0.04,
  },
});

export default LoginScreen;
