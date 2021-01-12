import React from 'react'
import p5 from 'p5'
// make a flow chart
class Sketch extends React.Component {

  state = {
    count: 1

  };
  constructor(props) {
    super(props)
    this.myRef = React.createRef();

  }
  Sketch = (p) => {
    let title = 'Transmission of information Shared Via the New York Times';
    const emailButton = p.createButton('Email');
    const fbButton = p.createButton('Facebook');
    const question = p.createElement('h1', title);
    let headline = p.createElement('p', '');
    let x = 1;
    let emailedPeriod = 1; // 7, 30 most emailed
    let apiKey = 'api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU'
    let mostEmailed = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?' + apiKey
    let mostFacebooked = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?' + apiKey
    let queue = [];
    let keywords = [];
    let count = this.count
    let s = '';
    let strings;
    let lead;
    let input,
      button,
      query,
      filter,
      greeting,
      results,
      y,
      line;

    p.preload = () => {
      // Preloading the section with question & buttons
      question.style('text-align:center')
      question.center();
      question.position(p.windowWidth / 2, p.windowHeight / 2);
      emailButton.position(p.windowWidth / 2, p.windowHeight / 4);
      fbButton.position(p.windowWidth / 2 - 100, p.windowHeight / 4);
      fbButton.style('background-color:grey;', 'color:white')
      emailButton.style('background-color:grey;', 'color:white')
      emailButton.mousePressed(loadEmailResults)
      fbButton.mousePressed(loadFbResults);

    }
    p.draw = () => {
      // drawCircles();
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 2);
    }

    function gotData(data) {
      // retrieving data from the NYTIMES API from both most emailed + most shared on fb
      results = data.results;
      getHeadlines();
      printLead();
      printHeadlines();
      getKeywords();

    }

    // Functions
    // --------------------------------------------------
    function loadFbResults() {
          x=0;
       y = p.windowWidth/2;
      title = 'The most shared articles on Facebook are. ';
      p.loadJSON(mostFacebooked, gotData);
    }
    function loadEmailResults() {
       y = p.windowWidth/6;
      title = 'The most emailed articles. ';
      p.loadJSON(mostEmailed, gotData);
    }
    function getHeadlines() {
      //adding the headlines to the end of the queue [] from the NYTIMES api
      for (let i = 0; i < 10; i++) {
        queue[i] = results[i].title;
      }
    }

    function printLead() {
      lead = p.createElement('h2', title);
      p.fill(255)
      lead.style('text-align:center;')
      lead.style('padding:0px;');
    }

    function printHeadlines() {
      p.fill(255);
      for (let i = 0; i < 10; i++) {
        p.textSize(16);
        x = x + 30;
        line = p.text([i + 1] + '. ' + queue[i], y, x);
      }
    };

    function getKeywords() {
      // Iterating through each article, and inside the nested array.
      for (let i = 0; i < results.length / 2; i++) {
        strings = results[i].des_facet;
        for (let j = 0; j < results.length / 2; j++) {
          if (results[i].des_facet[j]) {
            keywords.push(results[i].des_facet[j]);
          }
        }
      }
    }

    function drawCircles() {
      p.background(245, 100, 104);
      p.stroke(127, 19, 120);
      p.fill(39, 24, 79);
      p.stroke(127, 63, 120);
      p.circle(p.width / 2 - (x), p.height / 2, x); // left
      p.circle(p.width / 2, p.height / 2, x - (.8 * x)); // middle
      p.circle(p.width / 2 + (x), p.height / 2, x + 90); // right
    }
    /*
    const checkVal = () => {
      if (this.state.count == 55) {
        console.log('is the same')
      } else {
        count = 2;
        console.log(count);
      }
    }
  }
  */
  }
  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)

  }

  render() {
    return (<div ref={this.myRef}>
      <h1 className="App-title">
        {this.props.title}</h1>
      <div>{JSON.stringify(this.props.myObj)}</div>
    </div>)
  }
}

export default Sketch
