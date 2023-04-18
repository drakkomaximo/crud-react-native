/* eslint-disable prettier/prettier */
import React, {FC, useState, useEffect} from 'react';
import {View, Platform, Alert} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';
import axios from 'axios';
import {dbUrlPcAndroid, dbUrlPcIos} from '../../utils/constants';

export type NewClientProps = {
  navigation: any;
  route: any;
};

const NewClient: FC<NewClientProps> = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isActiveAlert, setIsActiveAlert] = useState(false);
  const {toggleFlagApi, clientToEdit} = route.params;

  const resetValues = () => {
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
    toggleFlagApi();
  };

  const saveClient = async () => {
    if (name === '' || phone === '' || email === '' || company === '') {
      setIsActiveAlert(true);
      return;
    }

    const newClient = {
      name,
      phone,
      email,
      company,
    };

    try {
      if (clientToEdit) {
        const {id} = clientToEdit;
        await axios.put(
          `${Platform.OS === 'android' ? dbUrlPcAndroid : dbUrlPcIos}/${id}`,
          newClient,
        );
      } else {
        await axios.post(
          Platform.OS === 'android' ? dbUrlPcAndroid : dbUrlPcIos,
          newClient,
        );
      }
      navigation.navigate('start');
      resetValues();
      Alert.alert(`Client has been ${clientToEdit ? 'edited' : 'Created'}`, '');
    } catch (error) {
      console.log(error);
    }
  };

  const closeAlert = () => {
    setIsActiveAlert(false);
  };

  useEffect(() => {
    if (clientToEdit) {
      const {
        name: editedName,
        phone: editedPhone,
        email: editedEmail,
        company: editedCompany,
      } = clientToEdit;
      setName(editedName);
      setPhone(editedPhone);
      setEmail(editedEmail);
      setCompany(editedCompany);
    }
  }, [clientToEdit]);

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>
        {clientToEdit ? 'Edit' : 'Add New'} Client
      </Headline>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Pepito"
        style={styles.input}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="123456789"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Pepito@gmail.com"
        style={styles.input}
      />
      <TextInput
        label="Company"
        value={company}
        onChangeText={setCompany}
        placeholder="PepitoCompany"
        style={styles.input}
      />

      <Button icon="pencil-circle" mode="contained" onPress={saveClient}>
        {clientToEdit ? 'Edit' : 'Save'} Client
      </Button>

      <Portal>
        <Dialog visible={isActiveAlert} onDismiss={closeAlert}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>All fields are required</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeAlert}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NewClient;
