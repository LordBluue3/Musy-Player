import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ArtistText, Background, MusicImage, MusicInformation, MusicPlayingView, NavToSongs, Navbar, PlayerButtons, PlayerIcons, PlayerManager, PlayerProgressBar, PlayerProgressTimer, SettingsButton, Text, Title } from './styles'

import * as Progress from 'react-native-progress'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer, { Event, State, useProgress } from 'react-native-track-player'

interface RootStackParamList {
    Songs: undefined;
    [key: string]: undefined;
}

interface PlayerScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Songs'>
}

interface MusicProps {
	title: string;
	artist: string;
	duration: string;
	position: string;
}

export function Player({navigation}: PlayerScreenProps) {
	const [paused, setPaused] = useState<boolean>(false)
	const [music, setMusic] = useState<MusicProps>()
	const progress = useProgress()

	TrackPlayer.addEventListener(Event.RemotePlay, () => { TrackPlayer.play(); setPaused(false) })
	TrackPlayer.addEventListener(Event.RemotePause, () => { TrackPlayer.pause(); setPaused(true) })

	useEffect(() => {
		setTrack()
	}, [])

	useEffect(() => {
		setMusic((prevMusic) => {
			console.log(prevMusic)
			if (prevMusic) {
				prevMusic.position = `${Math.floor(progress.position / 60)}:${(Math.floor(progress.position) % 60).toString().padStart(2, '0')}`
			}
			return prevMusic
		})
	}, [progress])

	useEffect(() => {
		TrackPlayer.addEventListener(Event.PlaybackTrackChanged, setTrack)
	}, [])

	function setTrack() {
		TrackPlayer.getCurrentTrack().then((track) => {
			TrackPlayer.getTrack(Number(track)).then(async (track) => {
				const title = track?.title ?? ''
				const artist = track?.artist ?? ''
				const durationSeconds = await TrackPlayer.getDuration()
				const positionSeconds = await TrackPlayer.getPosition()

				const duration = `${Math.floor(durationSeconds / 60)}:${(Math.floor(durationSeconds) % 60)}`
				const position = `${Math.floor(positionSeconds / 60)}:${(Math.floor(positionSeconds) % 60).toString().padStart(2, '0')}`

				setMusic({ title: title, artist: artist, duration: duration, position: position })
			})
		})
	}

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
					<Ionicons name='chevron-down-outline' size={35}/>
				</NavToSongs>
				<Title>Musy Player</Title>
				<SettingsButton>
					<Ionicons name='ellipsis-vertical' size={25}/>
				</SettingsButton>
			</Navbar>

			<MusicInformation>
				<Text>Song</Text>
				<MusicImage>
					<Image style={{maxHeight: 250, maxWidth: 250, borderRadius: 40}} source={require('../../assets/music-icon.png')} />
				</MusicImage>
				<MusicPlayingView>
					<Title>{music?.title}</Title>
					<ArtistText>{music?.artist}</ArtistText>
				</MusicPlayingView>
				<PlayerManager>
					<PlayerIcons>
						<TouchableOpacity>
							<Ionicons name='volume-medium' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<MaterialCommunityIcons color={'#ECECEC'} name='playlist-play' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons color={'gray'} name='shuffle' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons color={'gray'} name='repeat' size={25} />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons color={'#ECECEC'} name='heart-sharp' size={25} />
						</TouchableOpacity>
					</PlayerIcons>
					<PlayerProgressBar>
						<Progress.Bar 
							borderWidth={0} 
							color='#ECECEC' 
							unfilledColor='#1A1A1A' 
							height={3} width={330} 
							progress={progress.duration && progress.position != 0 ? 
								(Math.floor(progress.position) / Math.floor(progress.duration)): 0
							} />
						<PlayerProgressTimer>
							<ArtistText>{music?.position}</ArtistText>
							<ArtistText>{music?.duration}</ArtistText>
						</PlayerProgressTimer>
					</PlayerProgressBar>
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