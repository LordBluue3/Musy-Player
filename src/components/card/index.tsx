import React, { useContext, useEffect, useState } from 'react'
import {
	Background,
	CardImage,
	CardInformation,
	CardPlayingIcon,
	MusicInformation
} from './styles'

import { Image } from 'react-native'
import { MusicArtistText, MusicTitleText } from '../footer/styles'
import { TrackProps, TrackerContext } from '../../contexts/track/TrackerContext'
import TrackPlayer, { Track, Event } from 'react-native-track-player'

export function MusicCard(props: TrackProps) {
	const trackerContext = useContext(TrackerContext)
	const [currentTrack, setCurrentTrack] = useState<Track>()

	useEffect(() => {
		const trackChangedListener = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (changed) => {
			const track = await TrackPlayer.getTrack(changed.nextTrack)
			if (track) {
				setCurrentTrack(track)
			}
		})
	
		return () => {
			trackChangedListener.remove()
		}
	}, [])

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

			<CardPlayingIcon>
				{
					currentTrack?.url === props.url? (
						<Image style={{ maxWidth: 40, maxHeight: 40 }} source={require('../../assets/playing.png')} />
					):(
						<></>
					)
				}
			</CardPlayingIcon>
		</Background>
	)
}