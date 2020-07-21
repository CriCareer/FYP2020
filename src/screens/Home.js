import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {Container} from 'native-base'
import AppHeader from './Header';
import {logoutUser, loadUser, error} from '../../redux/js/actions/AuthActions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { LoadProfile } from '../../redux/js/actions/ProfileActions/ProfileActions';
import ProfileForm from '../../components/ProfileForm';
import { SliderBox } from 'react-native-image-slider-box';
import { LoadPlayer, GetAllPlayers } from '../../redux/js/actions/PlayerActions/PlayerActions';
import { GetAllTeams, LoadTeam } from '../../redux/js/actions/TeamActions/TeamActions';
import { GetAllVenues, LoadMyVenues } from '../../redux/js/actions/VenueActions/VenueActions';
import { GetAllMatches, LoadMyMatches } from '../../redux/js/actions/MatchActions/MatchActions';
import { LoadCricpocket } from '../../redux/js/actions/CricpocketActions/CricpocketActions';
import { LoadRequests } from '../../redux/js/actions/RequestActions/RequestActions';


function Home(props) {
  let dispatch = useDispatch();

  let state = {
  images: [         
      "https://wallpapercave.com/wp/wp1862738.jpg",                 
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fb15af11131271.560f340eb3393.jpg",         
      "https://media.gettyimages.com/photos/cricket-batsman-hitting-ball-during-cricket-match-in-stadium-picture-id519665528?s=612x612",
    ] ,

  images2: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLi8Hfhu8UBRkTahLQJXrYFsue340cgk7dZA&usqp=CAU", 
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",  
    ],

  images3 : [
      "https://thumbs.dreamstime.com/b/cricket-ball-grass-helmet-isolated-equipments-white-background-gr-worldcup-cricketworldcup-gale-game-england-please-150033244.jpg",
      "https://swall.teahub.io/photos/small/296-2965763_silhouette-of-young-indian-boys-playing-cricket-wallpapers.jpg"
    ] ,
  images4 : [
      "https://wallpapermemory.com/uploads/642/cricket-wallpaper-hd-1440x900-450857.jpg",
      "https://swall.teahub.io/photos/small/296-2965763_silhouette-of-young-indian-boys-playing-cricket-wallpapers.jpg"
    ] ,
  images5 : [
      "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fjohnarcher%2Ffiles%2F2018%2F06%2FSkyUHDCricket.jpg",
      "https://swall.teahub.io/photos/small/296-2965763_silhouette-of-young-indian-boys-playing-cricket-wallpapers.jpg"
    ] ,
  } 
  

  const user = useSelector(state => state.token.userData.user)
  const venues = useSelector(state => state.token.allVenues);
  let [venueImages, setVenueImages] = useState([]);
  

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => { 
    console.log('Nausherwan')
    fetchData();
  });

    return unsubscribe;
  }, [props.navigation]);

  const fetchData = async () => {
      dispatch(loadUser())
      .then((response) => {
        if (response.type === 'AUTH_SUCCESS') 
        {
          dispatch(LoadProfile())
        }
        if(response.data.user.profile_info === true)
        {
          dispatch(LoadProfile())
        }
        if(response.data.user.player === true)
        {
          dispatch(LoadPlayer())
        }
        if(response.data.user.cricpocket === true)
        {
          dispatch(LoadCricpocket())
        }
        if(response.data.user.role_creation === true)
        {
          if(response.data.user.role === 'Team Manager')
          {
            dispatch(LoadTeam())
          }
          if(response.data.user.role === 'Ground Manager')
          {
            dispatch(LoadMyVenues())
          }
        }
      })
      dispatch(LoadMyMatches());
      dispatch(GetAllPlayers());
      dispatch(GetAllTeams());
      dispatch(GetAllVenues());
      dispatch(LoadRequests());
      dispatch(GetAllMatches());          
};

    return (
        <Container>
            <AppHeader
            isMenu={true}
            OpenMenu={() => {
                props.navigation.toggleDrawer();
            }}
            Screen={"Home"}
            isLogout={true}
            Logout={() => { dispatch(logoutUser())
                props.navigation.navigate('landing');
            }}
            />
            {user && user.profile_info === false
            ? <View style={{flex: 1}}>
                <ProfileForm user= {user} navigation = {props.navigation}/>
            </View> 
            :<View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
              <ScrollView>
              <View style={{flex:0.2, justifyContent:'center', alignItems: 'center'}}>
                <SliderBox
                  images={state.images}
                  sliderBoxHeight={220}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                />
                </View>
                
                <View style={{flex:0.2, justifyContent:'center', alignItems: 'center'}}>
                  <SliderBox
                  images={state.images2}
                  sliderBoxHeight={220}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                />    
                </View>
                <View style={{flex:0.2, justifyContent:'center', alignItems: 'center'}}>
                  <SliderBox
                  images={state.images3}
                  sliderBoxHeight={220}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                />    
                </View>
                <View style={{flex:0.2, justifyContent:'center', alignItems: 'center'}}>
                  <SliderBox
                  images={state.images4}
                  sliderBoxHeight={220}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                />    
                </View>
                <View style={{flex:0.2, justifyContent:'center', alignItems: 'center'}}>
                  <SliderBox
                  images={state.images5}
                  sliderBoxHeight={220}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                />    
                </View>
              </ScrollView>        
            </View>
            
            }
 
        </Container>
    );
}

export default Home;