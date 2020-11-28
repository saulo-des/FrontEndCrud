import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AppList from './AppList';
import AppForm from './AppForm';
 
const {Navigator, Screen} = createBottomTabNavigator();

function AppTab(){
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="AppList"
                tabBarOptions={{
                    style: {                                                
                        elevation: 0,
                        shadowOpacity: 0,
                        height: 55,
                    },
                    tabStyle: {
                     
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    labelStyle: {
                        fontSize: 13,
                        marginLeft: 16
                    },
                    inactiveBackgroundColor: '#fafafc',
                    activeBackgroundColor: '#4682B4',
                    inactiveTintColor: '#c1bccc',
                    activeTintColor: '#fff'
                }}
            >
                <Screen name="AppList" component={AppList}
                    options={{
                        tabBarLabel: "Listar"
                    }}
                />
                <Screen name="AppForm" component={AppForm}
                    options={{
                        tabBarLabel: "Cadastrar"
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppTab;