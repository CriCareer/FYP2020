import React from 'react';
import { View, Text } from 'react-native';
import {Container} from 'native-base'
import { useDispatch } from 'react-redux';
import { DataTable } from 'react-native-paper';
import {data} from '../utilities/data';

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

            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center', marginTop:100 }}>
                <DataTable style={{height: 50, width: 400,}}>
                    <DataTable.Header style={{backgroundColor: "#507E14",}}>
                    <DataTable.Title >Bowler</DataTable.Title>
                    <DataTable.Title numeric>Overs</DataTable.Title>
                    <DataTable.Title numeric>Runs</DataTable.Title>
                    <DataTable.Title numeric>Wickets</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row style={{}}>
                        <DataTable.Cell >Ali</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team2_players[1].b_overs}.{data.team2_players[1].b_balls}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[1].runs}</DataTable.Cell>
                        <DataTable.Cell numeric>{data.team1_players[1].wickets}</DataTable.Cell>
                        <DataTable.Cell numeric></DataTable.Cell>
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