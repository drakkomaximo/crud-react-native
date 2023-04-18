/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import {Platform, FlatList, View} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';
import axios from 'axios';
import {Client, dbUrlPcAndroid, dbUrlPcIos} from '../../utils/constants';
import globalStyles from '../../styles/globalStyles';

export type StartProps = {
  navigation: any;
};

const Start: FC<StartProps> = ({navigation}) => {
  const [clients, setclients] = useState<Client[]>([]);
  const [isActiveGetApi, setIsActiveGetApi] = useState(true);

  const toggleFlagApi = () => {
    setIsActiveGetApi(!isActiveGetApi);
  };

  const goToNewClientForm = () => {
    navigation.navigate('newClient', {toggleFlagApi});
  };

  const goToClientDetails = ({item}: {item: Client}) => {
    navigation.navigate('clientDetails', {item, toggleFlagApi});
  };

  useEffect(() => {
    const getClientsApi = async () => {
      try {
        const response = await axios.get(
          Platform.OS === 'android' ? dbUrlPcAndroid : dbUrlPcIos,
        );
        setclients(response.data);
        setIsActiveGetApi(false);
      } catch (error) {
        console.log(error);
      }
    };
    isActiveGetApi && getClientsApi();
  }, [isActiveGetApi]);

  return (
    <View style={globalStyles.container}>
      <Button icon={'plus-circle'} onPress={goToNewClientForm}>
        New Client
      </Button>

      <Headline style={globalStyles.title}>
        {clients.length > 0 ? 'Clients' : 'There are no clients yet'}
      </Headline>
      <FlatList
        data={clients}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description={item.company}
            onPress={() => goToClientDetails({item})}
          />
        )}
      />
      <FAB icon={'plus'} style={globalStyles.fab} onPress={goToNewClientForm} />
    </View>
  );
};

export default Start;
