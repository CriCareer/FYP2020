import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Picker,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../styles/signup';
import {useSelector, useDispatch} from 'react-redux';
import {checkInputs} from '../src/utilities';
import {CreatePlayer} from '../redux/js/actions/PlayerActions/PlayerActions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Switch} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {LoadCricpocket} from '../redux/js/actions/CricpocketActions/CricpocketActions';
import { CreateMatch } from '../redux/js/actions/MatchActions/MatchActions';

function MatchForm(props) {
  let cricpocket = useSelector(state => state.token.cricpocket);
  const venues = useSelector(state => state.token.allVenues);
  console.log('ALL VENUES', venues);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  let currentdate = new Date();
  let min = formatDate(currentdate.toUTCString());
  let nextDate = new Date(currentdate.setDate(currentdate.getDate() + 30));
  let max = formatDate(nextDate.toUTCString());

  const [format, setFormat] = useState('');
  const [overs, setOvers] = useState('');
  const [bid, setBid] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');

  let dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    try {
      let res = dispatch(LoadCricpocket());
      if (res.type === 'CRICPOCKET_SUCCESS') {
        console.log('CricPocket load succesful');
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async () => {
    if (format != 'OneDay' && format === 'T10') {
      setOvers('10');
    }
    if (format != 'OneDay' && format === 'T20') {
      setOvers('20');
    }
    if (format != 'OneDay' && format === 'Test') {
      setOvers('Unlimited');
    }
    
    let check = checkInputs([format, overs, date, venue]);
    let MatchObject = {
      format: format,
      overs: overs,
      venue: venue,
      date: date,
      bid: Number(bid),
    };
    if (check) {
      console.log({BID: Number(bid)});
      console.log({BALANCE: cricpocket.balance});
      if (bid && Number(bid) >= cricpocket.balance) {
        Alert.alert('Not enough Cash');
      } else {
        let response = await dispatch(CreateMatch(MatchObject));
        console.log(response)
        // console.log({CreatematchResponse: response.data.data});
        if (response.type === 'MATCH_SUCCESS') {
          if(response.data.msg)
            {
              Alert.alert('ALERT', response.data.msg);
            }
            else{
              Alert.alert('Match Created');
              props.navigation.navigate('MyTeam');
            }
        } else {
          Alert.alert('Match Failed');
        }
      }
    } else {
      Alert.alert('Incomplete Fields', '', [{text: 'Ok'}]);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView behavior="position" style={{flex: 1}}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 25,
            color: '#01438D',
            marginLeft: 90,
            margin: 30,
          }}>
          MATCH CENTER
        </Text>

        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>
          Create your own match
        </Text>

        <Picker
          style={{
            borderWidth: 1,
            borderRadius: 20,
            margin: 10,
            borderColor: '#507E14',
          }}
          selectedValue={format}
          onValueChange={(itemValue, itemIndex) => setFormat(itemValue)}>
          <Picker.Item label="Select Match Format" value="" />
          <Picker.Item label="T10" value="T10" />
          <Picker.Item label="T20" value="T20" />
          <Picker.Item label="OneDay" value="OneDay" />
          <Picker.Item label="Test" value="Test" />
        </Picker>
        {format === 'OneDay' && (
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="Overs"
              placeholderTextColor="white"
              value={overs}
              autoCapitalize="none"
              onChangeText={text => setOvers(text)}
            />
          </View>
        )}
        <Picker
          selectedValue={venue}
          onValueChange={itemValue => setVenue(itemValue)}>
          <Picker.Item label="Select Venue" value="" />
          {venues.map(location => (
            <Picker.Item label={location.name} value={location._id} />
          ))}
        </Picker>
        <View style={{flexDirection: 'row', padding: 20}}>
          <Text style={{marginRight: 40, fontSize: 20}}>
            Want to earn? Then Make a bid
          </Text>
          <Switch
            trackColor={{false: 'grey', true: '#507E14'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="grey"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {isEnabled && (
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Bid Amount"
              placeholderTextColor="white"
              value={bid}
              autoCapitalize="none"
              onChangeText={text => setBid(text)}
            />
          </View>
        )}
        <View style={{alignItems: 'center', margin: 20}}>
          <DatePicker
            style={{width: 200}}
            mode="date"
            date={date}
            placeholder="Date of Birth"
            format="YYYY-MM-DD"
            minDate={min}
            maxDate={max}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'relative',
                left: 0,
                top: 4,
                marginLeft: 0,
                height: 40,
              },
              dateInput: {
                marginLeft: 0,
              },
            }}
            onDateChange={date => {
              setDate(date);
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={() => {
            handleSubmit();
          }}>
          <Text style={styles.signupButton}>Create</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default MatchForm;
