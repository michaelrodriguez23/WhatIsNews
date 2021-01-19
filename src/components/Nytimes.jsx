import React from "react";
import p5 from "p5";
// make a flow chart
class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  Sketch = (p) => {
    let title = "New York Times Transmission of Articles";
    const emailButton = p.createButton("Email");
    const fbButton = p.createButton("Facebook");
    let headline = p.createElement("p", "");
    let x = 1;
    let s;
    let emailedPeriod = 1; // 7, 30 most emailed
    let apiKey = "api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU";
    let mostEmailed = "https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?" + apiKey;
    let mostFacebooked = "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?" + apiKey;
    let queue = [];
    let keywords = [];
    let strings;
    let lead;
    let i = 0;
    let button,
      results,
      y,
      line;
    let mark;
    let mickey;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 1.65);
      p.frameRate(60);
    };
    p.preload = () => {
      // Preloading the section with question & buttons
      mark = p.loadImage("mark.png");
      mickey = p.loadImage("mickey.png");
      fbButton.style("background-color:'white';", "color:'green'");
      emailButton.style("background-color:grey;", "color:white");
      emailButton.position(p.windowWidth / 2, p.windowHeight / 2);
      fbButton.position(p.windowWidth / 2 - 100, p.windowHeight / 2);

      emailButton.mousePressed(loadEmailResults);
      fbButton.mousePressed(loadFbResults);

    };

    p.draw = () => {
      p.image(mark, p.windowWidth - 350, 150, 400, 400);
      p.image(mickey, 50, 0, 250, 250);
    };

    function gotData(data) {
      // retrieving data from the NYTIMES API from both most emailed + most shared on fb
      results = data.results;
      getHeadlines();
       // printLead();
      printQueue();
      // getKeywords();
    }

    // Functions
    // --------------------------------------------------
    function loadFbResults() {
      title = "The most shared articles on Facebook are"

      x = 0;
      y = p.windowWidth / 2.9;

      p.loadJSON(mostFacebooked, gotData);
    }
    function loadEmailResults() {
      x = p.windowHeight / 5;
      y = p.windowWidth / 8;
      title = "The most emailed articles. ";
      p.loadJSON(mostEmailed, gotData);
    }
    function getHeadlines() {
      //adding the headlines to the end of the queue [] from the NYTIMES api
      for (let i = 0; i < 10; i++) {
        queue[i] = results[i].title;
      }
    }

    // function printLead() {
    //   p.fill(255);
    //   lead.style("text-align:right;");
    //   lead.style("padding:10px;");
    // }

    function printQueue() {

      p.fill(255);
      p.textSize(30);
      // p.text('title', x, y);
      p.textSize(14);

      if (i < 10) {
        console.log(i,p.millis())
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
      let interval = setTimeout(printQueue, 300);

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
