import React from 'react'

import { useProgress } from 'react-native-track-player'
import { ArtistText, PlayerProgressBar, PlayerProgressTimer } from '../../../pages/player/styles'
import * as Progress from 'react-native-progress'

export function ProgressBar() {
	const progress = useProgress()


	function getPosition(): string {
		const positionSeconds = Math.floor(progress.position)
		const position = `${Math.floor(positionSeconds / 60)}:${(Math.floor(positionSeconds) % 60).toString().padStart(2, '0')}`
		return position
	}

	function getDuration(): string {
		const durationSeconds = Math.floor(progress.duration)
		const position = `${Math.floor(durationSeconds / 60)}:${(Math.floor(durationSeconds) % 60).toString().padStart(2, '0')}`
		return position
	}

	return (
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
				<ArtistText>{getPosition()}</ArtistText>
				<ArtistText>{getDuration()}</ArtistText>
			</PlayerProgressTimer>
		</PlayerProgressBar>
	)
}