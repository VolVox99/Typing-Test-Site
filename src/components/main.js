import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Text from './text'
import Title from './title'
import { TextField } from '@material-ui/core'
import { RestartButton, MuteButton } from './buttons'
import { styled } from '@material-ui/core/styles'
import RedoIcon from '@material-ui/icons/ReplayTwoTone'
import UIfx from 'uifx'
import key_press_1 from '../assets/key_press_1.mp3'
import key_press_2 from '../assets/key_press_2.mp3'
import key_press_3 from '../assets/key_press_3.mp3'
import key_press_4 from '../assets/key_press_4.mp3'
import key_press_5 from '../assets/key_press_5.mp3'
import key_press_6 from '../assets/key_press_6.mp3'
import space_press from '../assets/space_bar.mp3'
import backspace from '../assets/backspace.mp3'

class InputBox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: '',
			WPM: 0,
			seconds_passed: 0,
			started_typing: false,
			done: false,
			word_index: 0,
			time_limit: 60,
			current_word_wrong: false,
			prompt_word_typed_wrong_indexes: [],
			letter_index: 0,
			accuracy: 0,
			volume: 1,
			muted: false,
		}

		this.current_word = null
		this.prev_word = null
		this.prompt_box = null
		this.last_word_index = 0
		this.prompt_words = ''
		this.first_scrolled = false
		this.last_distance = 0
		this.last_y = 0
		this.volume = 1
		this.throttleMs = 150
		this.past_word_wrong_indexes = []
		this.sounds = [
			[
				new UIfx(key_press_1, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
				new UIfx(key_press_2, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
				new UIfx(key_press_3, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
				new UIfx(key_press_4, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
				new UIfx(key_press_5, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
				new UIfx(key_press_6, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
			],

			[
				new UIfx(space_press, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
				new UIfx(backspace, {
					volume: this.state.volume,
					throttleMs: this.throttleMs,
				}),
			],
		]

		this.CustomTextField = styled(TextField)({
			backgroundColor: '#fff',
			borderRadius: 20,
		})
	}

	updateText(event) {
		//https://duncanleung.com/fixing-react-warning-synthetic-events-in-setstate/
		//For some reason if you use prevState and the function version of set state, u need to cache the value of the event or else it will give error
		let text_input = event.target.value
		this.playSound(text_input)

		this.setState(prevState => {
			//we set this as global variable so that we can use it to know whether we should play a sound or not. If they backspaced, we dont want to play a
			window.text_difference =
				(text_input ? text_input.length : 0) -
				(prevState.text ? prevState.text.length : 0)
			return {
				text: text_input,
				started_typing: true,
				word_index: this.wordsIndex(),
				//makes sure that if we backspace or add multiple characters at a time, it keeps up
				letter_index: prevState.letter_index + window.text_difference,
			}
		})

		this.scrollPromptDown()
	}

	playSound(text_input) {
		if (!this.state.muted) {
			//space
			if (text_input[text_input.length - 1] === ' ') {
				this.sounds[1][0].play(this.state.volume)
			} else if (window.text_difference > 0) {
				let index = Math.floor(Math.random() * this.sounds[0].length)
				this.sounds[0][index].play(this.state.volume)
			}
			//backspace
			else {
				this.sounds[1][1].play(this.state.volume)
			}
		}
	}

	typedWords() {
		const re = /\S{1,20}/g
		let words = this.state.text.match(re)
		return words ?? []
	}

	wordsIndex() {
		let words = this.typedWords()
		//return index of current word and makes sure it waits till we start typing or else there will be errors
		return words ? words.length - 1 : 0
	}

	adjustedWPM(seconds) {
		let current_typed_words = this.typedWords()
		//we remove the last one because thats the one were currently typing and its not gonna be equal to the full word
		if (current_typed_words) current_typed_words.pop()
		let correct_indexes = []
		let wrong_indexes = []
		if (current_typed_words) {
			current_typed_words.forEach((typed_word, index) => {
				//if the words  match
				if (this.prompt_words[index] === typed_word) {
					correct_indexes.push(index)
				} else {
					wrong_indexes.push(index)
				}
			})

			let total_chars = correct_indexes.reduce(
				(prevSum, index) => prevSum + this.prompt_words[index].length,
				0
			)
			this.past_word_wrong_indexes = wrong_indexes
			return Math.round(total_chars / 5 / (seconds / 60))
		}
	}

	checkCurrentWordWrong() {
		//gets all the currently typed words
		let current_typed_words = this.typedWords()
		//gets the current word were on. we also make sure theres a current typed word or else the list is empty and indexing it will give us an error
		let typed_word = current_typed_words
			? current_typed_words[this.state.word_index]
			: ''
		let prompt_word = current_typed_words
			? this.prompt_words[this.state.word_index]
			: ''

		//This gets the section of prompt word equal to as much of it as weve typed to make sure theyre equal. If we compared the whole string, then it would be not equal before were done typing and it would make it red then which we dont want
		//also have to always make sure the word exists or else error
		let prompt_word_slice =
			prompt_word && typed_word
				? prompt_word.slice(0, typed_word.length)
				: ''

		if (typed_word === prompt_word_slice) {
			//means current typed word is equal
			return false
		} else {
			//means theyre not equal and we typed wrong
			return true
		}
	}

	accuracy() {
		//                                                                                       if typed words.length is 0, it will return 1 so we dont divide by 0
		if (this.state.started_typing) {
			let acc = Math.floor(
				100 -
					100 *
						((this.state.prompt_word_typed_wrong_indexes ?? [])
							.length /
							(this.state.word_index || 1))
			)
			if (acc < 0) return 0
			return acc
		} else return 100
	}

	componentDidMount = () => {
		setInterval(() => {
			if (this.state.started_typing) {
				this.setState(
					prevState => ({
						seconds_passed: this.state.started_typing
							? prevState.seconds_passed + 0.1
							: 0,
						//we have to also make sure seconds is > 0 or else it will divide by zero and WPM will be infinity
						WPM: this.state.seconds_passed
							? this.adjustedWPM(this.state.seconds_passed)
							: 0,
						word_index: this.wordsIndex(),
						current_word_wrong: this.checkCurrentWordWrong(),
						prompt_word_typed_wrong_indexes: this
							.past_word_wrong_indexes,
						accuracy: this.accuracy(),
						volume: this.volume,
					}),
					() => {
						//call whatever functions you need to call every interval here,
						this.checkTimeUp()
					}
				)
			}
		}, 100)
	}

	restart(self) {
		//self is just this that i pass in because im calling it from a seperate component
		self.setState({
			text: '',
			WPM: 0,
			seconds_passed: 0,
			started_typing: false,
			done: false,
			word_index: 0,
			time_limit: 60,
			current_word_wrong: false,
			prompt_word_typed_wrong_indexes: [],
			letter_index: 0,
			accuracy: 0,
		})

		// window.location.reload()

		// scrolls text box to top
		if (
			self.prompt_box &&
			self.prompt_box.current &&
			self.prompt_box.current.scrollTop
		) {
			self.prompt_box.current.scrollTop = 0
		}

		//resets properties
		//NOTE be careful about what properties you reset here, dont just copy paste from constructor cause that may break things
		self.last_word_index = 0
		self.last_distance = 0
		self.last_y = 0
		self.first_scrolled = false
	}

	getDataBack = (text, ref_1, ref_2, ref_3) => {
		//this gets the ref back from child text component and prompt
		this.prompt_words = text
		this.prompt_box = ref_1
		this.current_word = ref_2
		this.prev_word = ref_3
	}

	pad(n, width, z) {
		z = z || '0'
		n = n + ''
		return n.length >= width
			? n
			: new Array(width - n.length + 1).join(z) + n
	}

	calcTimeLeft(time_psd) {
		return time_psd ? `0:${this.pad(60 - Math.round(time_psd), 2)}` : '1:00'
	}

	checkTimeUp() {
		if (this.state.seconds_passed >= this.state.time_limit) {
			this.setState({
				done: true,
			})
		}
	}

	getVolumeBack = vol => {
		this.volume = vol
	}

	scrollPromptDown() {
		//since we compare previous word, we have to make sure were not on first word or error
		if (this.state.word_index >= 1) {
			let current_y =
				this.current_word &&
				this.current_word.current.getBoundingClientRect().y
			let prev_y =
				this.prev_word &&
				this.prev_word.current.getBoundingClientRect().y
			let distance = current_y - prev_y

			//means this word is on a new line and the second one is so that it only happens the first time we enter a new line, so it doesnt infintely scroll
			if (distance > 0 && this.state.word_index > this.last_word_index) {
				this.prompt_box.current.scrollTop += this.first_scrolled
					? distance
					: distance * 1.25
				this.first_scrolled = true
			}

			// means we have gone back words, and that we have gone up a line (prev distance was > 0)
			else if (
				this.last_distance > 0 &&
				this.state.word_index < this.last_word_index
			) {
				this.prompt_box.current.scrollTop -= this.last_distance
			}

			//we need this so it doesnt infintely scroll
			this.last_word_index = this.state.word_index
			this.last_distance = distance
			this.last_y = current_y
		}
	}

	componentWillUnmount() {
		// fix Warning: Can't perform a React state update on an unmounted component
		this.setState = (state, callback) => {
			return
		}
	}

	render() {
		if (this.state.done) {
			return (
				<Redirect
					to={{
						pathname: '/completed',
						state: {
							WPM: this.state.WPM,
							words_wrong: this.state
								.prompt_word_typed_wrong_indexes.length,
							accuracy: this.state.accuracy,
						},
					}}
				/>
			)
		}

		return (
			<div id='homepage'>
				<Title />
				<div id='easter-egg'>Made by Ali Rastegar</div>

				<div id='main-page-content'>
					<div id='info-container'>
						<div className='infos'>
							{' '}
							WPM <div id='values'>{this.state.WPM} </div>
						</div>
						<div className='infos'>
							{' '}
							Accuracy{' '}
							<div id='values'> {this.state.accuracy}%</div>
						</div>
						<div className='infos'>
							{' '}
							Time Left{' '}
							<div id='values'>
								{' '}
								{this.calcTimeLeft(this.state.seconds_passed)}
							</div>
						</div>
						<MuteButton sendBack={this.getVolumeBack} />
						<RestartButton
							onClick={this.restart}
							self={this}
							className='infos'
							id='restart-button'
							size='small'
						>
							<RedoIcon style={{ fontSize: '4vmax' }} />
						</RestartButton>
					</div>

					<div id='prompt-and-box'>
						<Text
							pass_back={this.getDataBack}
							index={this.state.word_index}
							error={this.state.current_word_wrong}
							previous_wrong_words={
								this.state.prompt_word_typed_wrong_indexes
							}
						/>
						<this.CustomTextField
							autoFocus
							InputProps={{
								style: {
									fontSize: '1.5vmax',
									width: '39vw',
									borderRadius: '20px',
								},
							}}
							InputLabelProps={{
								style: {
									fontSize: '1.2vmax',
									color: '#383536',
								},
							}}
							className='text-field'
							label={
								this.state.started_typing
									? 'You got this!'
									: 'Start typing here...'
							}
							value={this.state.text}
							multiline
							rows={1}
							variant='filled'
							color='primary'
							onChange={event => this.updateText(event)}
							onPaste={e => e.preventDefault()}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default InputBox
