import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartingScreen from './screens/StartingScreen';
import { KeyboardAvoidingView } from 'react-native';
import NavigateScreen from './screens/NavigateScreen';
import LoadingScreen from './screens/LoadingScreen';
import SignInScreen from './screens/SignInScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
            <Stack.Screen 
              name="Loading" 
              component={LoadingScreen} 
              options={{
                headerShown: false
              }}
              />

              <Stack.Screen 
              name="Start" 
              component={StartingScreen} 
              options={{
                headerShown: false
              }}
              />
              <Stack.Screen 
              name="Signin" 
              component={SignInScreen} 
              options={{
                headerShown: false
              }}
              />
              <Stack.Screen
                name="Navigate"
                component={NavigateScreen}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}