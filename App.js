import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import HomePage from './screens/HomePage';
import CameraPage from './screens/CameraPage';
import VideoPage from './screens/VideoPage';
import reducer from './store/reducer';

const Stack = createStackNavigator();
const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="CameraPage" component={CameraPage} />
          <Stack.Screen name="VideoPage" component={VideoPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

