import React from 'react'
import p5 from 'p5'


class Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Sketch = (p) => {
    const emailButton = p.createButton('Email');
    const fbButton = p.createButton('Facebook');
    let  headline = p.createElement('h4', );
    let x = 1;
    let emailedPeriod = 1; // 7, 30 most emailed
    let apiKey = 'api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU'
    let mostEmailed = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?' + apiKey
    let mostFacebooked = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?' + apiKey
    let input,
      button,
      query,
      filter,
      greeting,
      results;

    p.preload = () => {
      emailButton.position(300, 0);
      fbButton.position(400, 0);

      emailButton.mousePressed(loadEmailResults)
      fbButton.mousePressed(loadFbResults)

    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 2.5);

    }
    function loadFbResults(){
      p.loadJSON(mostFacebooked, gotData);
    }
    function loadEmailResults(){
      p.loadJSON(mostEmailed, gotData);
    }

    function gotData(data) {
      results = data.results;
      getResults();

      function getResults() {
        headline ='';
        for (let i = 0; i < results.length / 3; i++) {
         headline = p.createElement('h4', '   ' + results[i].title);
        }
      }
    }



    p.draw = () => {
      drawCircles()
    }

    function drawCircles() {
      p.background(245, 100, 104);
      p.stroke(127, 19, 120);
      p.fill(39, 24, 79);
      p.stroke(127, 63, 120);
      p.circle(p.width / 2 - (x), p.height / 2, x); // left
      p.circle(p.width / 2, p.height / 2, x - (.8 * x)); // middle
      p.circle(p.width / 2 + (x), p.height / 2, x + 90); // right
      x += 1.5;
    }

  }
  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)
  }

  render() {
    return (<div ref={this.myRef}></div>)
  }
}

export default Sketch
