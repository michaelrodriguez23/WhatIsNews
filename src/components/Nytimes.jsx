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
    let headline;
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
          let queue = [];

          let s = '';

          p.preload = () => {
            const question = p.createElement('h1', 'Most Shared Articles on Facebook vs Emailed');
            question.style('text-align:center')
            question.center();
            emailButton.position(p.windowWidth / 2, p.windowHeight / 4);
            fbButton.position(p.windowWidth / 2 - 100, p.windowHeight / 4);
            fbButton.style('background-color:grey;', 'color:white')
            emailButton.style('background-color:grey;', 'color:white')
            emailButton.mousePressed(loadEmailResults)
            fbButton.mousePressed(loadFbResults);

          }

          p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight / 4);

          }
          function loadFbResults() {
            p.loadJSON(mostFacebooked, gotData);
          }
          function loadEmailResults() {
            p.loadJSON(mostEmailed, gotData);
          }

          function gotData(data) {
            results = data.results;
            const resultResponse = p.createElement('h2', 'How do these headlines make you feel?');
            resultResponse.style('text-align:center;')
            resultResponse.style('padding:0px;')

            getResults();
          }

          function getResults() {
            headline = '';
            for (let i = 0; i < results.length / 2; i++) {
              p.append(queue, results[i].title);
              s = results[i].title;
              let length = s.length;
              headline = p.createElement('p', i + 1 + '. ' + results[i].title);
              headline.style('text-align:center;')
              // const caption = p.createElement('p', results[i].des_facet);
              // caption.style('font-size:18px');


              for (let i = 0; i < length; i++) {
                let c = s.charAt(i);
                p.textSize(p.random(12, 200));
                p.text(c, x, 300)
                x = x + p.textWidth(c);
              }
            }
          }
          p.draw = () => {
            // drawCircles();
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
