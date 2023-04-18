import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Start from './src/view/Start';
import NewClient from './src/view/NewClient';
import ClientDetails from './src/view/ClientDetails';
import {theme} from './src/Theme';
import {Provider as PaperPrivider} from 'react-native-paper';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <PaperPrivider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="start"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="start"
            component={Start}
            options={{
              title: 'Start',
            }}
          />
          <Stack.Screen
            name="newClient"
            component={NewClient}
            options={{
              title: 'New Client',
            }}
          />
          <Stack.Screen
            name="clientDetails"
            component={ClientDetails}
            options={{
              title: 'Client Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperPrivider>
  );
}

export default App;
