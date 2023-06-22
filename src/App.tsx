import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Songs } from './pages/songs'
import { TrackerProvider } from './contexts/track/TrackerContext'

const collors = {
	background: '#2F2F2F',
	footer: '#161616',
}

function App() {
	return (
		<TrackerProvider>
			<ThemeProvider theme={collors}>
				<Songs />
			</ThemeProvider>
		</TrackerProvider>
	)
}

export default App
