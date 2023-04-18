/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {View, Alert, Platform} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';
import axios from 'axios';
import {dbUrlPcAndroid, dbUrlPcIos} from '../../utils/constants';

export type ClientDetailsProps = {
  navigation: any;
  route: any;
};

const ClientDetails: FC<ClientDetailsProps> = ({navigation, route}) => {
  const {name, phone, email, company, id} = route.params.item;
  const { toggleFlagApi } = route.params;
  const deleteClient = async () => {
    const url = Platform.OS === 'android' ? dbUrlPcAndroid : dbUrlPcIos;
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('start');
    toggleFlagApi();
    Alert.alert('Client has been deleted', '');
  };
  const showConfirmation = () => {
    Alert.alert(
      '¿Do you want to delete this client?',
      'This action is permanent',
      [{text: 'Back'}, {text: 'Yes, Delete', onPress: deleteClient}],
    );
  };
  const goToNewClientForm = () => {
    navigation.navigate('newClient', { clientToEdit: route.params.item, toggleFlagApi});
  };
  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{name}</Headline>
      <Text style={styles.text}>
        Company: <Subheading>{company}</Subheading>
      </Text>
      <Text style={styles.text}>
        Email: <Subheading>{email}</Subheading>
      </Text>
      <Text style={styles.text}>
        Phone: <Subheading>{phone}</Subheading>
      </Text>

      <Button
        mode="contained"
        icon={'cancel'}
        style={styles.btnDelete}
        onPress={showConfirmation}>
        Delete Client
      </Button>

      <FAB icon={'pencil'} style={globalStyles.fab} onPress={goToNewClientForm} />
    </View>
  );
};

export default ClientDetails;
