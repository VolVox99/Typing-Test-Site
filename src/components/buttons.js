import { Button, Slider } from '@material-ui/core'
import React from 'react'
import { styled } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

const ResButton = styled(Button)({
	borderRadius: 40,
	minWidth: 0,
	backgroundColor: '#fff',
	'&:hover': {
		transform: 'scale(1.05)',
	},
})

function RestartButton(props) {
	return (
		<div className={props.className ?? ''} id={props.id ?? ''}>
			<ResButton
				style={{ border: '3px solid black' }}
				endIcon={props.endIcon}
				variant='contained'
				onClick={() =>
					props.onClick ? props.onClick(props.self) : null
				}
				size={props.size ?? 'large'}
			>
				{props.children}
			</ResButton>
		</div>
	)
}

const MutButton = styled(Button)({
	minWidth: 0,
	minHeight: 0,
	height: 'auto',
	borderRadius: 40,
})

function MuteButton(props) {
	const [volume, setVolume] = React.useState(1)

	function toggle() {
		setVolume(prevVol => {
			window.vol = prevVol ? 0 : 1
			return window.vol
		})
		props.sendBack(window.vol)
	}

	function changeVolume(_, vol) {
		setVolume(vol)
		props.sendBack(vol)
	}

	return (
		<div id='volume'>
			<MutButton onClick={() => toggle()} id='mute-button'>
				{volume ? (
					<VolumeUpIcon style={{ fontSize: '3vmax' }} />
				) : (
					<VolumeOffIcon style={{ fontSize: '3vmax' }} />
				)}
			</MutButton>

			<Slider
				id='volume-slider'
				min={0}
				max={1}
				step={0.01}
				value={volume}
				onChange={(e, n) => changeVolume(e, n)}
			/>
		</div>
	)
}

export { RestartButton, MuteButton }
