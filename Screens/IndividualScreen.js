import React, { useState } from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../src/Components/Header'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get("window");

function IndividualScreen(props) {
  console.log('IndividualProps....', props)
  const [data, setData] = useState({
    inputText: '',
    check_textInputChange: false
  });

  const textInputChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        inputText: value,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        inputText: value,
        check_textInputChange: false
      });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Header
          allProps={props}
          title={props.route.params.item.companyName}
          title1={props.route.params.item.image}
        />
      </View>

      <ImageBackground source={{ uri: props.route.params.item.Background }} style={{ flex: 1, opacity: 0.8 }} resizeMode='cover'>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          {/* this is the chat container */}
          {/* <Text>{data.inputText}</Text> */}

        </View>

        <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', marginBottom: 5 }}>

          <View style={{ flex: 1, height: 45, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginLeft: 5, borderRadius: 30 }}>

            <View style={{ height: 45, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <TouchableOpacity onPress={() => alert('For Emoji Section')}>
                <View style={{width:30, height:30, borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                <Fontisto name='smiley' size={25} color='grey' />
                </View>
              </TouchableOpacity>
              {data.check_textInputChange ?
                <TextInput
                  style={{ width: 195, height: 45, paddingLeft: 10, fontSize: 18, color: 'black' }}
                  placeholder="Type a message"
                  multiline={true}
                  onChangeText={(value) => textInputChange(value)}
                />
                :
                <TextInput
                  style={{ width: 150, height: 45, paddingLeft: 10, fontSize: 18, color: 'black' }}
                  placeholder="Type a message"
                  multiline={true}
                  onChangeText={(value) => textInputChange(value)}
                />
              }
            </View>

            <View style={{ width: 85,  height: 45, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 10 }}>
              {data.check_textInputChange ?
                <View style={{width:30}}>
                  <TouchableOpacity onPress={() => alert('For Attachments')}>
                  <View style={{width:30, height:30, borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                    <Entypo name='attachment' size={21} color='grey' />
                    </View>
                  </TouchableOpacity>
                </View>
                :
                <>
                  <TouchableOpacity onPress={() => alert('For Attachments')}>
                  <View style={{width:30, height:30, borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                    <Entypo name='attachment' size={21} color='grey' />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => alert('For Camera options')}>
                  <View style={{width:30, height:30, borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                    <Entypo name="camera" size={21} color="grey" />
                    </View>
                  </TouchableOpacity>
                </>
              }
            </View>

          </View>
          <TouchableOpacity onPress={() => alert('For Recorder')}>
            <View style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: '#075E54', borderRadius: 50, marginHorizontal: 5 }}>
              {data.check_textInputChange ?
                <Ionicons name="md-send-sharp" size={20} color="white" style={{ left: 3 }} />
                :
                <FontAwesome name="microphone" size={20} color="white" />
              }
            </View>
          </TouchableOpacity>

        </View>
      </ImageBackground>

    </View>
  )
};

export default IndividualScreen;