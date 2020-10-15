import { Button } from '@material-ui/core'
import React from 'react'
import { styled } from '@material-ui/core/styles'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'


const ResButton = styled(Button)({
    borderRadius: 40,
    minWidth: 0,
    backgroundColor: '#fff'
})

function RestartButton(props) {
   
    return (
        <div className = {props.className?? ''} id = {props.id?? ''}>
    
            <ResButton style = {{border: '3px solid black'}} endIcon = {props.endIcon} variant="contained" onClick={() => props.onClick? props.onClick(props.self): console.log()} size={props.size?? 'large'}> 
                {props.children}
            </ResButton>
           
        </div>
    )
}

const MutButton = styled(Button)({
    minWidth: 0,
    minHeight: 0,
    height: 'auto',
    borderRadius: 40

})


class MuteButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            muted: false
        }

        this.iconStyle = {
            fontSize: '3vmax'
        }

    }
    

    toggle(){

        this.props.self.setState(prevState => ({
            muted: !prevState.muted
        }))
    }

    render(){

        return (
                <MutButton onClick = {() => this.toggle()} id = 'mute-button'> 
                    {this.props.self.state.muted ? <VolumeOffIcon style = {this.iconStyle} />: <VolumeUpIcon style = {this.iconStyle} />}
                </MutButton>
                        
        )
}
}



export { RestartButton, MuteButton}

