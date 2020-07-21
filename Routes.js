import React, { useEffect, useState, useReducer } from 'react';
import {Text, DeviceEventEmitter, Alert} from 'react-native'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loader from './src/screens/Loader';
import Landing from './src/screens/Landing';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import MyProfile from './src/screens/MyProfile';
import MyPlayer from './src/screens/MyPlayer';
import PlayerSection from './src/screens/PlayerSection';
import TeamSection from './src/screens/TeamSection';
import TournamentSection from './src/screens/TournamentSection';
import MatchSection from './src/screens/MatchSection';
import VenueSection from './src/screens/VenueSection';
import CricPocket from './src/screens/CricPocket';
import CricpocketCard from './components/CricpocketCard';
import ProfileForm from './components/ProfileForm';
import TeamSquad from './components/TeamSquad';
import Scoring from './src/screens/Scoring';
import MyTeam from './src/screens/MyTeam';
import MyVenues from './src/screens/MyVenues';
import VenueForm from './components/VenueForm';
import AddPlayer from './components/AddPlayer';
import ScoreCard from './src/screens/ScoreCard';
import Requests from './src/screens/Requests';
import { useDispatch, useSelector } from 'react-redux';
import MyTournaments from './src/screens/MyTournaments';
import MyMatches from './src/screens/MyMatches';
import MatchForm from './components/MatchForm';
import JoinMatchForm from './components/JoinMatchForm';
import Toss from './components/Toss';
import TournamentForm from './components/TournamentForm';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();



function Tabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Home: 'home',
          Profile: 'account',
        };
  
        return (
          <MaterialCommunityIcons
            name={icons[route.name]}
            color={color}
            size={size}
          />
        );
      },
    })}>
      <Tab.Screen name="Scoring" component={Scoring} />
      <Tab.Screen name="Scorecard" component={ScoreCard} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => Alert.alert('Settings displayed')}
      />
    </DrawerContentScrollView>
  );
}

function AppStack() {

  let state = useSelector(state => state.token.userData && state.token.userData.user )

  return(
    <Drawer.Navigator backBehavior= 'history' drawerType='front' hideStatusBar = 'true' statusBarAnimation='fade'
      drawerStyle={{ backgroundColor: 'white', width: 240}} 
      initialRouteName="Home">
      {console.log({StartState: state})}
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
      <Drawer.Screen name="MyPlayer" component={MyPlayer} />
      {(state && state.role === 'Team Manager') || (state && state.role === 'Player') ?
      <Drawer.Screen name="MyTeam" component={MyTeam} />
      : state && state.role === 'Ground Manager' ?
      <Drawer.Screen name="MyVenues" component={MyVenues} />
      : state && state.role === 'Organizer' &&
      <Drawer.Screen name="MyTournaments" component={MyTournaments} />
      }
      <Drawer.Screen name="My CricPocket" component={CricPocket} />
      <Drawer.Screen name="Players" component={PlayerSection} />
      <Drawer.Screen name="Teams" component={TeamSection} />
      <Drawer.Screen name="Tournaments" component={TournamentSection} />
      <Drawer.Screen name="Matches" component={MatchSection} />
      <Drawer.Screen name="Venues" component={VenueSection} />
      {/* <Drawer.Screen name="Umpires" component={CricPocket} /> */}
      {/* <Drawer.Screen name="Toss" component={Toss} /> */}
      <Drawer.Screen name="Requests" component={Requests} />
      {/* <Drawer.Screen name="Scoring" component={Tabs} /> */}
    </Drawer.Navigator>
  )
}

export default function Routes() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="AuthLoading">
        <Stack.Screen name="AuthLoading" component={Loader} />
        <Stack.Screen options={{title : "CriCareer"}} name="landing" component={Landing} />
        <Stack.Screen
          options={{headerShown: true}}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen options={{headerShown: true}} name="Login" component={Login} />
        <Stack.Screen options={{title : "Back"}} name="AppLanding" component={AppStack}/>
        <Stack.Screen name="dashboard" component={AppStack} />
        <Stack.Screen options={{headerShown: true}} name="form" component={ProfileForm} />
        <Stack.Screen options={{headerShown: true}} name="VenueForm" component={VenueForm} />
        <Stack.Screen options={{headerShown: true}} name="TournamentForm" component={TournamentForm} />
        <Stack.Screen options={{headerShown: true}} name="TeamSquad" component={TeamSquad} />
        <Stack.Screen options={{headerShown: true}} name="CricpocketCard" component={CricpocketCard} />
        <Stack.Screen options={{headerShown: true}} name="AddPlayer" component={AddPlayer} />
        <Stack.Screen options={{headerShown: true}} name="MatchForm" component={MatchForm} />
        <Stack.Screen options={{headerShown: true}} name="JoinMatchForm" component={JoinMatchForm} />
        <Stack.Screen options={{headerShown: true, title: 'Team Matches'}} name="MyMatches" component={MyMatches} />
        <Stack.Screen options={{headerShown: true, title: 'Toss'}} name="toss" component={Toss} />
        <Stack.Screen options={{headerShown: true}} name="Scoring" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
