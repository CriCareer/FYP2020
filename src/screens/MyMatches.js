import React from 'react';
import { View, Text } from 'react-native';
import {Container} from 'native-base'
import AppHeader from './Header';
import {logoutUser} from '../../redux/js/actions/AuthActions/AuthActions';
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../../components/Card';

function MyMatches(props) {

  const matches = useSelector(state => state.token.myMatches)
  
  let dispatch = useDispatch();
    return (
        <Container>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', marginTop: 20}}>MATCHES</Text>
        </View>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          {console.log({MatchesState: matches})}
            <FlatList
              data={matches}
              renderItem={({ item }) => <Card children={item} text={'match'} button={'Start'} button2={'Continue'} flow={props.navigation}/>}
              keyExtractor={item => item._id}
            />
          </View>
        </Container>
    );
}

export default MyMatches;