import React, { useState, useEffect } from 'react';
// Import all required component
import {
    PermissionsAndroid,
    Platform,
    Text,
    View,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {
    Menu,
    Fab,
    Icon,
    NativeBaseProvider,
} from "native-base"

import Contacts from 'react-native-contacts';
import ListItem from '../src/Components/ListItem';

import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';

const GetContacts = (props) => {
    let [contacts, setContacts] = useState([]);
    let [action, setAction] = useState({
        show: false
    });


    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then(() => {
                loadContacts();
            }
            );
        } else {
            loadContacts();
        }
    }, []);

    const loadContacts = () => {

        Contacts.getAll()
            .then((contacts, err) => {

                console.log('contacts -> ', contacts);
                if (err === 'denied') {
                    alert('Permission to access contacts was denied');
                    console.warn('Permission to access contacts was denied');
                } else {
                    setContacts(contacts);
                    console.log('contacts', contacts);
                }

            })
            .catch((e) => console.log(e))
    };

    const searchContacts = (value) => {
        if(value == '' || value == null ){
            loadContacts();
        } else{
        const filteredContacts = contacts.filter(
            item => {
                let contactLowercase = (item.givenName + " " + item.familyName).toLowerCase();

                let searchTermLowercase = value.toLowerCase();

                return contactLowercase.indexOf(searchTermLowercase) > -1;
            }
        );
        setContacts(filteredContacts)
    }
    };


    const addNew = () => {
        Contacts.openContactForm({}).then(contact => {
          // Added new contact
          setContacts(({ contacts }) => ({
            contacts: [contact, ...contacts],
            // loading: false 
          }));
        })
      }
      

    return (
        <NativeBaseProvider>
            <View style={{ flex: 1 }}>
                <View>
                    {action.show ?
                        <Animatable.View animation='bounceInRight'>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => setAction({ show: false })}>
                                        <AntDesign name='arrowleft' size={25} color='#075E54' />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TextInput
                                        onChangeText={(value) => {searchContacts(value)}}
                                        placeholder="Search..."
                                        style={styles.searchBar}
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                        </Animatable.View>
                        :
                        <View style={{ backgroundColor: '#075E54', padding: 10, elevation: 5, height: 60, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name='arrowleft' size={25} color='white' />
                                </View>
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 30 }}>
                                <Text style={{ fontSize: 18, color: 'white' }}>Select contact</Text>
                                <Text style={{ fontSize: 14, opacity: 0.7, color: 'white' }}>{contacts.length} contacts</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={() => setAction({ show: !action.show })}>
                                    <View style={{ width: 35, height: 35, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                        <EvilIcons name="search" size={25} color="white" />
                                    </View>
                                </TouchableOpacity>
                                <Menu
                                    style={{ width: 200, height: 208, bottom: 45, right: 3 }}
                                    trigger={(triggerProps) => {
                                        return (
                                            <TouchableOpacity accessibilityLabel="More options menu" {...triggerProps}>
                                                <View style={{ width: 35, alignItems: 'center', justifyContent: 'center', height: 35, backgroundColor: '#075E54', borderRadius: 20 }}>
                                                    <Entypo name="dots-three-vertical" size={18} color="white" />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                >
                                    <Menu.Item style={{ marginBottom: -10 }}>Invite a friend</Menu.Item>
                                    <Menu.Item style={{ marginBottom: -10 }}>Contacts</Menu.Item>
                                    <Menu.Item style={{ marginBottom: -10 }}>Refresh</Menu.Item>
                                    <Menu.Item style={{ marginBottom: 5 }}>Help</Menu.Item>
                                </Menu>
                            </View>
                        </View>

                    }

                </View>
                <FlatList
                    data={contacts}
                    renderItem={(contact) => {
                        {
                            console.log('contact -> ' + JSON.stringify(contact));
                        }
                        return (
                            <TouchableOpacity onPress={()=>onPressContact()}>
                            <ListItem
                                key={contact.item.recordID}
                                item={contact.item}
                            />
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.recordID}
                />
                <TouchableOpacity>
                    <Fab
                        style={{ backgroundColor: '#25D366' }}
                        position="absolute"
                        size="sm"
                        icon={<Icon color="white" as={<Ionicons name="person-add" />} size={6} right={0.9} />}
                        onPress={addNew}
                    />
                </TouchableOpacity>


            </View>
        </NativeBaseProvider>
    )
};

const styles = StyleSheet.create({
    searchBar: {
        fontSize: 17,
        backgroundColor: '#f0eded',
        paddingHorizontal: 30,
        // elevation:5,
        paddingVertical: Platform.OS === 'android' ? undefined : 15,
    },
});

export default GetContacts;
