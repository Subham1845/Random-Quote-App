import React, { Component } from "react";
import "./styles.css";
import axios from "axios";

let quotesData;
let randomQuote;
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuote: "",
      currentAuthor: "",
    };
  }

  getQuotes() {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((res) => {
        quotesData = res.data;
        randomQuote =
          quotesData.quotes[
            Math.floor(Math.random() * quotesData.quotes.length)
          ];
        this.setState({
          currentQuote: randomQuote.quote,
          currentAuthor: randomQuote.author,
        });
        console.log(this.state.currentQuote);
        console.log(this.state.currentAuthor);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getQuotes();
  }

  render() {
    return (
      <>
        <div id="wrapper">
          <div id="quote-box">
            <div className="quote-text">
              <i className="fa fa-quote-left"> </i>
              <span id="text">{this.state.currentQuote}</span>
            </div>
            <div className="quote-author">
              - <span id="author">{this.state.currentAuthor}</span>
            </div>
            <div className="buttons">
              <a
                className="button"
                id="tweet-quote"
                title="Tweet this quote!"
                target="_top"
                href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + ${this.state.currentQuote} + '" ' + ${this.state.currentAuthor})`}
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                className="button"
                id="tumblr-quote"
                title="Post this quote on tumblr!"
                target="_blank"
              >
                <i className="fa fa-tumblr"></i>
              </a>
              <button
                className="button"
                id="new-quote"
                onClick={() => {
                  this.getQuotes();
                }}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
