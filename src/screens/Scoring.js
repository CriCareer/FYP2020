import React, { useState, createRef, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import {Container} from 'native-base'
import AppHeader from './Header';
import {logout} from '../../redux/js/actions/AuthActions/AuthActions';
import { useDispatch } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import {data} from '../utilities/data'; 

function Scoring(props) {

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => { 
        console.log('Nausherwan')
      });

    const nextInnings = () => {
        
    }

    
        return unsubscribe;
      }, [props.navigation]);

    const match = data;

    console.log({Params: props})
    let team1 = match.team1_s , team2= match.team2_s;
    let  [score, setScore] = useState(0),
        [wickets, setWickets] = useState(0),
        [balls, setBalls] = useState(0),
        [overs, setOvers] = useState(0),
        [overBalls, setOverBalls] = useState(0),
        [bat1, setBat1] = useState(match.team1_players[0].name),
        [bat2, setBat2] = useState(match.team1_players[1].name),
        [ScoreBat1, SetScoreBat1] = useState(0),
        [ballsBat1, SetBallsBat1] = useState(0),
        [ballsBat2, SetBallsBat2] = useState(0),
        [ScoreBat2, SetScoreBat2] = useState(0),
        [foursBat1, SetFoursBat1] = useState(0),
        [foursBat2, SetFoursBat2] = useState(0),
        [sixesBat1, SetSixesBat1] = useState(0),
        [sixesBat2, SetSixesBat2] = useState(0),
        [rateBat1, SetRateBat1] = useState(0),
        [rateBat2, SetRateBat2] = useState(0),
        [strike, setStrike] = useState(bat1),
        [extras, setExtras] = useState([]),
        [scorepad, setScorepad] = useState([]),
        [current_rr, setCurrent_rr] = useState(0.0),
        [bowler, setBowler] = useState(match.team2_players[0].name),
        [overBowler, setOverBowler] = useState(0),
        [scoreBowler, setScoreBowler] = useState(0),
        [wicketBowler, setWicketBowler] = useState(0),
        [ecBowler, setEcBowler] = useState(0),
        [bat1Index, setBat1Index] = useState(0),
        [bat2Index, setBat2Index] = useState(1),
        [bowlerIndex, setBowlerIndex] = useState(1),
        [win1Ratio, setWin1Ratio] = useState(match.team1.win_ratio),
        [win2Ratio, setWin2Ratio] = useState(match.team2.win_ratio);


    const setRatio = () => {
        if(overs === 0 && score === 0)
        {
            let w1 = win1Ratio*100;
            let w2 = win2Ratio*100;
            let constant = ((w1+w2)-100)/2;
            w1 = (w1 - constant).toFixed(2);
            w2 = (w2 - constant).toFixed(2);
            setWin1Ratio(w1);
            setWin2Ratio(w2);
        }
        else
        {
            if(wickets< 1)
            {
                let standard_bat = ((score/overBalls)*1.5);
                let standard_bal = ((overBalls/score)*1.8);
                let w1 = (win1Ratio/100)+standard_bat;
                let w2 = (win2Ratio/100)+standard_bal;
                let constant = ((w1+w2)-100)/2;
                w1 = (w1 - constant).toFixed(1);
                w2 = (w2 - constant).toFixed(1);
                setWin1Ratio(w1);
                setWin2Ratio(w2);
            }
            else{
                let standard_bat = ((score/overBalls)*0.9)-((wickets/overs)*1.1);
                let standard_bal = ((score/overBalls)*1.6)+((wickets/overs)*0.7);
                let w1 = (win1Ratio/100)+standard_bat;
                let w2 = (win2Ratio/100)+standard_bal;
                let constant = ((w1+w2)-100)/2;
                w1 = (w1 - constant).toFixed(1);
                w2 = (w2 - constant).toFixed(1);
                setWin1Ratio(w1);
                setWin2Ratio(w2);
            }    
        }   
    }

    const changeStrike = () => {
        console.log({ORIGINALSTRIKE: strike});
        if(strike === bat1)
        {
            setStrike(bat2);
        }
        else{
            setStrike(bat1);
            
        }
    }

    const changeBatStats = (value) => {
        if(strike === bat1)
            {
                let newballsBat1 = ballsBat1 + 1;
                let newScoreBat1 = ScoreBat1 + value;
                SetScoreBat1(newScoreBat1);
                SetBallsBat1(newballsBat1);
                if(value % 2 != 0)
                {
                    changeStrike();
                }
                if(value === 4)
                {
                    let newfoursBat1 = foursBat1 + 1;
                    SetFoursBat1(newfoursBat1);
                }
                if(value === 6)
                {
                    let newsixesBat1 = sixesBat1 + 1;
                    SetSixesBat1(newsixesBat1);
                }
            }
            else{
                let newballsBat2 = ballsBat2 + 1;
                let newScoreBat2 = ScoreBat2 + value;
                SetScoreBat2(newScoreBat2);
                SetBallsBat2(newballsBat2);
                if(value % 2 != 0)
                {
                    changeStrike();
                }
                if(value === 4)
                {
                    let newfoursBat2 = foursBat2 + 1;
                    SetFoursBat2(newfoursBat2);
                }
                if(value === 6)
                {
                    let newsixesBat2 = sixesBat2 + 1;
                    SetSixesBat2(newsixesBat2);
                }
            }
    }

    const handleScore = (value) => 
    {
        if(overs === 5)
        {
            Alert.alert('Innings Finished');
            let obj = {
                team: match.team1,
                score: score,
                overs: overs,
                wickets: wickets,
            }
            props.navigation.navigate('Scorecard', {data: obj} );
            nextInnings();
        }

        else   
        {
        if(value.includes('wd'))
        {
        setExtras(extras => [...extras, value])
        let newvalue = Number(value.slice(0,0)+1);
        let newScore= score+newvalue;
        setScore(newScore);
        let scoreObject = {
            over: overs,
            ball: overBalls,
            value: value,
            status: 1
        };
        setScorepad(scorepad => [...scorepad, {scoreObject}])


            let run_rate;
            if(score === 0 && balls === 0)
            {
                run_rate=0.0;
                setCurrent_rr(run_rate)
            }
            else{
                run_rate = (newScore/(balls/6)).toFixed(2);
                setCurrent_rr(run_rate)
            }
        }
        else if(value.includes('lb'))
        {
            setExtras(extras => [...extras, value])
            let newvalue = Number(value.slice(0,0)+1);
            let newScore= score+newvalue;
            setScore(newScore);
            changeStrike();
            let scoreObject = {
            over: overs,
            ball: overBalls,
            value: value,
            status: 0
        };
        setScorepad(scorepad => [...scorepad, {scoreObject}])

        let run_rate = (newScore/(balls/6)).toFixed(2);
            let newrate1 = ((ScoreBat1/ballsBat1)*100).toFixed(2)
            let newrate2 = ((ScoreBat2/ballsBat2)*100).toFixed(2)
            setCurrent_rr(run_rate)
            SetRateBat1(newrate1)
            SetRateBat2(newrate2)

            let newscbal = scoreBowler + newvalue;
            setScoreBowler(newscbal);
            let new_ec = (newscbal/overBalls).toFixed(2);
            setEcBowler(new_ec)
            
        }
        else if(value.includes('b'))
        {
            setExtras(extras => [...extras, value])
            let newvalue = Number(value.slice(0,0)+1);
            let newScore= score+newvalue;
            changeStrike();
            setScore(newScore);
            let scoreObject = {
            over: overs,
            ball: overBalls,
            value: value,
            status: 0
        };
        setScorepad(scorepad => [...scorepad, {scoreObject}])

        let run_rate = (newScore/(balls/6)).toFixed(2);
            let newrate1 = ((ScoreBat1/ballsBat1)*100).toFixed(2)
            let newrate2 = ((ScoreBat2/ballsBat2)*100).toFixed(2)
            setCurrent_rr(run_rate)
            SetRateBat1(newrate1)
            SetRateBat2(newrate2)

            let newscbal = scoreBowler + newvalue;
            setScoreBowler(newscbal);
            let new_ec = (newscbal/overBalls).toFixed(2);
            setEcBowler(new_ec)
            
        }
        else if(value.includes('nb'))
        {
            setExtras(extras => [...extras, value])
            let newvalue = Number(value.slice(0,0)+1);
            let newScore= score+newvalue;
            setScore(newScore);
            let scoreObject = {
            over: overs,
            ball: overBalls,
            value: value,
            status: 0
            };

            setScorepad(scorepad => [...scorepad, {scoreObject}])
            
            let run_rate = (newScore/(balls/6)).toFixed(2);
            let newrate1 = ((ScoreBat1/ballsBat1)*100).toFixed(2)
            let newrate2 = ((ScoreBat2/ballsBat2)*100).toFixed(2)
            setCurrent_rr(run_rate)
            SetRateBat1(newrate1)
            SetRateBat2(newrate2)

            let newscbal = scoreBowler + newvalue;
            setScoreBowler(newscbal);
            let new_ec = (newscbal/overBalls).toFixed(2);
            setEcBowler(new_ec)
            
        }
        else if(value === 'undo')
        {
            let i =0; let item;
            while(i != scorepad.length)
            {
                item = scorepad[i].value;
                i++;
            }

            let newvalue = Number(value.slice(0,0)-value);
            let newScore= score-newvalue;
            setScore(newScore);

            let newBalls = balls - 1;
            let newOverBalls = overBalls - 1
            setBalls(newBalls);
            setOverBalls(newOverBalls);

            let newscbal = scoreBowler - value;
            setScoreBowler(newscbal);
            let new_ec = (newscbal/overBalls).toFixed(2);
            setEcBowler(new_ec)
        }
        else if(value.includes('wk'))
        {
            let newWickets = wickets+1;
            setWickets(newWickets);
            let newballwik = wicketBowler+1;
            setWicketBowler(newballwik); 
            let newOvers;
            let newBalls = balls + 1;
            let newOverBalls = overBalls+1;
            if( newOverBalls > 5)
            {
                newOvers = overs + 1;
                setOvers(newOvers);
                newOverBalls = 0;
            }
            console.log("Overs: "+ newOvers +'.'+newOverBalls)
            if(strike === bat1)
            {
                match.team1_players[bat1Index].score = ScoreBat1;
                match.team1_players[bat1Index].ball = ballsBat1;
                match.team1_players[bat1Index].fours = foursBat1;
                match.team1_players[bat1Index].sixes = sixesBat1;
                if(ScoreBat1 > 29 && ScoreBat1<50)
                    match.team1_players[bat1Index].thirties++;
                else if(ScoreBat1 >49 && ScoreBat1 < 100)
                match.team1_players[bat1Index].fifties++;
                else if(ScoreBat1 >100)
                match.team1_players[bat1Index].centuries++;

                match.team2_players[bowlerIndex].b_balls = balls;
                match.team2_players[bowlerIndex].b_score = scoreBowler;
                match.team2_players[bowlerIndex].b_overs = overBowler;
                match.team2_players[bowlerIndex].b_wickets = wicketBowler;
                console.log(match.team1_players[bat1Index])
                setBat1Index(bat1Index+1)

                setBat1(match.team1_players[newWickets+1].name);
                match.team1_players[newWickets -1 ].score = ScoreBat1;
                SetScoreBat1(0);
                SetBallsBat1(0);
                SetFoursBat1(0);
                SetSixesBat1(0);
                SetRateBat1(0);
                setStrike(bat1);
            }
            else
            {
                match.team1_players[bat2Index].score = ScoreBat2;
                match.team1_players[bat2Index].ball = ballsBat2;
                match.team1_players[bat2Index].fours = foursBat2;
                match.team1_players[bat2Index].sixes = sixesBat2;
                if(ScoreBat2 > 29 && ScoreBat2<50)
                    match.team1_players[bat2Index].thirties = thirtiesBat2;
                else if(ScoreBat2 >49 && ScoreBat2 < 100)
                match.team1_players[bat2Index].fifties = fiftiesBat2;
                else if(ScoreBat2 >100)
                match.team1_players[bat2Index].centuries = centuriesBat2;
                console.log(match.team1_players[bat2Index])
                setBat2Index(bat2Index+1)
                setBat2(match.team1_players[newWickets+1].name);
                match.team1_players[newWickets - 0 ].score = ScoreBat2;
                SetScoreBat2(0);
                SetBallsBat2(0);
                SetFoursBat2(0);
                SetSixesBat2(0);
                SetRateBat2(0);
                setStrike(bat2);
            }
            setBalls(newBalls);
            setOverBalls(newOverBalls); 
            let new_ec = (scoreBowler/overBalls).toFixed(2);
            setEcBowler(new_ec);
            let run_rate = (score/(balls/6)).toFixed(2);
            setCurrent_rr(run_rate)
        }
        else
        {
            value = Number(value);
            let newScore= score+value;
            setScore(newScore);

            let newOvers ;
            let newBalls = balls + 1;
            let newOverBalls = overBalls+1;
            let scoreObject = {
                over: overs,
                ball: newOverBalls,
                value: value,
                status: 1
            };

            changeBatStats(value);
            let newrate1 = ((ScoreBat1/ballsBat1)*100).toFixed(2)
            let newrate2 = ((ScoreBat2/ballsBat2)*100).toFixed(2)
            SetRateBat1(newrate1)
            SetRateBat2(newrate2)
            if(ScoreBat1 === 0 )
            {
                newrate1 = 0.0
                SetRateBat1(newrate1);
            }
            if(ScoreBat2 === 0 )
            {
                newrate1 = 0.0
                SetRateBat2(newrate2);
            }
            let newscbal = scoreBowler + value;
            setScoreBowler(newscbal);
           
            setScorepad(scorepad => [...scorepad, {scoreObject}])
            if( newOverBalls > 5)
            {
                newOvers = overs + 1;
                setOvers(newOvers);
                newOverBalls = 0;
                changeStrike();
                setBowler(match.team2_players[2].name)
                setRatio();
            }
            else{
                newOvers = overs + 0;
                setOvers(newOvers);
            }
            console.log("Overs: "+ newOvers +'.'+newOverBalls)
            setBalls(newBalls);
            setOverBalls(newOverBalls);
            let run_rate = (newScore/(balls/6)).toFixed(2);
            setCurrent_rr(run_rate)

            //updating batsman 1 in database
            match.team1_players[bat1Index].score = ScoreBat1;
            match.team1_players[bat1Index].ball = ballsBat1;
            console.log(match.team1_players[0])

            //updating batsman 2 in database
            match.team1_players[bat2Index].score = ScoreBat2;
            match.team1_players[bat2Index].ball = ballsBat2;
            console.log(match.team1_players[0])
            
            //updating batsman 2 in database
            match.team2_players[bowlerIndex].score = ScoreBat2;
            match.team1_players[bowlerIndex].ball = ballsBat2;
            console.log(match.team1_players[0])

            if(newscbal === 0 || overBalls == 0)
            {
                let new_ec = (newscbal/overBalls).toFixed(2);
                setEcBowler(new_ec)
            }
            else{
                let new_ec = (newscbal/overBalls).toFixed(2);
                console.log(new_ec)
                setEcBowler(new_ec)
            }
            setScoreBowler(scoreBowler);
            
        }
    }  
    };


    let dispatch = useDispatch();
    return (
        <Container>
        {/* <AppHeader
          isMenu={true}
          OpenMenu={() => {
            props.navigation.toggleDrawer();
          }}
        //   Screen={"Scoring"}
          isLogout={true}
          Logout={() => { dispatch(logout())
            props.navigation.navigate('landing');
          }}
        /> */}
        
        <View style={{ flex:0.08, justifyContent:'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '800', fontSize: 25, color: '#01438D', marginTop: 20}}>SCORING CENTER</Text>
        </View>
        <View style={{flex: 0.15, flexDirection: 'row', borderWidth: 2, borderColor: '#507E14'}}>
            <View style={{flex: 0.3,justifyContent:'center', alignItems: 'center', padding: 20, backgroundColor: '#507E14', }}>
                <Text style={{fontWeight: '800', fontSize: 20, color: 'white', }}>{team1}{'\n'}{score}/{wickets}
                </Text>
                <Text style={{fontWeight: '800', fontSize: 15, color: 'white', marginTop:10 }}>Overs: {overs}.{overBalls}/20</Text>
            </View>
            <View style={{flex: 0.7, backgroundColor: '#01438D', padding: 10, justifyContent:'center'}}>
                <Text style={{fontWeight: '200', fontSize: 15, color: 'white', textAlign:'center'}}>1st Innings{'       '}Toss: {match.toss}</Text>
                <Text style={{fontWeight: '200', fontSize: 15, color: 'white',textAlign:'center'}}>Current R.R : {current_rr}</Text>
                <Text style={{fontWeight: '200', fontSize: 15, color: 'white',textAlign:'center'}}>Extras : {extras.length}</Text>
            </View>
        </View>
        <View style={{flex:0.4,justifyContent:'center', alignItems: 'center', borderWidth: 2,}}>
            <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', margin:0 }}>
                <DataTable style={{height: 180, width: 400,}}>
                    <DataTable.Header style={{backgroundColor: "#507E14",}}>
                    <DataTable.Title >Batsman</DataTable.Title>
                    <DataTable.Title numeric>Runs</DataTable.Title>
                    <DataTable.Title numeric>Balls</DataTable.Title>
                    <DataTable.Title numeric>4's</DataTable.Title>
                    <DataTable.Title numeric>6's</DataTable.Title>
                    <DataTable.Title numeric>S.R</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row style={{}}>
                        <DataTable.Cell >{strike === bat1 && '*'}{bat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{ScoreBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{ballsBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{foursBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{sixesBat1}</DataTable.Cell>
                        <DataTable.Cell numeric>{rateBat1}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={{}}>
                        <DataTable.Cell>{strike === bat2 && '*'}{bat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{ScoreBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{ballsBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{foursBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{sixesBat2}</DataTable.Cell>
                        <DataTable.Cell numeric>{rateBat2}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
            <View style={{flex:0.3,justifyContent: 'center', alignItems: 'center', margin:0}}>
                <DataTable style={{width: 400, height: 140}}>
                    <DataTable.Header style={{backgroundColor: "#507E14",}}>
                    <DataTable.Title >Bowler</DataTable.Title>
                    <DataTable.Title numeric>Overs</DataTable.Title>
                    <DataTable.Title numeric>Runs</DataTable.Title>
                    <DataTable.Title numeric>Wk's</DataTable.Title>
                    <DataTable.Title numeric>E.c</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row style={{}}>
                        <DataTable.Cell numeric>{bowler.slice(0,10)}</DataTable.Cell>
                        <DataTable.Cell numeric>{overBowler}.{overBalls}</DataTable.Cell>
                        <DataTable.Cell numeric>{scoreBowler}</DataTable.Cell>
                        <DataTable.Cell numeric>{wicketBowler}</DataTable.Cell>
                        <DataTable.Cell numeric>{ecBowler}</DataTable.Cell>
                    </DataTable.Row>

                </DataTable>
            </View>
        </View>
        <View style={{flex: 0.08, flexDirection: 'row', borderWidth: 2, borderColor: '#507E14', paddingHorizontal:30}}>
{/*            
            <FlatList
              data={scorepad}
              renderItem={({ item }) => renderOver(item)}
              keyExtractor={item => item.id}
            /> */}
            <ScrollView horizontal={true}>
         <Image source={{uri: match.team1.avatar}} style={{height: 60, width: 70}}/>       
        <Text style={{fontWeight: '800', fontSize: 20, color: '#507E14', margin: 10, textAlign:'center'}}>{'  '}{win1Ratio}{'%    '}</Text>
        <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 10, textAlign:'center'}}> : </Text>
        <Text style={{fontWeight: '800', fontSize: 20, color: '#507E14', margin: 10, textAlign:'center'}}>{'  '}{win2Ratio}{'% '}</Text>
        <Image source={{uri: match.team2.avatar}} style={{height: 50, width: 70}}/> 
            {/* <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[1].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[2].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[3].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[4].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[5].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[6].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[7].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[8].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[9].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[10].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[10].run}</Text>
            <Text style={{fontWeight: '800', fontSize: 25, color: '#507E14', margin: 20, textAlign:'center'}}>{scorepad[10].run}</Text> */}
            </ScrollView>
        </View>
       
        <View style={{flex: 0.45,justifyContent:'center', alignItems: 'center',borderWidth: 2, borderColor: '#507E14', backgroundColor:'#01438D'}}>
            <View style={{flex: 0.25, flexDirection: 'row', alignItems: 'stretch',}}>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}} 
                onPress={() => handleScore('1')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('2')}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize:38}}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('3')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white'}}
                onPress={() => handleScore('4')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>4</Text>
                </TouchableOpacity> 
            </View>

            <View style={{flex: 0.25, flexDirection: 'row', alignItems: 'stretch',}}>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}} 
                onPress={() => handleScore('0lb')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>L</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('0b')}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize:38}}>B</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('wk')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>W</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white'}}
                onPress={() => handleScore('6')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>6</Text>
                </TouchableOpacity> 
            </View>

            <View style={{flex: 0.25, flexDirection: 'row', alignItems: 'stretch',}}>
                {/* <View style={{paddingHorizontal: 30, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}>
                <ModalDropdown options={['0wd', '1wd', '2wd', '3wd', '4wd']} defaultValue={'Wd'}
                textStyle={{color: 'white', fontSize: 30}} style={{width: 50, height: 70, paddingTop: 20}}
                dropdownStyle={{width: 60}} onSelect={(value) => handleScore(value)}
                />
                </View> */}
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('0wd')}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize:38}}>Wd</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('p')}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize:38}}>P</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}}
                onPress={() => handleScore('0nb')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>Nb</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:35, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white'}}
                onPress={() => handleScore('0')}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>0</Text>
                </TouchableOpacity> 
            </View>

            <View style={{flex: 0.25, flexDirection: 'row', alignItems: 'stretch', marginBottom: 10}}>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:75, paddingVertical:20, marginTop:10, borderBottomWidth:1, borderColor: 'white', borderRightWidth:1}} 
                onPress={() => changeStrike()}>
                    <Text style={{textAlign: 'center', color: 'white',fontSize:20}}>change strike</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, paddingHorizontal:75, paddingVertical:10, marginTop:10, borderBottomWidth:1, borderColor: 'white'}}
                onPress={() => handleScore('lb')}>
                    {/* <Text style={{textAlign: 'center', color: 'white',fontSize:38}}>4</Text> */}
                    <Image source={{uri: 'https://cdn2.iconfinder.com/data/icons/toolbar-icons/512/Undo_Arrow-512.png'}}
                    style={{height:42 , width: 35}}/>
                </TouchableOpacity> 
            </View>
            
        </View>
        
        
        </Container>
    );
}

export default Scoring;