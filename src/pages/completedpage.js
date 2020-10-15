import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from '@material-ui/core'
import axios from 'axios'
import Share from '../components/share';



class CompletedPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            gif: '',
            wpm:  this.props?.location?.state?.WPM ?? 'not sent',
            words_wrong: this.props?.location?.state?.words_wrong ?? 'not sent',
            accuracy: this.props?.location?.state?.accuracy ?? 100,
            search_qry: 'good job',
            emojis: ['😄', '😃', '🙂', '😎']
        }
     
    }

    setSearchQuery(wpm){
        let qry
        if(wpm <= 40) {qry = 'better luck next time'}
        else if(wpm < 65){ qry = 'nice'}
        else if(wpm < 100) {qry = 'wow'}
        else {qry = 'holy shit'}
        this.setState({
            search_qry: qry
        })
        
        
    }


    async componentDidMount(){
        //this await may seem unneccesary but it wont work without it
        await this.setSearchQuery(this.state.wpm)
        //TODO make it such that it doesnt always get the first gif, it gets random one
        let response = await axios.get('http://api.giphy.com/v1/gifs/search',
        {params: {
            api_key: 'YPUYjJbq6i9K6YnqG20sSBets62lH0Ej',
            q: this.state.search_qry,
            limit: 100
        }})

        //gets a random gif out of the gifs that the api call returns
        let random_index = Math.floor(Math.random() * response.data.data.length)
     
        this.setState({
            gif: response.data.data[random_index].images.fixed_height.url
        })
    }

    
    render() {
        if(this.state.words_wrong === 'not sent'){
            return (
                <Redirect to = '/404'/>
            )
        }
   
        return (
            <div id = 'completed-page'>
                <h1 className = 'completed-info top-banner'> Congrats, you finished the typing test! {this.state.emojis[Math.floor(Math.random() * this.state.emojis.length)]}</h1>
                <h2 className = 'completed-info'> Your WPM was: {this.state.wpm} </h2>
                <h2 className = 'completed-info'> {`You had ${this.state.accuracy}% accuracy with ${this.state.words_wrong ? this.state.words_wrong: 'no'} ${this.state.words_wrong === 1 ? 'word': 'words'} wrong`} </h2>

                <Share WPM = {this.state.wpm}/>

                <div className = 'completed-page-gif-div'>
                    <img className = 'completed-page-gif' src = {this.state.gif} alt = ''/>
                </div>

            
                    <Button href = '/' variant = 'contained' style = {{border: '3px solid black'}}>
                       <span style = {{fontSize: '2vmax', textTransform: 'capitalize'}}> Try Again </span>
                    </Button> 
    
            </div>
        )
    }
}

export default CompletedPage
