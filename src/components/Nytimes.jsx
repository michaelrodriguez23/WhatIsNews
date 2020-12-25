import React from 'react'
import p5 from 'p5'
let x = 1;
let input,
  button,
  query,
  filter,
  greeting;


let url = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU'

class Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Sketch = (p) => {
    p.preload = () => {
      p.loadJSON(url, gotData);
    }
    const createSearch = () => {
      input = p.createInput('', 'text');
      greeting = p.createElement('h1', 'What is the latest jargon?');
      greeting.position(1100, -20);
      button = p.createButton('submit');
      input.position(800, 60);
      button.position(input.x + input.width, 60);
      button.mousePressed(getInput);
    }
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 2.5);
      // createSearch()
    }

    function getInput() {

      let query = this.value();


    }

    function gotData(data) {
   var results = data.results;

      for (var i = 0; i < results.length/3; i++) {
        const headline = p.createElement('p','  : ' + results[i].title);
        p.text('hi')
        p.textAlign(p.center);
        p.textSize(130);
         // p.createP('img' results[i].des_facet);

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
