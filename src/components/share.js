import React from 'react'
import * as shr from 'react-share'


function Share(props) {
   
    
    const url = { url: window.location.origin }
    
    //I just gave it 35 as a default value if for some reason theres an error so the share message doesnt look weird
    const WPM = props.WPM ?? 35
    const msg = `Check out this amazing site! I just got ${WPM} WPM on it. What can you get?`
    const title = 'Typing Speed Test'
    const iconStyle = {size: '6vmax', round: false, borderRadius: 25}


    return (
        <div className = 'icons'>


            <div className = 'icon'>
                <shr.EmailShareButton {...url} subject = {title} body = {msg}>
                    <shr.EmailIcon size= '6vmax'  round = {false} borderRadius= '25' bgStyle= {{fill: 'white'}} iconFillColor = 'red'/>
                </shr.EmailShareButton>
            </div>


            <div className = 'icon'>
                <shr.FacebookShareButton {...url} quote = {msg} hashtag = '#Typing'>
                    <shr.FacebookIcon {...iconStyle}/>
                </shr.FacebookShareButton>
            </div>

            <div className = 'icon'>
                <shr.LinkedinShareButton {...url} title = {title} summary  = {msg}>
                    <shr.LinkedinIcon {...iconStyle}/>
                </shr.LinkedinShareButton>
            </div>


            <div className = 'icon'>
                <shr.TelegramShareButton {...url} title = {msg} summary  = {msg}>
                    <shr.TelegramIcon {...iconStyle}/>
                </shr.TelegramShareButton>
            </div>
            

            <div className = 'icon'>
                <shr.RedditShareButton {...url} title = {msg} >
                    <shr.RedditIcon size= '6vmax' round = {false} borderRadius= '25' bgStyle= {{fill: '#ea4600'}}/>
                </shr.RedditShareButton >
            </div>

            <div className = 'icon'>
                <shr.TwitterShareButton {...url} title = {msg} hashtags = {['Typing', 'WPM']}>
                    <shr.TwitterIcon {...iconStyle}/>
                </shr.TwitterShareButton>
            </div>

            <div className = 'icon'>
                <shr.WhatsappShareButton {...url} title = {msg}>
                    <shr.WhatsappIcon {...iconStyle}/>
                </shr.WhatsappShareButton>
            </div>

        </div>
    )
}


export default Share
