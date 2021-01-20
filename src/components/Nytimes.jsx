import React from "react";
import p5 from "p5";

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  Sketch = (p) => {
    let queue = [];
    let keywords = [];
    let apiKey = "api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU";
    let mostEmailed = "https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?" + apiKey;
    let mostFacebooked = "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?" + apiKey;
    let title = "New York Times Transmission of Articles";
    let headline = p.createElement("p", "");
    let x = 1;
    let y;
    let i = 0;
    let s;
    let strings;
    let lead;
    let results,
      line;
    let mark;
    let mickey;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 1.65);

    };
    p.preload = () => {
      // Preloading the section with question & buttons
      mark = p.loadImage("mark.png");
      mickey = p.loadImage("mickey.png");

    };

    p.draw = () => {
      overMark();
      overMickey();
      p.image(mark, p.windowWidth - 350, 150, 400, 400);
      p.image(mickey, 50, 0, 250, 250);

    };

    function gotData(data) {
      // retrieving data from the NYTIMES API from both most emailed + most shared on fb
      results = data.results;
      getHeadlines();
      printQueue();
      // getKeywords();
    }
    function overMickey() {
      if (p.mouseX > 0 && p.mouseX < p.width / 6 && p.mouseY > 0 && p.mouseY < p.windowHeight / 3.3) {
        loadEmailResults();
        tintOtherImg();
        p.noLoop();
      }
    }
    function overMark() {
      // p.text(title, 500, 500);
      p.loop();
      if (p.mouseX > p.width / 1.1 && p.mouseY > p.height / 3 && p.mouseY < p.height) {
        loadFbResults();
        tintOtherImg()
        p.noLoop();
      }

    }

    // Functions
    // --------------------------------------------------
    function loadFbResults() {
      title = "The most shared articles on Facebook are"
      x = 0;
      y = p.windowWidth / 2;
      fetch(mostFacebooked)
      .then(response => response.json())
      .then(gotData)
       .catch(err => console.log('error communicating with api'))
    }
    function loadEmailResults() {
      x = p.windowHeight / 5;
      y = p.windowWidth / 8;
      title = "error communicating with api";

      fetch(mostEmailed)
      .then(response => response.json())
      .then(gotData)
       .catch(err => console.log('error'))

    }
    function getHeadlines() {
      //adding the headlines to the end of the queue [] from the NYTIMES api
      for (let i = 0; i < 10; i++) {
        queue[i] = results[i].title;
      }
    }

    function printQueue() {
      p.fill(255);
      p.textSize(30);
      p.textSize(14);

      if (i < 10) {

        x = x + 20;
        if (i % 2 === 0 || i === 0) {
          s = 0;
          p.fill(245, 100, 104);
        } else {
          p.fill(255);
        }
        line = p.text((i + 1) + ". " + queue[i], y, x);
        ++i;
      }
      let interval = setTimeout(printQueue, 200);
    }

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
      console.log(keywords)
    }
    function tintOtherImg() {
      p.tint(0, 0, 0, 180);
    }

  };
  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (<div ref={this.myRef}>
      <h1 className="App-title">{this.props.title}</h1>
      <div>{JSON.stringify(this.props.myObj)}</div>
    </div>);
  }
}

export default Sketch;
