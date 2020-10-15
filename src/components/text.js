import React, { Component } from 'react'
import axios from 'axios'

class Text extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            text: ''

        }

        this.prompt_box_ref = React.createRef()
        this.current_word_ref = React.createRef()
        this.prev_word_ref = React.createRef()
       
        
    }




    async componentDidMount(){
        await this.get_data()
        this.props.pass_back(this.state.text, this.prompt_box_ref, this.current_word_ref, this.prev_word_ref)
     

      
    }


    async get_data(){
        let output = await axios.get("https://www.randomtext.me/api/gibberish/p-10/100-100")
        
        this.setState({
            //gets the text response from the request, it contains html tags tho so it uses regex to get those out, and then it turns the words into an array
            text: JSON.parse(output.request.response).text_out.replace(/<\/?p>/g, '').split(' ')})
        
    }
    



    render() {
        
        
        return (
            <div id = 'text-prompt' ref = {this.prompt_box_ref}>
                
                {this.state.text ? this.state.text.map((word, index) => <span key = {index} 
                id =  {this.props.index === index && this.props.error ? 'word-error': this.props.index === index ? 'current-word': ''} 
                className = {this.props.previous_wrong_words.includes(index) ? 'previous-wrong-words': ''} ref = {this.props.index === index ? this.current_word_ref : this.props.index - 1 === index ? this.prev_word_ref: ''}> {word} </span>): ''}

            </div>
        )
    }
}

export default Text
