import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'


 class CompletedPage extends Component {
    render() {
        return (
            <div id = 'completed-page'>
                <h1> Congrats, you finished the typing test!</h1>
                <h2> Your WPM was: {this.props.location.state.WPM} </h2>

                <Link to = '/'> 
                
                <Button variant="contained" color="primary" size = 'large'> Try Again </Button>
                 
                  </Link>
            </div>
        )
    }
}

export default CompletedPage
