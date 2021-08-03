// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';

import PropTypes from 'prop-types';
import Avatar from './Avatar';

const getAvatarInitials = (textString) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};


const ListItem = (props) => {
  const shouldComponentUpdate = () => {
    return false;
  };
  const { item, onPress } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=+91${item.phoneNumbers[0].number}`)}>
        <View style={styles.itemContainer}>
          <View style={styles.leftElementContainer}>
            <Avatar
              img={
                item.hasThumbnail ?
                  { uri: item.thumbnailPath } : undefined
              }
              placeholder={getAvatarInitials(
                `${item.givenName} ${item.familyName}`,
              )}
              width={40}
              height={40}
            />
          </View>
          <View style={styles.rightSectionContainer}>
            <View style={styles.mainTitleContainer}>
              <Text
                style={
                  styles.titleStyle
                }>
                {`${item.givenName} ${item.familyName}`}</Text>
              {/* <Text style={styles.titleStyle}>
                    {`${item.phoneNumbers[0].number}`}
                  </Text> */}

            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: "500"
  },
});

export default memo(ListItem);

ListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};