import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DeleteVenue } from '../redux/js/actions/VenueActions/VenueActions';

function VenueCard(props) {

    return (
        <View style={styles.containerStyle}>
            <Image source={{uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/427/012/small/Cricket_Stadium_Vector.jpg'}} style={{height: 200, width:200, borderRadius: 350, marginBottom:10}}/>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Name : {props.children.name}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>City : {props.children.fee}</Text>
            <Text style={{color: "#507E14", fontSize: 20, fontWeight:'bold', alignItems: 'center'}}>Fee : {props.children.city}</Text>
            <TouchableOpacity style={{padding: 20}} onPress = {() => DeleteVenue()}>
       
                <Text style={{color: 'white', fontSize: 16, backgroundColor:'#01438D', padding: 10, width: 80, textAlign:'center'}}>Delete</Text> 
                
            </TouchableOpacity>
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
        // marginLeft:20,
        // marginRight:5,
        margin: 20,
        padding: 10,
        height: 300
    }
})
export default VenueCard;