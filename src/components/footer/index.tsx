import React, { useState } from 'react'

import {
	Footer,
	MusicArtistText,
	MusicImage,
	MusicTitleText,
	MusicTitleView,
	Player,
	PlayerInformation,
	PlayerManager,
	ProgressView
} from './styles'

import { TouchableOpacity, Image } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import TrackPlayer, { State, Event, useProgress } from 'react-native-track-player'
import * as Progress from 'react-native-progress'

import { SongsScreenProps } from '../../pages/songs'

export function FooterBar({navigation}: SongsScreenProps) {
	const [paused, setPaused] = useState<boolean>(true)
	const [title, setTitle] = useState<string>('')
	const [artist, setArtist] = useState<string>('')
	const progress = useProgress()

	TrackPlayer.addEventListener(Event.RemotePlay, () => { TrackPlayer.play(); setPaused(false) })
	TrackPlayer.addEventListener(Event.RemotePause, () => { TrackPlayer.pause(); setPaused(true) })
	TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (changed) => {
		const track = await TrackPlayer.getTrack(changed.nextTrack)
		if (track) {
			setTitle(track.title ?? '')
			setArtist(track.artist ?? '')
		}
	})

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

	return (
		<Footer onPress={() => {
			navigation.navigate('Player')
		}}>
			<PlayerInformation>
				<MusicImage>
					<Image style={{ maxWidth: 40, maxHeight: 40 }} source={require('../../assets/music-icon.png')} />
				</MusicImage>
				<MusicTitleView>
					<MusicTitleText>{title}</MusicTitleText>
					<MusicArtistText>{artist}</MusicArtistText>
				</MusicTitleView>
			</PlayerInformation>

			<PlayerManager>
				<Player>
					<TouchableOpacity
						onPress={() => TrackPlayer.skipToPrevious()}
					>
						<Ionicons color={'#ECECEC'} name='play-skip-back' size={20} />
					</TouchableOpacity>

					<TouchableOpacity onPress={handlePlayPause}>
						<FontAwesome5 color={'#ECECEC'} name={paused ? 'play' : 'pause'} size={20} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => TrackPlayer.skipToNext()}
					>
						<Ionicons color={'#ECECEC'} name='play-skip-forward' size={20} />
					</TouchableOpacity>
				</Player>

				<ProgressView>
					<Progress.Bar 
						borderWidth={0} 
						color='#ECECEC' 
						unfilledColor='#1A1A1A' 
						height={3} width={90} 
						progress={progress.duration && progress.position != 0 ? 
							(Math.floor(progress.position) / Math.floor(progress.duration)): 0
						} />
				</ProgressView>
			</PlayerManager>
		</Footer>
	)
}