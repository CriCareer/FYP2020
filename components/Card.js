import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {InvitePlayer} from '../redux/js/actions/TeamActions/TeamActions'

function Card(props) {
    let user = useSelector(state => state.token.userData.user)

    const handleStart = () => {
        if(props.children.start_status)
        {
            props.flow.navigate('Scoring')
        }
        if(props.children.match_fixed)
        {
            props.flow.navigate('toss', {match: props.children});
        }
        else{
            Alert.alert('No team has joined this match')
        }
        
    }

    let dispatch = useDispatch();
    const handleInvite = async(_id) => {
        let response = await dispatch(InvitePlayer(_id));
        if(response.type === 'TEAM_SUCCESS')
        {
            if(response.data.msg)
            {
                Alert.alert(response.data.msg);
            }
            else{
                Alert.alert(`Invitation sent to ${props.children.name}`)
            }
        }
    }

    return (
        <View style={styles.containerStyle}>
            {props.text && props.text === 'match'
            ?<View style={{width: 300, alignItems: 'center', height: 350, padding: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: props.children.teamA.avatar && props.children.teamA.avatar}} style={{height: 100, width: 100}}/>
                    <Text style={{padding: 5, margin: 10, fontSize: 20}}>VS</Text>
                    <Image source={{uri: props.children.teamB ? props.children.teamB.avatar : "https://png.pngtree.com/png-clipart/20200401/original/pngtree-hand-drawn-stay-tuned-comingsoon-png-image_5339500.jpg"}} 
                    style={{height: 100, width: 100}}/>
                </View>
                <Text style={{color: "#507E14", fontSize: 14 , fontWeight:'500', alignItems: 'center', marginTop: 20}}>ID:  : {props.children._id}</Text>
                <Text style={{color: "#01438D", fontSize: 20, fontWeight:'bold', alignItems: 'center', marginTop: 20}}>Title : {`${props.children.teamA.name} VS ${props.children.teamB ? props.children.teamB.name : '?'}`}</Text>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'500', alignItems: 'center', marginTop: 10}}>Format : {props.children.format}</Text>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'500', alignItems: 'center', marginTop: 10}}>Venue : {props.children.venue && props.children.venue.name}</Text>
                <View style={{marginBottom: 20}}>
                    {console.log({Button : props.children})}
                {(props.button && props.button) && (props.children.start_status) ?
                <TouchableOpacity style={{padding: 10}} onPress = {() => handleStart()}>
                    <Text style={{color: 'white', fontSize: 16, backgroundColor:'#01438D', padding: 10, width: 60}}>{props.button2 && props.button2}</Text>   
                </TouchableOpacity>
                : props.button && props.button &&
                <TouchableOpacity style={{padding: 20}} onPress = {() => handleStart()}>
                    <Text style={{color: 'white', fontSize: 16, backgroundColor:'#01438D', padding: 10, width: 60}}>{props.button && props.button}</Text>   
                </TouchableOpacity>
                } 
                </View>
            </View>
            : props.text && props.text === 'team'
            ?<View style={{width: 300, alignItems: 'center', height: 400}}>
            <Image source={{ isStatic: true, uri: props.children.avatar}} style={{height: 200, width:200, borderRadius: 350, marginBottom:30}}/> 
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', textAlign: 'left'}}>Name : {props.children.name}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', textAlign: 'left'}}>Level : {props.children.level}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', textAlign: 'left'}}>City : {props.children.city}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', textAlign: 'left'}}>Slogan : {props.children.description}</Text>
            </View>
            : props.text && props.text === 'venue'
            ?<View style={{width: 340, alignItems: 'center', justifyContent: 'center' ,height: 400}}>
            <Image source={{ isStatic: true, uri: props.children.avatar}} style={{height: 200, width:200, borderRadius: 350, marginBottom:10}}/> 
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center', textAlign: 'left'}}>Name : {props.children.name}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center', textAlign: 'left'}}>Match Fee :   {props.children.fee} Rs</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center', textAlign: 'left'}}>City :   {props.children.city}</Text>
            </View>
            :
            <View style={{width: 300, alignItems: 'center', justifyContent: 'center', height: 400}}>
            <Image source={{ isStatic: true, uri: props.children.avatar}} style={{height: 200, width:200, borderRadius: 350, marginBottom:10}}/> 
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>{props.children.name}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Rank : {props.children.ranking}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>{props.children.player_type}</Text>
            {props.children.player_type === 'Batsman'
            ?<View>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Batting : {props.children.batting_style}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Style : {props.children.batting_technique}</Text>
            </View>
            :props.children.player_type === 'Bowler'
            ?<Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Bowling : {props.children.batting_style}</Text>
            :<View>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Batting :       {props.children.batting_style}</Text>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Style:            {props.children.batting_technique}</Text>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Bowling :      {props.children.bowling_style}</Text>
            </View>
            }
          </View>}
            {props.button && props.button === 'Invite' && user && user.role === 'Team Manager' ?
                <View>
                    { (props.button && props.button) &&
                    <TouchableOpacity style={{padding: 20}} onPress = {() => handleInvite(props.children._id)}>
                    
                        <Text style={{color: 'white', fontSize: 16, backgroundColor:'#01438D', padding: 10, width: 60}}>{props.button && props.button}</Text> 
                    
                    </TouchableOpacity>
                    }
                </View>
            : props.button && props.button === 'Join' && (user && user.role === 'Team Manager' || user && user.role === 'Player')
            ?<View>
                {props.button && props.button &&
                <TouchableOpacity style={{padding: 20}} onPress = {() => Alert.alert("Request sent to " + props.children.name)}>
                    <Text style={{color: 'white', fontSize: 16, backgroundColor:'#01438D', padding: 10, width: 60}}>{props.button && props.button}</Text> 
                </TouchableOpacity>    
                } 
            </View>
            :<View style={{marginBottom: 10}}></View>
            }
               
            
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
        alignItems: 'center',
        borderWidth:2,
        borderRadius:2,
        // backgroundColor: "#507E14",
        // shadowColor:'#000',
        borderColor:"#507E14",
        // shadowOffset:{width:0,height:2},
        // elevation:2,
        marginLeft:5,
        marginRight:5,
        margin: 10,
        padding: 10,
        // height: 500
    }
})
export default Card;