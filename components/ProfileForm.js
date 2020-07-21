import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, AsyncStorage, Alert, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import { styles } from '../styles/signup';
import { useSelector, useDispatch } from 'react-redux';
import {checkInputs} from '../src/utilities';
import { CreateProfile, loading } from '../redux/js/actions/ProfileActions/ProfileActions';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

function ProfileForm(props) {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [cnic, setCnic] = useState('');
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('https://i.ya-webdesign.com/images/funny-png-avatar-2.png');

    let dispatch = useDispatch();

    const handleSubmit = async () => {
      console.log(props.navigation)
            let check = checkInputs([city, cnic, date, name, phone, avatar]);
            let ProfileObject = {
              name: name,
              cnic: cnic,
              dob: date,
              city: city, 
              phone: phone, 
              avatar: avatar
            };
            if(check) {
              if(!cnic.length === 13 || !cnic.match(/^[0-9]+$/))
              {
                Alert.alert('Please Enter a valid CNIC without (-)');
              }
              if(!phone.length === 11 || !phone.match(/^[0-9]+$/))
              {
                Alert.alert('Please Enter a valid Phone without (-)');
              }
              let response = await dispatch(CreateProfile(ProfileObject));
              if(response.type === 'PROFILE_SUCCESS')
              {
                Alert.alert('Profile Created');
                props.navigation.navigate('AuthLoading')
              }
              else{
                Alert.alert('Profile Failed')
              }
            }
            else{
                Alert.alert('Incomplete Fields', '', [{text: 'Ok'}]);
                dispatch(loading(false));
            }
}   
        
        chooseImage = () => {
          let options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Remove Image' },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              setAvatar('https://i.ya-webdesign.com/images/funny-png-avatar-2.png')
            } else {
              setAvatar(response.uri);
            }
          });
        }
      
        launchCamera = () => {
          let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchCamera(options, (response) => {
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
            //   const source = { uri: response.uri };
              setFilePath(response);
              setFileData(response.data);
              setFileUri(response.uri);
              setAvatar(response.uri);
            }
          });
      
        }
      
        renderFileUri = () => {
          if (avatar) {
            return <Image
              source={{ uri: avatar }}
              style={{height: 200, width: 200, borderRadius: 300/2}}
            />
          } else {
            return <Image
              source={require('../images/avatar_m.jpeg')}
              style={{height:200, width:200, borderRadius: 200/2}}
            />
          }
        }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView >
                <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', marginLeft: 90}}>PROFILE INFO</Text>
                <TouchableOpacity onPress = {() =>{chooseImage()}} style={{margin: 40,alignItems:'center', justifyContent:'center'}}>
                    {renderFileUri()}
                </TouchableOpacity>    
                <Text style={{fontSize: 20, margin: 50, marginLeft: 0}}>Complete Your Profile</Text>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Name" 
                    placeholderTextColor="white"
                    value={name}
                    autoCapitalize = 'none'
                    type="name"
                    onChangeText={(text) => setName(text)}/>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="City" 
                    placeholderTextColor="white"
                    value={city}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setCity(text)}/>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Phone" 
                    placeholderTextColor="white"
                    value={phone}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setPhone(text)}/>
                <DatePicker
                    style={{width: 200}}
                    mode="date"
                    date= {date}
                    placeholder="Date of Birth"
                    format="YYYY-MM-DD"
                    minDate="1970-05-01"
                    maxDate="2020-07-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 50
                    }
                    }}
                    onDateChange={(date) => {setDate(date)}}
                />
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="1234567890123" 
                    placeholderTextColor="white"
                    autoCapitalize = 'none'
                    value={cnic}
                    onChangeText={(text) => setCnic(text)}/>
                 
                <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() =>{handleSubmit()}}>
                    <Text style={styles.signupButton}>  
                        Submit
                    </Text>
                </TouchableOpacity>
                
                
            </KeyboardAwareScrollView>
        </View>
    );
}

export default ProfileForm;