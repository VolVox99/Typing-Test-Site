import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';




class ErrorPage extends Component {
    render() {
        return (
            <div id = 'error-page'>                                             
                <h1 id = 'error-page-header'> Sorry that page does not exist <span role = 'img' aria-label = ''> 😕  </span> </h1>
            
                    <Button style = {{border: '3px solid black'}} variant = 'contained' href = '/Typing-Test-Site' id = 'error-button' endIcon = {<ArrowBackIcon style={{fontSize: '2.5vw' }}/>}>
                        <span style ={{fontSize: '2vmax'}}> Go back </span> 
                    </Button>
              
            </div>
        )
    }
}

export default ErrorPage
