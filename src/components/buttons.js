import { Button , Slider} from '@material-ui/core'
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
            volume: 1
        }

        this.iconStyle = {
            fontSize: '3vmax'
        }

    }
    

    toggle(){

        this.setState(prevState => ({
            volume: prevState.volume ? 0: 1
        }), () => this.props.sendBack(this.state.volume))
    }

    changeVolume(_, vol){
        this.setState({
            volume: vol
        }, () => this.props.sendBack(vol))
        
    }





    render(){

        return (
                <div id = 'volume'>
                    <MutButton onClick = {() => this.toggle()} id = 'mute-button'> 
                        {this.state.volume ? <VolumeUpIcon style = {this.iconStyle} />: <VolumeOffIcon style = {this.iconStyle} />}
                    </MutButton>

                    <Slider id = 'volume-slider' min = {0} max = {1} step = {0.01} value = {this.state.volume} onChange = {(e, n) => this.changeVolume(e, n)}/>
                </div>
        )
}
}



export { RestartButton, MuteButton}

