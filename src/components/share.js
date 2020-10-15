import React, { Component } from 'react'
import * as shr from 'react-share'



class Share extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            url: 'https://volvox99.github.io/Typing-Test-Site/',

        }
        //I just gave it 35 as a default value if for some reason theres an error so the share message doesnt look weird
        this.WPM = this.props.WPM ?? 35
        this.msg = `Check out this amazing site! I just got ${this.WPM} WPM on it. What can you get?`
        this.title = 'Typing Speed Test'
        this.iconStyle = {size: '6vmax', round: false, borderRadius: 25}
    }
    

    render() {
        return (
            <div className = 'icons'>


                <div className = 'icon'>
                    <shr.EmailShareButton {...this.state} subject = {this.title} body = {this.msg}>
                        <shr.EmailIcon size= '6vmax'  round = {false} borderRadius= '25' bgStyle= {{fill: 'white'}} iconFillColor = 'red'/>
                    </shr.EmailShareButton>
                </div>


                <div className = 'icon'>
                    <shr.FacebookShareButton {...this.state} quote = {this.msg} hashtag = '#Typing'>
                        <shr.FacebookIcon {...this.iconStyle}/>
                    </shr.FacebookShareButton>
                </div>

                <div className = 'icon'>
                    <shr.LinkedinShareButton {...this.state} title = {this.title} summary  = {this.msg}>
                        <shr.LinkedinIcon {...this.iconStyle}/>
                    </shr.LinkedinShareButton>
                </div>


                <div className = 'icon'>
                    <shr.TelegramShareButton {...this.state} title = {this.msg} summary  = {this.msg}>
                        <shr.TelegramIcon {...this.iconStyle}/>
                    </shr.TelegramShareButton>
                </div>
                

                <div className = 'icon'>
                    <shr.RedditShareButton {...this.state} title = {this.msg} >
                        <shr.RedditIcon size= '6vmax' round = {false} borderRadius= '25' bgStyle= {{fill: '#ea4600'}}/>
                    </shr.RedditShareButton >
                </div>

                <div className = 'icon'>
                    <shr.TwitterShareButton {...this.state} title = {this.msg} hashtags = {['Typing', 'WPM']}>
                        <shr.TwitterIcon {...this.iconStyle}/>
                    </shr.TwitterShareButton>
                </div>

                <div className = 'icon'>
                    <shr.WhatsappShareButton {...this.state} title = {this.msg}>
                        <shr.WhatsappIcon {...this.iconStyle}/>
                    </shr.WhatsappShareButton>
                </div>

            </div>
        )
    }
}

export default Share
