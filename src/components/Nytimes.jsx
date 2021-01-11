import React from 'react'
import p5 from 'p5'

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
          let input,
            button,
            query,
            filter,
            greeting,
            results;
          let queue = [];
          let keywords = [];
          let count = this.cou
          let s = '';
          let strings;
          let resultResponse;

          p.preload = () => {
            // Preloading the section with question & buttons

            question.style('text-align:center')
            question.center();
            emailButton.position(p.windowWidth / 2, p.windowHeight / 4);
            fbButton.position(p.windowWidth / 2 - 100, p.windowHeight / 4);
            fbButton.style('background-color:grey;', 'color:white')
            emailButton.style('background-color:grey;', 'color:white')
            emailButton.mousePressed(loadEmailResults)
            fbButton.mousePressed(loadFbResults);
            checkVal();

          }
          const checkVal = () => {
            if (this.state.count == 55) {
              console.log('is the same')
            } else {
              count = 2;
              console.log(count);
            }
          }

          p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight / 4);

          }
          function loadFbResults() {

            title = 'The most shared articles on Facebook are. ';
            p.loadJSON(mostFacebooked, gotData);
          }
          function loadEmailResults() {
            title = 'The most emailed articles. ';
            p.loadJSON(mostEmailed, gotData);
          }

          function gotData(data) {
            // retrieving data from the NYTIMES API from both most emailed + most shared on fb
            results = data.results;
            // lets have this element be dynamic, instead of hardcoded lets input title fb or emai.
            // perhaps use a flag to create a boolean
            resultResponse = p.createElement('h2', title);
            resultResponse.style('text-align:center;')
            resultResponse.style('padding:0px;')
            getKeywords();
          }

          function getKeywords() {
            // Iterating through each article, and inside the nested array to extract keywords.
            // adding it to a new array if it is defined
            for (let i = 0; i < results.length / 2; i++) {
              strings = results[i].des_facet;
              p.append(queue, results[i].title);
              headline = p.createElement('p', i + 1 + '. ' + results[i].title);
              headline.style('text-align:center;');
              for (let j = 0; j < results.length / 2; j++) {
                if (results[i].des_facet[j]) {
                  keywords.push(results[i].des_facet[j]);
                }

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
          return (<div ref={this.myRef}>
            <h1 className="App-title">
              {this.props.title}</h1>
            <div>{JSON.stringify(this.props.myObj)}</div>
          </div>)
        }
      }

      export default Sketch
