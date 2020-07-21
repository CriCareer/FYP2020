import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, AsyncStorage, Alert, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/signup';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {DepositAmount, WithdrawAmount, TransferAmount, LoadReceiver, loading, setCricpocketInfo} from '../redux/js/actions/CricpocketActions/CricpocketActions';

function CricpocketCard(props) {
    const [deposited_amount, setDeposited_amount] = useState('');
    const [withdrawal_amount, setWithdrawal_amount] = useState('');
    const [transfered_amount, setTransfered_amount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [findReceiver, setFindReceiver] = useState('');
    

    let dispatch = useDispatch();

    getReceiver = async () => {
        console.log("Receiver called")
        const obj = {
            receiver : receiver
        }
        let res = await dispatch(LoadReceiver(obj));
        if(res.type === 'CRICPOCKET_SUCCESS')
        {
            if(response.data.msg)
            {
              Alert.alert('ALERT', response.data.msg)
            }else{
            console.log(res.data)
            setFindReceiver(res.data)
            Alert.alert('Receiver' , 'Title : '+res.data.title +'\n' + 'Account : '+res.data.account);
            }
        }
    }

    const handleSubmit = async () => {
        try{
            let response;
            if(props.route.params == 'Deposit')
            {   
                let CricPocketObject = {
                    deposited_amount: deposited_amount,
                };
                response = await dispatch(DepositAmount(CricPocketObject))
                if(response.type == 'CRICPOCKET_SUCCESS')
                {
                    if(response.data.msg)
                    {
                    Alert.alert('ALERT', response.data.msg)
                    }
                    else{
                    Alert.alert('Deposit Succesful');
                    props.navigation.navigate('AppLanding');
                    console.log(response)
                    }  
                }
                else
                {
                    Alert.alert('Deposit Failed')
                }   
            }
            else if(props.route.params == 'Withdraw')
            {
                let CricPocketObject = {
                    withdrawal_amount: withdrawal_amount,
                  };
                response = await dispatch(WithdrawAmount(CricPocketObject))
                if(response.type == 'CRICPOCKET_SUCCESS')
                {
                    if(response.data.msg)
                    {
                    Alert.alert('ALERT', response.data.msg)
                    }
                    else{
                    Alert.alert('Withdraw Succesful');
                    props.navigation.navigate('AppLanding');
                    }
                }
                else
                {
                    Alert.alert('Withdraw Failed')
                }   
            }
            else
            {
                let CricPocketObject = {
                    transfered_amount: transfered_amount,
                    receiver: receiver
                  };
                response = await dispatch(TransferAmount(CricPocketObject))
                if(response.type == 'CRICPOCKET_SUCCESS')
                {   
                    if(response.data.msg)
                    {
                    Alert.alert('ALERT', response.data.msg)
                    }
                    else{
                    Alert.alert('Transfer Succesful');
                    props.navigation.navigate('AppLanding');
                    }
                }
                else
                {
                    Alert.alert('Transfer Failed')
                }   
            } 
        }
        catch (err){
            console.log({error: err});
        }
    }   

    return (
        <View style={styles.container}>
            {props.route && props.route.params === 'Deposit'
            ?<KeyboardAvoidingView behavior="position" style={styles.container}>
                <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', marginLeft: 90}}>CRICPOCKET TRANSACTION</Text>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Amount to Deposit" 
                    placeholderTextColor="white"
                    value={deposited_amount}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setDeposited_amount(text)}/>
                <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() =>{handleSubmit()}}>
                    <Text style={styles.signupButton}>  
                        {props.route.params}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            : props.route && props.route.params === 'Withdraw'
            ?<KeyboardAvoidingView behavior="position" style={styles.container}>
                <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', marginLeft: 90}}>CRICPOCKET TRANSACTION</Text>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Amount to Withdraw" 
                    placeholderTextColor="white"
                    value={withdrawal_amount}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setWithdrawal_amount(text)}/>
                <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() =>{handleSubmit()}}>
                    <Text style={styles.signupButton}>  
                        {props.route.params}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            :<KeyboardAvoidingView behavior="position" style={styles.container}>
                <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', marginLeft: 90}}>CRICPOCKET TRANSACTION</Text>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Amount to Transfer" 
                    placeholderTextColor="white"
                    value={transfered_amount}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setTransfered_amount(text)}/>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Receiver ID" 
                    placeholderTextColor="white"
                    value={receiver}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setReceiver(text)}/>
                <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() =>{getReceiver()}}>
                <Text>  
                    Get Receiver
                </Text>
                </TouchableOpacity>
                <View>
                    {findReceiver && findReceiver 
                    ? <Text style={{fontSize: 20, margin: 20, fontWeight: 'bold'}}>Title: {findReceiver.title} {'\n'} Account: {findReceiver.account}</Text>
                    :<Text></Text>}
                </View>
                <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() =>{handleSubmit()}}>
                    <Text style={styles.signupButton}>  
                        {props.route.params}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            }
        </View>
    );
}

export default CricpocketCard;