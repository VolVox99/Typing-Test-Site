import React from 'react'
import axios from 'axios'

function Text(props) {
	const { pass_back } = props
   
    
    const [text, setText] = React.useState([''])

    const prompt_box_ref = React.useRef()
    const current_word_ref = React.useRef()
    const prev_word_ref = React.useRef()


    React.useEffect(() => {
		get_data().then(txt =>
			pass_back(txt, prompt_box_ref, current_word_ref, prev_word_ref)
		)
	}, [pass_back])
	

    async function get_data(){
        let output = await axios.get("https://www.randomtext.me/api/gibberish/p-10/100-100")
        let res_text = JSON.parse(output.request.response)
			.text_out.replace(/<\/?p>/g, '')
			.split(' ')
        
        setText(
            //gets the text response from the request, it contains html tags tho so it uses regex to get those out, and then it turns the words into an array
            res_text
        )   

        return res_text
    
	}
	

    return (
		<div id='text-prompt' ref={prompt_box_ref}>
			{text
				? text.map((word, index) => (
						<span
							key={index}
							id={
								props.index === index && props.error
									? 'word-error'
									: props.index === index
									? 'current-word'
									: ''
							}
							className={
								props.previous_wrong_words?.includes(index)
									? 'previous-wrong-words'
									: ''
							}
							ref={
								props.index === index
									? current_word_ref
									: props.index - 1 === index
									? prev_word_ref
									: null
							}
						>
							{' '}
							{word}{' '}
						</span>
				  ))
				: ''}
		</div>
	)
        
}

export default Text
