import React, { useEffect, useState } from 'react';
import { View, Text, Image, AsyncStorage, Alert } from 'react-native';
import {Container} from 'native-base'
import AppHeader from './Header';
import {logoutUser, loadUser} from '../../redux/js/actions/AuthActions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import TeamStats from '../../components/TeamStats';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import TeamForm from '../../components/TeamForm'
import { LoadPlayer } from '../../redux/js/actions/PlayerActions/PlayerActions';
import { LoadTeam, GetTeamPlayers } from '../../redux/js/actions/TeamActions/TeamActions';
import { styles } from '../../styles/signup';
import Card from '../../components/Card';

function MyTeam(props) {

    let user = useSelector(state => state.token.userData);
    let profile = useSelector(state => state.token.profile);
    let playerState = useSelector(state => state.token.player);
    let teamState = useSelector(state => state.token.team);
    let [team, setTeam] = useState('');
    let [player, setPlayer] = useState('');
    let [teamPlayers, setTeamPlayers] = useState('');

  let dummy = 
  {
    "t20": {
      'matches' : 20,
      'won' : 12,
      'lost' : 5,
      'no_result' : 3,
    } ,
    "oneday": {
      'matches' : 15,
      'won' : 8,
      'lost' : 5,
      'no_result' : 2,
      } ,
    "test": {
      'matches' : 0,
      'won' : 0,
      'lost' : 0,
      'no_result' : 0,
      }
  }

  
  
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
          // let response1 = await dispatch(LoadPlayer());
          // if (response1.type === 'PLAYER_SUCCESS') {
          //   console.log('Player Loaded')
          //   await setPlayer(response.data.data)
          //   if(!teamState || !teamState.name)
          //   {
          //     let response2 = await dispatch(LoadTeam());
          //     if(response2.type === 'TEAM_SUCCESS')
          //     {
          //       let response3 = await dispatch(GetTeamPlayers())
          //       if(response3.type === 'TEAM_SUCCESS')
          //       {
          //         await setTeamPlayers(response.data.data);
          //       }
          //       // await setPlayer(response.data.data)
          //     }
          //   }
          //   else
          //   {
          //     console.log('Team State exists')
          //   }
          // }
          // else{
          //     console.log('Player loading failed')
          // }
      } catch (error) {
        console.log({catch: error})
      }
  };
    
    fetchData();
  }, []);
  
    
    return (
        <Container style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
               <AppHeader
                  isMenu={true}
                  OpenMenu={() => {
                    props.navigation.toggleDrawer();
                  }}
                  Screen={'Team'}
                  isLogout={true}
                  Logout={() => { dispatch(logoutUser())
                  props.navigation.navigate('landing');
                  }}
                />
                {console.log({TeamState: teamState})}
                {teamState && teamState.name
                ? 
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                  <ScrollView>
                  <View style={{flex: 0.2, justifyContent:'flex-start', alignItems: 'center'}}>
                    <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', marginTop: 20}}>MY TEAM</Text>
                </View>
                <View style={{flex: 0.6, flexDirection: 'row', justifyContent: 'flex-start', justifyContent: 'flex-start'}}>
                    <Image source={{uri:teamState.avatar}} style={{height: 150, width:150, borderRadius:200, borderWidth:2, borderColor: '#507E14'}}/>
                    
                        <Text style={{marginLeft:30, fontSize: 20, fontWeight: '400', color: '#507E14'}}>
                        {'\n'}Name: {teamState && teamState.name}{'\n'}City: {teamState && teamState.city}
                        {'\n'}Manager: {profile.name} {'\n'}Level: {teamState.level} {'\n\n'} ___________
                        </Text>
                    
                </View>
                <View style={{flex: 0.2, justifyContent: 'flex-start', alignItems: 'center', marginTop:50}}>
                  <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', marginTop: 5}}>MATCHES</Text>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 20}}
                    onPress={() => props.navigation.navigate('MatchForm')}>
                      <Text style={styles.signupButton}>
                        + Create
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 20}}
                    onPress={() => props.navigation.navigate('JoinMatchForm')}>
                      <Text style={styles.signupButton}>
                        Join
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 20}} onPress={() => Alert.alert('All matches')}>
                      <Text style={styles.signupButton}>
                        All
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontSize: 30, fontWeight: '400', color: '#507E14'}}>____________________________</Text>
                  <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', marginTop:20}}>SQUAD</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 20}}
                    onPress = {() => {props.navigation.navigate('TeamSquad', {teamPlayers})}}>
                      <Text style={styles.signupButton}>
                        Players
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', padding: 20}} onPress = {() => props.navigation.navigate('AddPlayer')}>
                      <Text style={styles.signupButton}>
                        + Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontSize: 30, fontWeight: '400', color: '#507E14'}}>____________________________</Text>
                  <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', marginTop:20}}>STATS</Text>
                </View>
                <View style={{margin: 10}}>
                  <TeamStats children = {dummy}/>
                </View>
                  </ScrollView>
                </View>
                :
                <View style={{flex:1}}>
                    <TeamForm />
                </View> }

        </Container>
    );
}

export default MyTeam;