import React, { useState } from 'react'
import {
	Background,
	CardImage,
	CardInformation,
	CardPlayingIcon,
	MusicInformation
} from './styles'

import { Image } from 'react-native'
import { MusicArtistText, MusicTitleText } from '../footer/styles'
import { TrackProps } from '../../contexts/track/TrackerContext'
import TrackPlayer, { Event, Track } from 'react-native-track-player'

export function MusicCard(props: TrackProps) {
	const [currentTrack, setCurrentTrack] = useState<Track>()

	TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (track) => {
		TrackPlayer.getTrack(track.nextTrack).then((current) => {
			if (current) {
				setCurrentTrack(current)
			}
		})
	})

	return (
		<Background>
			<CardInformation>
				<CardImage>
					<Image style={{ maxWidth: 40, maxHeight: 40 }} source={require('../../assets/music-icon.png')} />
				</CardImage>
				<MusicInformation>
					<MusicTitleText>{props.title}</MusicTitleText>
					<MusicArtistText>{props.artist}</MusicArtistText>
				</MusicInformation>
			</CardInformation>

			<CardPlayingIcon>
				{
					currentTrack?.url === props.url ? (
						<Image style={{ maxWidth: 40, maxHeight: 40 }} source={require('../../assets/playing.png')} />
					):(
						<></>
					)
				}
			</CardPlayingIcon>
		</Background>
	)
}