import React, { Component } from 'react'
import words from '../assets/text'

class Text extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            text: words
        }
    }


    
    render() {

        
        return (
            <div id = 'text-prompt'>

    
               {this.state.text.map((word, index) => <span id =  {this.props.index === index && this.props.error ? 'word-error': this.props.index === index ? 'current-word': ''} className = {this.props.previous_wrong_words.includes(index) ? 'previous-wrong-words': ''}> {word} </span>)}
              
                
            </div>
        )
    }
}

export default Text
