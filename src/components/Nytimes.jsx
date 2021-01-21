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
    let i = 0;
    let y;
    let s;
    let emailButton
    let title = "New York Times Transmission of Articles";
    let headline = p.createElement("p", "");

    let strings;
    let lead;
    let results,
      line;
    let mark;
    let mickey;
    let facebookFlag = false;
    let emailFlag = false;
    let markImg = {
      img: mark,
      x: p.windowWidth - 350,
      y: 150,
      width: 400,
      height: 400
    };

    let mickeyImg = {
      img: mickey,
      x: 50,
      y: 0,
      width: 250,
      height: 250
    };

    let facebookRes = {
      x: 1,
      y,
      title: "The most shared articles on Facebook are",
      apiUrl: "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?" + apiKey,
      img: "mark.png",
      results: [],
      queue: []
    };

    let emailRes = {
      x: 1,
      y,
      title: "The most emailed articles are",
      apiUrl: "https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?" + apiKey,
      img: "mickey.png",
      results: [],
      queue: []
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 1.65);
    };
    p.preload = () => {
      // Preloading the section with question & buttons
      mickey = p.loadImage(emailRes.img);
      mark = p.loadImage(facebookRes.img);
    };

    p.draw = () => {
      overImage();
      p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);
      p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);
    };

    function overImage() {
      let overMickey = p.mouseX > 0 && p.mouseX < p.width / 6 && p.mouseY > 0 && p.mouseY < p.windowHeight / 3.3;
      let overMark = p.mouseX > p.width / 1.1 && p.mouseY > p.height / 3 && p.mouseY < p.height;

      if (overMickey) {
        emailFlag = true;
        loadEmailResults();
      }
      if (overMark) {
        facebookFlag = true;
        loadFbResults();

        setTimeout(loadEmailResults, 2000);
      }
    }

    // Functions
    // --------------------------------------------------
    function loadFbResults() {
      facebookRes.x = 0;
      facebookRes.y = p.windowWidth / 2;
      fetch(facebookRes.apiUrl).then(response => response.json()).then(gotData).catch(err => console.log('error communicating with api'));
      p.noLoop();
    }
    function loadEmailResults() {
      emailRes.x = p.windowHeight / 5;
      emailRes.y = p.windowWidth / 8;
      fetch(emailRes.apiUrl).then(response => response.json()).then(gotData).catch(err => console.log('error'));
      p.noLoop();
    }

    function gotData(data) {
      // retrieving data from the NYTIMES API from both most emailed + most shared on fb
      if(facebookFlag){
        facebookRes.results = data.results;
      }
      if(emailFlag){
        emailRes.results = data.results;

      }
      getHeadlines();
      printQueue();
      // printFbQueue();
      getKeywords();
    }

    function getHeadlines() {
      if (facebookFlag) {
        for (let i = 0; i < 10; i++) {
          facebookRes.queue[i] = facebookRes.results[i].title;
        }
      } if(emailFlag) {
        for (let i = 0; i < 10; i++) {
          emailRes.queue[i] = emailRes.results[i].title;
      }
    }
  }
    function printQueue() {
      p.fill(255);
      p.textSize(30);
      p.textSize(14);

      if (i < 10) {
        if (emailFlag) {
          emailRes.x = emailRes.x + 20;
        }
        if (facebookFlag) {
          facebookRes.x = facebookRes.x + 20;
        }
        if (i % 2 === 0 || i === 0) {
          p.fill(245, 100, 104);
        } else {
          p.fill(255);
        }
        if(emailFlag){
        line = p.text((i + 1) + ". \t" + emailRes.queue[i], emailRes.y, emailRes.x);
        facebookFlag = true;
      } if(facebookFlag){
        line = p.text((i + 1) + ". \t" + facebookRes.queue[i], facebookRes.y, facebookRes.x);
      }
        ++i;
      }

      let interval = setTimeout(printQueue, 100);

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
