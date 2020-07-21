import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, Picker, Alert, Image} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { styles } from '../styles/signup';
import { useSelector, useDispatch } from 'react-redux';
import { FindPlayer } from '../redux/js/actions/PlayerActions/PlayerActions';
import Header from '../src/screens/Header'
import { StartMatch } from '../redux/js/actions/MatchActions/MatchActions';

function Toss(props) {
const {match} = props.route.params;
console.log(match);

let teamA = match.teamA ; let teamB= match.teamB

let [todecide, setTodecide] = useState('')
let [winner, setWinner] = useState('')
let [decision, setDecision] = useState('')

let dispatch = useDispatch();


useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => { 
    console.log('Nausherwan')
    toSelect(teamA.name, teamB.name);
  });

    return unsubscribe;
  }, [props.navigation]);

const toss = (team, choice) => {
    let result = ''; let i = 0, coin ;
    while(i != 500000)
    {
        coin = Math.floor((Math.random() * 2) + 1);
        i++;
    }
    if(team === teamA.name)
    {
        if(coin === choice)
        {
           result = teamA;
        }
        else
        {
            result = teamB;
        }
    }
    else 
    {
        if(coin === choice)
        {
           result = teamB;
        }
        else
        {
            result = teamA;
        }
    }
    console.log({toss_winner: result})
    setWinner(result);
    return result;
}

const toSelect = (teamA, teamB) => {
    let result = ''; let i = 0, coin ;
    while(i != 500000)
    {
        coin = Math.floor((Math.random() * 2) + 1);
        i++;
    }

    if(coin === 1)
    {
        result = teamA;
    }
    else
    {
        result = teamB;
    }
    setTodecide(result);
    return result;
}

    const handleSubmit = async () => {
        if(decision === '')
        {
            Alert.alert('Match Start error','Desion has not been taken yet')
        }
        else {
            let obj = {
                match_id: match._id,
                toss: winner._id
            }
            // let response = await dispatch(StartMatch(obj));
            // if(response.type === 'MATCH_SUCCESS')
            // // {
            //     if(response.data.msg)
            //     {
            //         Alert.alert(response.data.msg);
            //     }
                props.navigation.navigate('Scoring', {toss: obj})
            // // }
            // else{
            //     Alert.alert('Something Wrong')
            // }
        }
}  

const decide = (value) => {
    setDecision(value);
    Alert.alert('Toss', `${winner.name} have won the toss & decided to ${value}`)
}

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', textAlign: 'center', marginTop: 40}}>Toss</Text>
                
                <Text style={{fontSize: 20, fontWeight: '600', marginTop: 50, marginBottom: 20,color: '#01438D',textAlign:'center'}}>{`${teamA.name}   VS   ${teamB.name}`}</Text>
                <Text style={{fontSize: 20, fontWeight: '600', marginTop: 20, marginBottom: 20,textAlign:'center'}}>{todecide} to Chose the Coin</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 30}} onPress = {() =>{toss(todecide.teamA, 1)}}>
                    
                    {console.log({ToDecide : todecide})}
                    <Image source={require('../images/heads.png')} style={{height: 120, width: 120}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() =>{toss(todecide.teamB, 2)}}>
                    
                    <Image source={require('../images/tails.png')} style={{height: 120, width: 120}}/>
                    </TouchableOpacity>
                </View>
                {(winner.name === teamA.name ||  winner.name === teamB.name) && 
                <View>
                    <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', textAlign: 'center', marginTop: 20}}>Result</Text>  
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Image source={{uri: winner.avatar}} style={{height: 200, width: 200}}/>
                    {/* <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10,textAlign:'center'}}>Congratulations !!!</Text> */}
                    <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10,textAlign:'center'}}>{winner.name} won the Toss</Text>
                </View> 
                   
                <View>
                <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', textAlign: 'center', marginTop: 40}}>Decision</Text>
                <Text style={{fontSize: 20, marginTop: 50, marginBottom: 10,textAlign:'center'}}>{winner.name}'s Decision</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        {console.log({Winner: winner})}
                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 10}} 
                        onPress = {() => decide('bat')}>
                        <Text style={styles.signupButton}>  
                            Bat
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} 
                        onPress = {() => decide('bowl')}>
                        <Text style={styles.signupButton}>  
                            Bowl
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} 
                        onPress = {() => handleSubmit()}>
                        <Text style={styles.signupButton}>  
                            Start
                        </Text>
                        </TouchableOpacity>
                </View> 
                </View>
                }        
            </ScrollView>
        </View>
    );
}

export default Toss;