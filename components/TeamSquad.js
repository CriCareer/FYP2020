import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Content, Left, Thumbnail, Body, Right, Container } from 'native-base';


function TeamSquad(props) {

    useEffect(() => {
    })
    const {teamPlayers} = props.route.params;
    console.log({TamSquadPlayer : teamPlayers})

    return(
            <Container style={{}}>
            <FlatList
              data={teamPlayers}
              renderItem={({ item }) => 
              <Content>
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={{ uri: item.avatar && item.avatar }} />
                    </Left>
                    <Body>
                        {console.log(item.name)}
                        <Text>{item.name}</Text>
                        <Text note>{item.player_type && item.player_type}</Text>
                    </Body>
                    {/* <Right>
                        <Text note></Text>
                    </Right> */}
                  </ListItem>
                </List>
              </Content>
            }
            keyExtractor={item => item._id}
            />  
         </Container>
    )
          
    // return (
    //     <View style={styles.containerStyle}>
    //         <Image source={require('../images/profile.jpg')} style={{height: 200, width:200, borderRadius: 350, marginBottom:10}}/>
    //         <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>ID : {props.children.id}</Text>
    //         <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Name : {props.children.name}</Text>
    //         <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>City : {props.children.address.city}</Text>
    //         <TouchableOpacity style={{padding: 20}} onPress = {() => Alert.alert("Request sent to " + props.children.username)}>
    //             {props.button && props.button ?
    //             <Text style={{color: 'white', fontSize: 16, backgroundColor:'#01438D', padding: 10, width: 60}}>{props.button && props.button}</Text> 
    //             :
    //             <Text></Text>   
    //             }
                
    //         </TouchableOpacity>
    //     </View>
    // );
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
export default TeamSquad;