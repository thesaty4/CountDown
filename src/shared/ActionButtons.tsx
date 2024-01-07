import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageSourcePropType,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export interface ActionItems {
  id: string | number;
  icon: ImageSourcePropType;
  redirectTo?: never;
}

export interface ActionButtonProps {
  items: ActionItems[];
  onClick?: (item: ActionItems) => void;
}

const ActionButtons: React.FC<ActionButtonProps> = ({items, onClick}) => {
  const navigator = useNavigation();

  return (
    <View style={[actionButtonStyles.mainAction]}>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            id={item.id.toString()}
            style={[
              actionButtonStyles.button,
              actionButtonStyles.actionWrapper,
              ,
            ]}
            onPress={() => {
              onClick && onClick(item);
              item?.redirectTo && navigator.navigate(item.redirectTo);
            }}>
            <Image source={item.icon} style={actionButtonStyles.icon}></Image>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ActionButtons;

export const actionButtonStyles = StyleSheet.create({
  mainAction: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 50,
    gap: 60,
    padding: 15,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
  },

  actionWrapper: {
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    // elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  button: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 50,
    // elevation: 10,
  },
});
