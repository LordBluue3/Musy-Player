import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

interface RootStackParamList {
    Songs: undefined;
    [key: string]: undefined;
}

interface PlayerScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Songs'>
}

export function Player({navigation}: PlayerScreenProps) {
	return(
		<View style={{flex: 1, backgroundColor: 'black'}}>
			<TouchableOpacity onPress={() => {
				navigation.navigate('Songs')
			}}>
				<Text>teste</Text>
			</TouchableOpacity>
		</View>
	)
}