import React, { useEffect } from 'react';
import { View, Text, Alert, Image} from 'react-native';
import {Container} from 'native-base'
import AppHeader from './Header';
import {logoutUser} from '../../redux/js/actions/AuthActions/AuthActions';
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../components/Card';
import { AcceptRequest } from '../../redux/js/actions/PlayerActions/PlayerActions';
import { styles } from '../../styles/signup';
import { LoadRequests } from '../../redux/js/actions/RequestActions/RequestActions';

function Requests(props) {

  let dispatch = useDispatch();

  const requests = useSelector(state => state.token.requests)

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => { 
    dispatch(LoadRequests())
    .then(() => {
      props.navigation.navigate('Requests')
    })
  });

    return unsubscribe;
  }, [props.navigation]);

  const handleAccept = async(_id) => {
    dispatch(AcceptRequest(_id))
    .then((response) => {
      if(response.type === 'PLAYER_SUCCESS')
      {
        if(response.data.msg)
          {
            Alert.alert(response.data.msg);
          }
          Alert.alert('Request Accepted');
          props.navigation.navigate('Requests')
      }
    })
  }

  const handleReject = () => {
    
  }
  
 
    return (
        <Container>
        <AppHeader
          isMenu={true}
          OpenMenu={() => {
            props.navigation.toggleDrawer();
          }}
        //   Screen={"Requests"}
          isLogout={true}
          Logout={() => { dispatch(logoutUser())
            props.navigation.navigate('landing');
          }}
        />
        {console.log(requests)}
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20}}>REQUESTS</Text>
        </View>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
            <FlatList
              data={requests}
              renderItem={({ item }) => 
              <View style={{justifyContent: 'center', alignItems: 'center', width: 350, height: 400, borderWidth: 2, padding: 20}}>
                <Image style={{width: 150, height: 150}}
                source = {{uri : item.sender ? item.sender.avatar : "https://images.vexels.com/media/users/3/140800/isolated/preview/86b482aaf1fec78a3c9c86b242c6ada8-man-profile-avatar-by-vexels.png"}}/>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>{item.title}</Text>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>{item.requested_team.name && item.requested_team.name}</Text>
                <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>{item.sender && item.sender.email}</Text>
                <View style={{flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity style={{justifyContent:'center', alignItems: 'center', marginHorizontal: 20}} onPress = {() =>{handleAccept(item._id)}}>
                      <Text style={styles.signupButton}>  
                          Accept
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress = {() => Alert.alert('Request Rejected')}>
                      <Text style={styles.signupButton}>  
                          Reject
                      </Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            }
              keyExtractor={item => item._id}
            />
          </View>
        </Container>
    );
}

export default Requests;