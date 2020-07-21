import React from 'react';
import { View, Text } from 'react-native';
import {Container} from 'native-base'
import AppHeader from './Header';
import {logout} from '../../redux/js/actions/AuthActions/AuthActions';
import { color } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../../components/Card';
import { DataTable } from 'react-native-paper';
import {data} from '../utilities/data';
import MatchSection from './MatchSection';

function Scoring(props) {

    let match = {
        'team1' : 'COMSATS',
        'team2' : 'Islamabad Mevericks',
        'toss' : '',
        'batting_1': '',
        'venue' : 'Comsats Cricket ground Islamabad',
        'team1_players' : [
            'Nausherwan Tahir','Sheheryar Arshad','Zahoor Alam','Naeem Khan','Osama Ilyas','Noman Ajaz','Saad Malik',
            'ShahJehan Khan','Burhan Khan','Haseeb Ansari','Ahmed Butt'  
        ],
        'tema2_players' : [
            'Muhammad Sarmad','Rana sarmad','Umer Gujjar','Umer Shikari','Abdul Rafey','Ali Khan','Muhammad Ali',
            'Waqas Shakoor','Zubair Mughal','Zubair Afzal','Kamran Ali' 
        ],
    }


    let team1 = match.team1 , team2= match.team2, toss_win, batting1, batting2;
    let  team1_score = 0,
    team2_score = 0,
    team1_wickets = 0,
    team2_wickets = 0;

    let dispatch = useDispatch();
    return (
        <Container>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', marginTop: 20}}>SCORECARD</Text>
        </View>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
        <View style={{ flex: 0.1, flexDirection: 'row', backgroundColor: '#507E14'}}>
            <Text>

            </Text>
        </View>
        <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center', marginTop:60 }}>
                <DataTable style={{height: 180, width: 400,}}>
                    <DataTable.Header style={{backgroundColor: "#507E14",}}>
                    <DataTable.Title >Batsman</DataTable.Title>
                    <DataTable.Title numeric>Runs</DataTable.Title>
                    <DataTable.Title numeric>Balls</DataTable.Title>
                    <DataTable.Title numeric>4's</DataTable.Title>
                    <DataTable.Title numeric>6's</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row style={{}}>
                        <DataTable.Cell >{data.team1_players[0].name}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[0].score}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[0].balls}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[0].fours}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[0].sixes}</DataTable.Cell>  
                    </DataTable.Row>
                    <DataTable.Row style={{}}>
                        <DataTable.Cell >{data.team1_players[1].name}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[1].score}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[1].balls}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[1].fours}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[1].sixes}</DataTable.Cell>  
                    </DataTable.Row>

                </DataTable>
            </View>
            <View style={{ flex: 0.1, flexDirection: 'row', backgroundColor: '#507E14'}}>
            <Text>

            </Text>
            </View>

            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center', margin:0 }}>
                <DataTable style={{height: 180, width: 400,}}>
                    <DataTable.Header style={{backgroundColor: "#507E14",}}>
                    <DataTable.Title >Bowler</DataTable.Title>
                    <DataTable.Title numeric>Overs</DataTable.Title>
                    <DataTable.Title numeric>Runs</DataTable.Title>
                    <DataTable.Title numeric>Wickets</DataTable.Title>
                    <DataTable.Title numeric>Eco</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row style={{}}>
                        <DataTable.Cell ></DataTable.Cell>
                        <DataTable.Cell numeric>{data.team2_players[1].b_overs}.{data.team2_players[1].b_balls}</DataTable.Cell>
                        <DataTable.Cell numeric>{ballsBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{foursBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{sixesBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{rateBat1}</DataTable.Cell>
                    </DataTable.Row>

                    {/* <DataTable.Row style={{}}>
                        <DataTable.Cell>{strike === bat2 && '*'}{bat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{ScoreBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{ballsBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{foursBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{sixesBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{rateBat2}</DataTable.Cell>
                    </DataTable.Row> */}
                </DataTable>
            </View>
        </View>
        </Container>
    );
}

export default Scoring;