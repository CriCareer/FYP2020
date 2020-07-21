import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import { styles } from '../../styles/login';
import {checkInputs} from '../utilities';
import {
  UserLogin,
  loading,
  loadUser,
} from '../../redux/js/actions/AuthActions/AuthActions';
import Logo from '../../components/Logo';
import { LoadProfile } from '../../redux/js/actions/ProfileActions/ProfileActions';
import { LoadPlayer, GetAllPlayers } from '../../redux/js/actions/PlayerActions/PlayerActions';
import { LoadCricpocket } from '../../redux/js/actions/CricpocketActions/CricpocketActions';
import { LoadTeam, GetAllTeams } from '../../redux/js/actions/TeamActions/TeamActions';
import { LoadMyVenues, GetAllVenues } from '../../redux/js/actions/VenueActions/VenueActions';
import { GetAllMatches, LoadMyMatches } from '../../redux/js/actions/MatchActions/MatchActions';
import { LoadRequests } from '../../redux/js/actions/RequestActions/RequestActions';


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let dispatch = useDispatch();

  const handleSubmit = async e => {
    dispatch(loading(true));
    let check = checkInputs([email, password]);
    if (check) {
      let response = await dispatch(UserLogin(email, password));
      if (response.type === 'AUTH_SUCCESS') {
        console.log('User Authorized');
        response = await dispatch(loadUser())
        console.log({USER_AUTHORIZED_RESULT: response})
        if(response.data.user.profile_info === true)
        {
         let res = await dispatch(LoadProfile());
         {
           if(res.type === 'PROFILE_SUCCESS')
           {
            console.log('User Profile Loaded')
           }
           else{
            console.log('User Profile Error')
           }
         }
        }
        if(response.data.user.player === true)
        {
          res = await dispatch(LoadPlayer())
          if(res.type === 'PLAYER_SUCCESS')
           {
            console.log('Player Loaded')
           }
           else{
            console.log('Player Error')
           }
        }
        if(response.data.user.cricpocket === true)
        {
          res = await dispatch(LoadCricpocket())
          if(res.type === 'CRICPOCKET_SUCCESS')
           {
            console.log('CricPocket Loaded')
           }
           else{
            console.log('CricPocket Error')
           }
        }
        if(response.data.user.role_creation === true)
        {
          if(response.data.user.role === 'Team Manager')
          {
            res = await dispatch(LoadTeam());
            if(res.type === 'TEAM_SUCCESS')
            {
              console.log('Team Loaded')
            }
            else{
              console.log('Team Error')
            }
          }
          if(response.data.user.role === 'Ground Manager')
          {
             res = await dispatch(LoadMyVenues());
             if(res.type === 'VENUE_SUCCESS')
            {
              console.log('Venue Loaded')
            }
            else{
              console.log('Venue Error')
            }
          }
        }
        response = await dispatch(GetAllPlayers());
        if(response.type === 'PLAYER_SUCCESS')
        {
          console.log('All Players Loaded')
        }
        else
        {
          console.log('All Players Error')
        }

        response = await dispatch(GetAllTeams());
        if(response.type === 'TEAM_SUCCESS')
        {
          console.log('All Teams Loaded')
        }
        else
        {
          console.log('All Teams Error')
        }

        response = await dispatch(GetAllVenues());
        if(response.type === 'TEAM_SUCCESS')
        {
          console.log('All Teams Loaded')
        }
        else
        {
          console.log('All Teams Error')
        }

        response = await dispatch(GetAllMatches());
        if(response.type === 'MATCH_SUCCESS')
        {
          console.log('All Matches Loaded')
        }
        else
        {
          console.log('All Matches Error')
        }
        response = await dispatch(LoadRequests());
        if(response.type === 'REQUEST_SUCCESS')
        {
          console.log('All Requests Loaded')
        }
        else
        {
          console.log('All Requests Error')
        }

        response = await dispatch(LoadMyMatches());
            if(response.type === 'MATCH_SUCCESS')
            {
              console.log('My Matches Loaded')
            }
            else
            {
              console.log('My Matches Error')
            }
        
        props.navigation.navigate('AppLanding');
      }
      else
      {
        Alert.alert('Invalid Credentials');
      }
      dispatch(loading(false));
    } else {
      Alert.alert('Incomplete Fields', '', [{text: 'Ok'}]);
      dispatch(loading(false));
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
          <Logo width='350' height='350'/>
          <View style={styles.container}>
              <View style={styles.container}>
                  <TextInput 
                      style={styles.inputBox} 
                      placeholder="email" 
                      placeholderTextColor="white"
                      value={email}
                      type='username'
                      autoCapitalize = 'none'
                      onChangeText={text => {setEmail(text)}}
                      // onChangeText={(text) => setEmail(text)}
                      />
                  <TextInput
                      style={styles.inputBox}
                      placeholder="Password"
                      placeholderTextColor="white"
                      secureTextEntry={true}
                      value={password}
                      type='password'
                      autoCapitalize = 'none'
                      onChangeText={text => {setPassword(text)}}
                      // onChangeText={(text) => setPassword(text)}
                      />
                  <TouchableOpacity>
                      <Text
                          style={styles.forgotButton}
                          onPress={() => Alert.alert("Password Reset Coming Soon!")}>
                          Forgot Password
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Text
                          style={styles.loginButton}
                          onPress={e => {
                            handleSubmit();
                          }}>
                          Login
                      </Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.signupContent}>
                  <Text style={styles.signupContent}>Don't have an account ? </Text>
                  <TouchableOpacity>
                      <Text
                          style={styles.signupButton}
                          onPress={() => props.navigation.navigate('Signup')}>
                      Register
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
      </KeyboardAvoidingView>
  </View>

  );
}

export default Login;



 // <View
    //   style={{
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //   }}>
    //    <Text>CRICAREER</Text> 
    //   <Input
    //     onTextAdd={text => {
    //       setEmail(text);
    //     }}
    //     placeholderTitle="Email"
    //     type="username"
    //     value={email}
    //   />
    //   <Input
    //     onTextAdd={text => {
    //       setPassword(text);
    //     }}
    //     placeholderTitle="Password"
    //     type="password"
    //     value={password}
    //   />
    //   <Button
    //     title="Login"
    //     onPress={e => {
    //       handleSubmit();
    //     }}
    //   />
    //   <Button
    //     title="Signup"
    //     onPress={() => {
    //       props.navigation.navigate('Signup');
    //     }}
    //   />
    // </View>