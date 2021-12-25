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

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    cpassword: '',
    error: '',
  };

  componentDidMount() {}

  doSignUp = () => {
    const {email, password, cpassword} = this.state;
    if (email == '') {
      this.setState({error: 'Email empty'});
      return;
    } else if (!password && password.trim() && password.length > 6) {
      this.setState({error: 'Weak password, minimum 5 chars'});
      return;
    } else if (password != cpassword) {
      this.setState({error: 'Password Not Match'});
      return;
    } else if (!this.isValidEmail(email)) {
      this.setState({error: 'Email Not Valid'});
      return;
    }

    this.doCreateUser(email, password);
  };
  isValidEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        console.log('create', '?', response);
        if (response && response.user) {
          Alert.alert('Success ✅', 'Account created successfully');
        }
        this.props.navigation.navigate('Home');
      }
    } catch (e) {
      // console.error(e);
      // console.error(e.message);
      Alert.alert('Failed', e.message);
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
            <Text style={styles.titlePage2}>Register</Text>
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
                  this.setState({cpassword: text});
                }}
                // Adding hint in TextInput using Placeholder option.
                placeholder="Confirm Password"
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
              />

              {this.state.error != '' && (
                <Text style={styles.error}>{this.state.error}</Text>
              )}
              <View style={styles.signInButtonContainerStyle}>
                <TouchableHighlight
                  style={styles.signInButtonStyle}
                  onPress={() => {
                    this.doSignUp();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text style={styles.signInButtonTextStyle}>Register</Text>
                  </View>
                </TouchableHighlight>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
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
    top: WINDOW_WIDTH * 0.15,
  },
  link: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    top: WINDOW_WIDTH * 0.02,
  },
});

export default RegisterScreen;
