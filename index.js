import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event } from 'react-native-track-player'
import { PlaybackService } from './src/services/PlaybackService'

AppRegistry.registerComponent(appName, () => App)
TrackPlayer.registerPlaybackService(() => PlaybackService)
TrackPlayer.setupPlayer().then(() => {
	TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext())
	TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious())

	TrackPlayer.updateOptions({
		capabilities: [
			Capability.Play,
			Capability.Stop,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious
		],
    
		compactCapabilities: [ Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious ],

		android: {
			appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
		}
	})
})
