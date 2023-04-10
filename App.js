import React from 'react'
import LoginScreen from './Screens/LoginScreen'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './Redux/store'
import HomeScreen from './Screens/HomeScreen';
import CarreraModeScreen from './Screens/CarreraModeScreen';
import ClassicScreen from './Screens/ClassicScreen';
import { Dimensions } from 'react-native';
import RankingClassic from './Screens/RankingClassic';

const App = () => {

    const Stack = createNativeStackNavigator();
    const options = {
        headerShown: false,
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const boardSize = Math.round(windowWidth - 2)

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='LoginScreen' component={LoginScreen} options={options} />
                    <Stack.Screen name='HomeScreen' component={HomeScreen} options={options} />
                    <Stack.Screen name='CarreraScreen' component={CarreraModeScreen} options={options} initialParams={{ boardSize: boardSize }} />
                    <Stack.Screen name='ClassicScreen' component={ClassicScreen} options={options} initialParams={{ boardSize: boardSize }} />
                    <Stack.Screen name='RankingClassic' component={RankingClassic} options={options} initialParams={{ boardSize: boardSize }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App