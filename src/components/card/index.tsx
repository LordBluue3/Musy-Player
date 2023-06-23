import React, { useContext} from 'react'
import {
	Background,
	CardImage,
	CardInformation,
	MusicInformation
} from './styles'

import { Image } from 'react-native'
import { MusicArtistText, MusicTitleText } from '../footer/styles'
import { TrackProps, TrackerContext } from '../../contexts/track/TrackerContext'
import TrackPlayer from 'react-native-track-player'

export function MusicCard(props: TrackProps) {
	const trackerContext = useContext(TrackerContext)

	return (
		<Background onPress={() => {
			if (trackerContext) {
				const musicIndex = trackerContext.getTrack().findIndex(music => music.url === props.url)
				TrackPlayer.skip(musicIndex).then(() => TrackPlayer.play())
			}
		}}>
			<CardInformation>
				<CardImage>
					<Image style={{ maxWidth: 40, maxHeight: 40 }} source={require('../../assets/music-icon.png')} />
				</CardImage>
				<MusicInformation>
					<MusicTitleText>{props.title}</MusicTitleText>
					<MusicArtistText>{props.artist}</MusicArtistText>
				</MusicInformation>
			</CardInformation>
		</Background>
	)
}