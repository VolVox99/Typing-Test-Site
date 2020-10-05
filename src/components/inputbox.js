import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Text from '../components/text'
import Title from '../components/title'
import prompt_words from '../assets/text'
import {TextField, Button} from '@material-ui/core'





export class inputbox extends Component {
    
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
            prompt_word_typed_wrong_indexes: []
        }
        
    }

    updateText(event){
        this.setState({
            text: event.target.value,
            started_typing: true,
            word_index: this.words_index()
        })
    }


    typed_words(){
        const re = /\S{1,20}/g
        let words = this.state.text.match(re)
        return words
    }

    words_index(){
        let words = this.typed_words()
        //return index of current word and makes sure it waits till we start typing or else there will be errors 
        return words ? words.length -1: 0
    }


    numOfCharacters(){
        const re = /\w/g
        let letters = this.state.text.match(re)
        return letters ? letters.length: 0
       
    }

    WPM(seconds){
        //WPM formula
        return Math.round(((this.numOfCharacters()/5)/(seconds/60)))

    }

    checkCurrentWordWrong(){
        //gets all the currently typed words
        let current_typed_words = this.typed_words()
        //gets the current word were on. we also make sure theres a current typed word or else the list is empty and indexing it will give us an error
        let typed_word = current_typed_words ? current_typed_words[this.state.word_index ] : ''
        let prompt_word = current_typed_words ? prompt_words[this.state.word_index ]: ''

        //This gets the section of prompt word equal to as much of it as weve typed to make sure theyre equal. If we compared the whole string, then it would be not equal before were done typing and it would make it red then which we dont want
        //also have to always make sure the word exists or else error
        let prompt_word_slice = prompt_word && typed_word ? prompt_word.slice(0, typed_word.length): ''

        if(typed_word === prompt_word_slice){
            //means current typed word is equal
            return false
        }
        else {
            //means theyre not equal and we typed wrong
            return true
        }
    }

    checkPastWordsWrong = () => {
        let current_typed_words = this.typed_words()
        let wrong_indexes = []
        if(current_typed_words){

        current_typed_words.forEach((typed_word, index) => {
            //if the words dont match
            if (prompt_words[index] !== typed_word){
               wrong_indexes.push(index)
            }
        })
        
        //I do this instead of appending to the previous value so it updates in real time. like if the person goes back and fixes the mistake then it wont be there any more
        this.setState({
            //then append the index to the wrong word indexes
            prompt_word_typed_wrong_indexes: wrong_indexes
        })
    }}

    componentDidMount = () => {
        
        setInterval(() => {
            
            this.setState(prevState => ({
            seconds_passed: this.state.started_typing ? prevState.seconds_passed + 0.1: 0,
            //we have to also make sure seconds is > 0 or else it will divide by zero and WPM will be infinity
            WPM: this.state.started_typing && this.state.seconds_passed ? this.WPM(this.state.seconds_passed): 0,
            word_index: this.words_index(),
            current_word_wrong: this.checkCurrentWordWrong()
        
        }), () => {
            //call whatever functions you need to call every interval here, 
            
            this.checkTimeUp()
            this.checkPastWordsWrong()
        
        }, 
        
        )}, 100)

      
    }

    restart(){
        this.setState({
           
            text: '',
            WPM: 0,
            seconds_passed: 0,
            started_typing: false,
            done: false,
            word_index: 0,
            time_limit: 60,
            current_word_wrong: false,
            prompt_word_typed_wrong_indexes: []
        
        })
    }
    
    calcTimeLeft(time_psd){

        return time_psd ? `0:${60-Math.round(time_psd)}` :'1:00'
    }

    adjusted_WPM(){

        let wpm = this.state.WPM
        let num_of_errors = this.state.prompt_word_typed_wrong_indexes.length
        //rn time_limit/60 is just one but we might change it in the future so we still need it
        let adjusted_wpm = wpm - num_of_errors/(this.state.time_limit/60)
        return adjusted_wpm
    }

    checkTimeUp(){

        if(this.state.seconds_passed >= this.state.time_limit){
            this.setState({
                done: true,
                adjustedWPM: this.adjusted_WPM()
            })
        }
    }




    render() {

        if(this.state.done){
            return <Redirect to={{
                pathname: '/completed',
                //TODO change it to adjusted wpm
                state: {WPM: this.state.adjustedWPM}
            }}/>
        }

        return (
            <div className = 'homepage'>
                <Title/>
                <Text index = {this.state.word_index} error = {this.state.current_word_wrong} previous_wrong_words = {this.state.prompt_word_typed_wrong_indexes}/>
                <TextField className="text-field" label="Start typing here..." value = {this.state.text} multiline rows={15} variant="outlined" onChange = {(event) => this.updateText(event)} position/>
                <Button variant="contained" className = 'restart-button' color="primary" onClick = {() => this.restart()} size = 'large'> Restart </Button>
                <div id = 'info-container'>
                    <h1 className = 'infos'> WPM: {this.state.WPM} </h1>
                    <h1 className = 'infos'> Time Left: {this.calcTimeLeft(this.state.seconds_passed)}</h1>
                </div>
                
            </div>
        )
    }
}

export default inputbox
