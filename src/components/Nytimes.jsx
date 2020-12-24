import React from 'react'
import p5 from 'p5'
let x = 1;
let input, buton;

let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=dystopia&api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU'
let query;
let filter;
let greeting;

class Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  Sketch = (p) => {

    p.preload = () => {
        // p.loadJSON(url, gotData);
    }
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 2.5)
          let input = p.createInput('','text');
        let  button = p.createButton('submit');
          button.position(input.x + input.width, 60);
          input.position(400,60);
          input.input(getInput)
          button.mousePressed(getInput);
    }

    function getInput() {
          let query = this.value();
            console.log(query);
            greeting = p.createElement('h3', 'What is a hot jargon?');
            greeting.position(0,0);

            p.textAlign(p.center);
            p.textSize(50);
            greeting.html(query);
            greeting.clear();

    }


    function gotData(data) {
      var articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
        p.createElement('h1', articles[i].headline.main);
        p.createP(articles[i].snippet);
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
    return (
    <div ref={this.myRef}></div>)
  }
}

export default Sketch
