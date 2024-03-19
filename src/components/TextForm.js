import React, {useState} from 'react'
import PropTypes from 'prop-types'

export default function TextForm(props) {
let num = 0;
const num_words = (text) => {
    num = text.split(" ").length;
    if(text===""){
        num = 0;
    }
    else if(text.charAt(text.length-1)===" "){
        num = num-1;
    }
    return num;
}
const time_to_read = (num, text) => {
    if(text===""){
        return 0;
    }
    else if(text.charAt(text.length-1)===" "){
        return 0.008*(text.split(" ").length - 1);
    }
    else{
        return 0.008*(text.split(" ").length);
    }
}
const handleUpClick = () =>{
    //console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","success");
}
const handleLoClick = () =>{
    //console.log("Uppercase was clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase","success");
}
const handleCopy = () => {
    let new_text = document.getElementById("myBox");
    new_text.select();
    navigator.clipboard.writeText(new_text.value);
    props.showAlert("Copied to clipboard","success");
}
const handleExtraSpaces = () => {
    let txt = text.split(/[ ]+/);
    setText(txt.join(" "))
    props.showAlert("Extra spaces removed","success");
}
const handleClearClick = () =>{
    //console.log("Uppercase was clicked" + text);
    let newText = '';
    setText(newText);
    props.showAlert("Text Cleared","success");
}
const handleOnChange = (event) =>{
    //console.log("Handle on change");
    setText(event.target.value);  
}
const handleAlClick = (event) =>{
    //console.log("Handle on change");
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] === text[i].toUpperCase()) {
            result += text[i].toLowerCase();
        } else {
            result += text[i].toUpperCase();
        }
    }      
    setText(result); 
    props.showAlert("Alternating case","success");
}
const [text, setText] = useState('');
//setText("new text")
  return (
    <>
   <div className = "container">
            <h1 style={{color : props.mode === 'dark' ? 'white':'black'}}>{props.heading}</h1>
            <div className="mb-3">
            <textarea className="form-control" value = {text} onChange = {handleOnChange} style={{backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color : props.mode === 'dark' ? 'white':'black'}} id="myBox" rows="8"></textarea>
            </div>
            <button className="btn btn-primary mx-2" onClick = {handleUpClick}>Convert to UpperCase</button>
            <button className="btn btn-primary mx-2" onClick = {handleLoClick}>Convert to LowerCase</button>
            <button className="btn btn-primary mx-2" onClick = {handleAlClick}>Alternating Case</button>
            <button className="btn btn-primary mx-2" onClick = {handleCopy}>Copy Text</button>
            <button className="btn btn-primary mx-2" onClick = {handleClearClick}>Clear</button>
            <button className="btn btn-primary mx-2" onClick = {handleExtraSpaces}>Remove Extra Spaces</button>
        </div>
        <div className="container my-3" style={{color : props.mode === 'light' ? 'black' : 'white'}}>
            <h2>Your text summary</h2>
            <p>{num_words(text)} words and {text.length} characters</p>
            <p>{time_to_read(num_words(text),text)} Minutes to read</p>
            <h3>Preview</h3>
            <p>{text.length > 0 ? text:"Enter something in the textbox to preview"}</p>
        </div>
        </>
  )
}

TextForm.propTypes = {
    mode : PropTypes.string.isRequired
}