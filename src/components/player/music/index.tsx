import React, { useEffect, useState } from 'react'
import { ArtistText, MusicPlayingView, Title } from '../../../pages/player/styles'

import TrackPlayer, { Event } from 'react-native-track-player'

interface MusicProps {
	title: string;
	artist: string;
	duration: string;
	position: string;
}

export function MusicPlayer() {
	const [music, setMusic] = useState<MusicProps>()

	useEffect(() => {
		setTrack()

		const trackChangedListener = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {
			setTrack()
		})
	
		return () => {
			trackChangedListener.remove()
		}
	}, [])

	function setTrack() {
		TrackPlayer.getCurrentTrack().then((track) => {
			TrackPlayer.getTrack(Number(track)).then(async (track) => {
				const title = track?.title ?? ''
				const artist = track?.artist ?? ''
				const durationSeconds = await TrackPlayer.getDuration()
				const duration = `${Math.floor(durationSeconds / 60)}:${(Math.floor(durationSeconds) % 60)}`

				setMusic({ title: title, artist: artist, duration: duration, position: '0:00' })
			})
		})
	}

	return (
		<MusicPlayingView>
			<Title>{music?.title}</Title>
			<ArtistText>{music?.artist}</ArtistText>
		</MusicPlayingView>
	)
}