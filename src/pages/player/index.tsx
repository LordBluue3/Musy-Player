import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { 
	Background, 
	MusicImage, 
	MusicInformation, 
	NavToSongs, Navbar, 
	PlayerButtons, 
	PlayerIcons, 
	PlayerManager, 
	SettingsButton, 
	Text, 
	Title 
} from './styles'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer, { Event, RepeatMode, State, } from 'react-native-track-player'
import { ProgressBar } from '../../components/player/progress'
import { MusicPlayer } from '../../components/player/music'

interface RootStackParamList {
    Songs: undefined;
    [key: string]: undefined;
}

interface PlayerScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Songs'>
}

export function Player({navigation}: PlayerScreenProps) {
	const [paused, setPaused] = useState<boolean>(true)
	const [repeat, setRepeat] = useState<boolean>(false)

	TrackPlayer.addEventListener(Event.RemotePlay, () => { TrackPlayer.play(); setPaused(false) })
	TrackPlayer.addEventListener(Event.RemotePause, () => { TrackPlayer.pause(); setPaused(true) })
	TrackPlayer.addEventListener(Event.PlaybackState, (track) => {
		if (track) {
			if (track.state.toString() === 'playing') {
				setPaused(false)
			} else {
				setPaused(true)
			}
		}
	})

	async function handlePlayPause() {
		const state = await TrackPlayer.getState()

		if (state === State.Playing) {
			TrackPlayer.pause()
			setPaused(true)
		} else {
			TrackPlayer.play()
			setPaused(false)
		}
	}

	return(
		<Background>
			<Navbar>
				<NavToSongs onPress={() => navigation.navigate('Songs')}>
					<Ionicons color={'#ECECEC'}  name='chevron-down-outline' size={35}/>
				</NavToSongs>
				<Title>Musy Player</Title>
				<SettingsButton>
					<Ionicons color={'#ECECEC'}  name='ellipsis-vertical' size={25}/>
				</SettingsButton>
			</Navbar>

			<MusicInformation>
				<Text>Song</Text>
				<MusicImage>
					<Image style={{maxHeight: 250, maxWidth: 250, borderRadius: 40}} source={require('../../assets/music-icon.png')} />
				</MusicImage>
				<MusicPlayer />
				<PlayerManager>
					<PlayerIcons>
						<TouchableOpacity>
							<Ionicons color={'#ECECEC'} name='volume-medium' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<MaterialCommunityIcons color={'#ECECEC'} name='playlist-play' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons color={'gray'} name='shuffle' size={25} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								setRepeat(!repeat)

								if (repeat) {
									TrackPlayer.setRepeatMode(RepeatMode.Queue)
								} else {
									TrackPlayer.setRepeatMode(RepeatMode.Off)
								}
							}}
						>
							<Ionicons color={repeat ? '#ECECEC' : 'gray'} name='repeat' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons color={'#ECECEC'} name='heart-sharp' size={25} />
						</TouchableOpacity>
					</PlayerIcons>
					<ProgressBar/>
					<PlayerButtons>
						<TouchableOpacity
							onPress={() => TrackPlayer.skipToPrevious()}
						>
							<Ionicons color={'#ECECEC'} name='play-skip-back' size={40} />
						</TouchableOpacity>

						<TouchableOpacity onPress={handlePlayPause}>
							<FontAwesome5 color={'#ECECEC'} name={paused ? 'play' : 'pause'} size={40} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => TrackPlayer.skipToNext()}
						>
							<Ionicons color={'#ECECEC'} name='play-skip-forward' size={40} />
						</TouchableOpacity>
					</PlayerButtons>
				</PlayerManager>
			</MusicInformation>
		</Background>
	)
}