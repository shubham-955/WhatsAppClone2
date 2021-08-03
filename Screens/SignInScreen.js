import React, {useState} from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../src/Components/context';

const SignInScreen = () => {

const [data, setData] = useState({
    username:'',
    password:'',
    check_textInputEntry: false,
    secureTextEntry: true
});

const {signIn} = React.useContext(AuthContext);

const textInputChange = (val) => {
     if ( val.length !== 0) {
         setData({
             ...data,
             username: val,
             check_textInputEntry: true,
         });
     } else {
        setData({
            ...data,
            username: val,
            check_textInputEntry: false,
        });
     }
}

const handlePasswordChange = (val) => {
    setData({
        ...data,
        password: val,
    });
}

const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry : !data.secureTextEntry,
    })
}

const loginHandle = (username, password) => {
    signIn(username, password);
}

        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 110, height: 110 }}
                    source={require('../src/img/whatsapplogo.png')}>
                </Image>
                <View style={{ width: 300, height: 60, borderWidth: 0.2, flexDirection: 'row', alignItems: 'center', marginTop: 40, borderColor: 'black', borderRadius: 15 }}>
                    <Feather name="user" size={25} color='black' style={{ paddingLeft: 15 }} />
                    <TextInput
                        style={{ width: 200, height: 45, paddingLeft: 15, fontSize: 15, color: 'black' }}
                        placeholder="Enter username..."
                        autoCapitalize='none'
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputEntry ?
                        <Feather name="check-circle" size={20} color='black' style={{ paddingLeft: 15 }} />
                        : null
                    }
                </View>
                <View style={{ width: 300, height: 60, borderWidth: 0.2, flexDirection: 'row', alignItems: 'center', marginTop: 20, borderColor: 'black', borderRadius: 15 }}>
                    <FontAwesome name="lock" size={25} color='black' style={{ paddingLeft: 22 }} />
                    <TextInput
                        style={{ width: 200, height: 45, paddingLeft: 20, fontSize: 15, color: 'black' }}
                        placeholder="Enter password..."
                        secureTextEntry={data.secureTextEntry ? true : false}
                        autoCapitalize='none'
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                        <Feather name="eye-off" size={20} color='black' style={{ paddingLeft: 15 }} />
                        : 
                        <Feather name="eye" size={20} color='black' style={{ paddingLeft: 15 }} />
                    }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ left: 80, marginTop: 20 }} onPress={()=> {loginHandle(data.username, data.password)}}>
                    <View style={{ width: 100, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#25D366', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Sign In</Text>
                        <Entypo name="chevron-small-right" size={25} color='white' style={{ top: 2 }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    export default SignInScreen;

