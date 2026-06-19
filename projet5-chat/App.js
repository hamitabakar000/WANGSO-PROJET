// /MonChatApp/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ConversationsListScreen from './screens/ConversationsListScreen';
import ChatScreen from './screens/ChatScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // L'enveloppement avec GestureHandlerRootView est requis pour que PinchGestureHandler fonctionne
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ConversationsList"
          screenOptions={{
            headerStyle: { backgroundColor: '#0D0D0D' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { color: '#FFFFFF' },
            cardStyle: { backgroundColor: '#0D0D0D' },
          }}
        >
          <Stack.Screen
            name="ConversationsList"
            component={ConversationsListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetailScreen}
            options={{ title: "Détail de l'article" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
