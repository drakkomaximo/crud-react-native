/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import MIcon from 'react-native-vector-icons/FontAwesome5';

export type UpperBarProps = {
  navigation: any;
  route: any;
};

const UpperBar: FC<UpperBarProps> = ({navigation, route}) => {
  const handlePress = () => {
    navigation.push('newClient')
  };
  return (
    <MIcon.Button name="plus-circle" size={15} color="#FFF" onPress={handlePress}>
      Client
    </MIcon.Button>
  );
};

export default UpperBar;
