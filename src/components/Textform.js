import React, { useState } from 'react'

export default function Textform(props) {

  const[text, setText] = useState(''); 

  const disableBtn = text.length === 0 ? true : false;

  const handleOnChange = (event) => {
    setText(event.target.value);
  }

  const handleUppercaseClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('success', 'Converted to uppercase!!');
  }

  const handleLowercaseClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('success', 'Converted to lowercase!!');
  }

  const handleCapitalizeClick = () => {
    let words = text.split(' ');
    const capitalizedWords = words.map(word => {
      if(word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return '';
    })
    setText(capitalizedWords.join(' '));
  }

  const handleSentenceClick = () => {
    const newText = text.split('.');
    const sentences = newText.map(sentence => {
      sentence = sentence.trim();
      if(sentence.length > 0) {
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      return sentence;
    })
    setText(sentences.join('. '));
    props.showAlert('success', 'Converted to sentence case!!');
  }

  const handleSpeakClick = () => {
    let msg = new SpeechSynthesisUtterance(text);
    //msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert('success', 'Copied to clipboard!!');
  }

  const handleSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(' '));
    props.showAlert('success', 'Extra spaces removed!!');
  }

  const handleClearClick = () => {
    setText('');
    props.showAlert('success', 'Text board cleared!!');
  }

  return (
    <>
    <div className="container mb-3">
        <h1 className='mb-2'>{props.heading}</h1>
        <textarea className="form-control" value={text} id="myBox" onChange={handleOnChange} placeholder='Type or enter your text here...' rows="8"></textarea>
    </div>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleUppercaseClick}>Upper Case</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleLowercaseClick}>Lower Case</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleSentenceClick}>Sentence Case</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleCapitalizeClick}>Capitalize Case</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleSpaceClick}>Remove Extra Spaces</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleCopyClick}>Copy Text</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleSpeakClick}>Speak</button>
    <button className="btn btn-primary mx-2 my-2" disabled={disableBtn} onClick={handleClearClick}>Clear</button>
    <div className="container my-4">
        <h2>Your text summary</h2>
        <p>Your text contains <b>{text.split(/\s+/).filter((element) => {return element.length !== 0}).length}</b> words and <b>{text.length}</b> characters.</p>
        <p>It will take <b>{0.08 * text.split(/\s+/).filter((element) => {return element.length !== 0}).length}</b> minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : 'Nothing to preview!!'}</p> 
    </div>
    </>
  )
}
