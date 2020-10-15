
let prompt_words = ['hello', 'vocal', 'religiously', 'after', 'that', 'near']
let prompt_word_typed_wrong_indexes = [1, 3]



let typed_wrong_length = prompt_word_typed_wrong_indexes.reduce((prevSum, index) => prevSum + prompt_words[index].length, 0)



console.log(typed_wrong_length)