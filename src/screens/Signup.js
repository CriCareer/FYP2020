import React, {useState} from 'react';
import {View, Text, Button, Picker, Alert, Image, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Input from '../utilities/index';
import { styles } from '../../styles/signup';
import {checkInputs} from '../utilities';
import {
  UserSignup,
  loading,
  loadUser,
} from '../../redux/js/actions/AuthActions/AuthActions';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('');
  let dispatch = useDispatch();

  const handleSubmit = async e => {
    dispatch(loading(true));
    let check = checkInputs([email, role, password, confirm]);
    let SignupObject = {
      Email: email,
      Password: password,
      Role: role,
    };
    if (check) {
      if(!email.includes('@gmail.com') && !email.includes('@yahoo.com') && !email.includes('@outlook.com') && !email.includes('@live.com')
      && !email.includes('@hotmail.com') && !email.includes('@icloud.com')){
        Alert.alert('Email is not valid');
      }
      else{
        if(password.length<6)
      {
        Alert.alert('Password should have minimum 6 characters');
      }
      else{
        if (confirm === password) {
          let response = await dispatch(UserSignup(SignupObject))
          response = await dispatch(loadUser());
          if (response.type === 'AUTH_SUCCESS') {
            Alert.alert('Registration success'); 
            props.navigation.navigate('AppLanding');
          }
          else {
            Alert.alert('Registration success');
          }
        }
        else{
          Alert.alert('Password does not match', '', [{text: 'Ok'}]);
        }
      }
      }
      dispatch(loading(false));
    } else {
      Alert.alert('Incomplete Fields', '', [{text: 'Ok'}]);
      dispatch(loading(false));
    }
  };

  return (
    <View style={styles.container}>
        <Image
            style={{width:200, height:200} }
            source={require("../../images/logo_small.jpg")}
        />
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Player" value="Player" />
                <Picker.Item label="Team Manager" value="Team Manager" />
                <Picker.Item label="Ground Manager" value="Ground Manager" />
                <Picker.Item label="Organizer" value="Organizer" />
                <Picker.Item label="Umpire" value="Umpire" />  
            </Picker>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Email" 
                placeholderTextColor="white"
                value={email}
                autoCapitalize = 'none'
                type="username"
                onChangeText={(text) => setEmail(text)}/>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Password" 
                placeholderTextColor="white"
                value={password}
                autoCapitalize = 'none'
                secureTextEntry={true}
                type="password"
                onChangeText={(text) => setPassword(text)}/>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Confirm Password" 
                placeholderTextColor="white"
                autoCapitalize = 'none'
                secureTextEntry={true}
                value={confirm}
                type="password"
                onChangeText={(text) => setConfirm(text)}/>
                <Text style={{textAlign:'center'}}>password must be 6 to 10 characters</Text>
               

            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}>
                <Text
                    style={styles.signupButton}
                    onPress={e => {
                      handleSubmit();
                    }}>
                    Signup
                </Text>
            </TouchableOpacity>
                
            <View style={styles.loginContent}>
                <Text style={styles.loginContent}>Already have an account ? </Text>
                <TouchableOpacity>
                    <Text
                        style={styles.loginButton}
                        onPress={() => props.navigation.navigate('Login')}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </View>
  );
}

export default Signup;
