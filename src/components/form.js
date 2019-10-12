import React, { Component } from 'react'
import './form.css';

export default class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = {
        text1: '',
        text2: '',
        selectedOption: 'compareWords',
        matches: [],
        showNoMatches: false
      };
  }

  storeText = (option, event) => {
    if(option === 'value1') {
      this.setState({ text1: event.target.value });
    } else {
      this.setState({ text2: event.target.value });
    }
  }

  compareText = () => {
    if(this.state.selectedOption === 'compareWords') {
      this.compareWords();
    }
    if(this.state.selectedOption === 'compareLetters') {
      this.compareLetters();
    }
  }

  compareLetters = () => {
    let sentence1 = this.state.text1.trim();
    let sentence2 = this.state.text2.trim();
    let words1 = sentence1.split('');
    let words2 = sentence2.split('');
    this.doComparions(words1, words2);
  }

  compareWords = () => {
    let words1 = this.state.text1.split(' ');
    let words2 = this.state.text2.split(' ');
    this.doComparions(words1, words2);
  }

  doComparions = (words1, words2) => {
    let sentence1 = [...new Set(words1)];
    let sentence2 = [...new Set(words2)];

    let matches = [];
    for(let i = 0; i < sentence1.length; i++) {
      for(let j = 0; j < sentence2.length; j++) {
        if(sentence1[i] === sentence2[j]) {
          matches.push(sentence1[i]);
        }
      } 
    }
    if(!!matches.length) {
      this.setState({ matches: matches });
    } else {
      this.setState({ showNoMatches: true });
    }
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value,
      matches: []
    });
  };

  getOccurrence = (array, value) => {
    return array.filter((v) => (v === value)).length;
  }

  clear = () => {
    this.setState({matches: [], text1: '', text2: ''});
  }

  render() {
    return (
      <div>
        <h1>
          Compare two sentences!
        </h1>
        <div className="radio-buttons-container">
        <div className="radio-button">
        <input
            className="form-radio"
            type="radio" 
            name="compare" 
            value="compareWords"
            checked={this.state.selectedOption === 'compareWords'}
            onChange={this.handleOptionChange}/>
            <label>Check which words are in both sentences</label>
        </div>
        <div className="radio-button">
        <input 
            className="form-radio"
            type="radio" 
            name="compare"
            value="compareLetters"
            checked={this.state.selectedOption === 'compareLetters'}
            onChange={this.handleOptionChange}/>
            <label>Check which letters are in both sentences</label>
        </div>
        </div>
        <div className="input-button-container">
          <div className="text-input-container">
            <textarea onChange = {(e) => this.storeText('value1', e)} type="text" rows="6" cols="50"></textarea>
            <textarea onChange = {(e) => this.storeText('value2', e)} type="text" rows="6" cols="50"></textarea>
          </div>
        <div>
          <input disabled={!this.state.matches.length} className="button-clear" type="submit" value='Clear' onClick={this.clear} />
          <input className="button" type="submit" value={this.props.buttonText} onClick={this.compareText} />
        </div>
        <div>
          {this.state.matches.length ? <p>Number of matches: {this.state.matches.length} </p> : ''}
          {this.state.matches.length || !this.state.showNoMatches ? this.state.matches.map((word) =>
          <div className="matches">
            <li key={word}>{word}</li>
          </div>
          ) : <p>No matches</p>}
        </div>
        </div>
       
      </div>
    )
  }
}
