import React, {Component} from "react";
import p5 from "p5";

class Sketch extends React.Component {
  state = {
    count: '0'
  }
  constructor(props) {
    super(props); // THIS CALLS THE BASE CLASS CONSTRUCTOR
    this.state = {
      message: 'Welcome',
      ingredients: []
    }
    this.myRef = React.createRef();

  }
  Sketch = (p) => {
    let queue = [];
    let keywords = [];
    let apiKey = "api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU";
    let myFont;
    let i = 0;
    let k = 0;
    let q = 0;
    // let r = p.random(0, 20);
    let r = 0;
    let t = 0;
    let y;
    let s;
    let bottomBuffer;
    let topBuffer;
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
      x: p.windowWidth / 2,
      y: p.windowHeight / 10,
      title: "The most shared articles on Facebook are",
      apiUrl: "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?" + apiKey,
      img: "mark.png",
      tinted: false,
      results: [],
      queue: []
    };

    let emailRes = {
      x: p.windowWidth / 7,
      y: p.windowHeight / 10,
      title: "The most emailed articles are",
      apiUrl: "https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?" + apiKey,
      img: "mickey.png",
      tinted: false,
      results: [],
      queue: []
    };
    let ingredient = {
      x: '',
      y: '',
      text: ''
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
       bottomBuffer = p.createGraphics(p.windowWidth, 400);
       topBuffer = p.createGraphics(p.windowWidth,p.windowHeight/4)
      p.fill(255)
      p.textSize(60)
      p.text("<-- EMAILS", emailRes.x + 90, emailRes.y - 30)
      p.text(" FACEBOOK --> ", facebookRes.x + 200, emailRes.y + 400)

    };
    p.preload = () => {
      // Preloading the section with question & buttons
      mickey = p.loadImage(emailRes.img);
      mark = p.loadImage(facebookRes.img);
      fetch(emailRes.apiUrl).then(response => response.json()).then(emailJSONtoData).catch(err => console.log('error'));
      fetch(facebookRes.apiUrl).then(response => response.json()).then(fbJSONtoData).catch(err => console.log('error communicating with api'));
      myFont = p.loadFont('Chomsky.otf')
    };

    p.draw = () => {
      p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);
      p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);
      drawBottomBuffer();
      p.image(bottomBuffer, 400, 4000);
      overImage();

      // this.setState({ingredients: keywords})

    };
    /* Functions
     --------------------------------------------------
     */
     function drawBottomBuffer() {
    bottomBuffer.background(0);
      bottomBuffer.fill(39,24,79);
    bottomBuffer.textSize(bottomBuffer.width/25);
    bottomBuffer.textFont(myFont)
    if (q < 100) {
      q++

    bottomBuffer.text(keywords[89],bottomBuffer.width/25, bottomBuffer.height/1.4);
}

}
    function ingredientAnimation() {
        p.image(bottomBuffer,400,400)
      bottomBuffer.textFont(myFont)
      p.textSize(p.width / 15);




    }
    function emailJSONtoData(data) {
      emailRes.results = data.results;
      getKeywords();
    }
    function fbJSONtoData(data) {
      facebookRes.results = data.results;
    }
    function overImage() {
      p.textFont();
      let overMickey = p.mouseX > 0 && p.mouseX < p.width / 6 && p.mouseY > 0 && p.mouseY < p.windowHeight / 3.3;
      let overMark = p.mouseX > p.width / 1.1 && p.mouseY > p.height / 3 && p.mouseY < p.height;

      if (overMickey) {
        emailFlag = true;
        loadEmailResults();
        tintOtherImg();
        p.redraw();
        setTimeout(printAQueue, 2500);

        p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);

      }
      if (overMark) {
        facebookFlag = true;
        loadFbResults();
        tintOtherImg();
        p.redraw();
        setTimeout(printAQueue, 2500);
        p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);

      }
    }

    function loadFbResults() {
      getHeadlines();
      printQueue();
      p.noLoop();
    }
    function loadEmailResults() {
      getHeadlines();
      printQueue();
      p.noLoop();

    }

    function gotData(data) {
      // retrieving data from the NYTIMES API from both most emailed + most shared on fb
      if (facebookFlag) {
        facebookRes.results = data.results;
      }
      if (emailFlag) {
        emailRes.results = data.results;
      }
      getHeadlines();
      printQueue();

    }

    function getHeadlines() {

      for (let i = 0; i < 10; i++) {
        emailRes.queue[i] = emailRes.results[i].title;
        facebookRes.queue[i] = facebookRes.results[i].title;

      }
    }
    function printQueue() {
      p.fill(255);
      p.textSize(30);
      p.textSize(15);
      if (i < 10) {
        if (emailFlag) {

          emailRes.y = emailRes.y + 25;

        }
        if (facebookFlag) {
          facebookRes.y = facebookRes.y + 25;
        }
        if (i % 2 === 0 || i === 0) {
          p.fill(245, 100, 104);
        } else {
          p.fill(255);

        }
        if (emailFlag) {
          line = p.text((i + 1) + ". " + emailRes.queue[i], emailRes.x, emailRes.y);

        }
        if (facebookFlag) {

          p.text((i + 1) + ". " + facebookRes.queue[i], facebookRes.x, facebookRes.y);

        }
        ++i;
      }

      let interval = setTimeout(printQueue, 100);
    }
    function printAQueue() {
      p.fill(255);
      p.textSize(30);
      p.textSize(15);

      if (k < 10) {

        facebookRes.y = facebookRes.y + 25;
        emailRes.y = emailRes.y + 25;

        if (k % 2 === 0 || k === 0) {
          p.fill(245, 100, 104);
        } else {
          p.fill(255);
        }
        if (emailFlag) {
          p.text((k + 1) + ". " + facebookRes.queue[k], facebookRes.x, facebookRes.y);
          p.redraw();
          p.noTint();
          p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);
        }
        if (facebookFlag) {
          line = p.text((k + 1) + ". " + emailRes.queue[k], emailRes.x, emailRes.y);
          p.redraw();
          p.noTint();
          p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);
        }
        ++k;
      } else {
        setTimeout(ingredientAnimation(),5000)
      }

      let intervalA = setTimeout(printAQueue, 100);
    }

    function getKeywords() {
      // Iterating through each article, and inside the nested array.
      for (let i = 0; i < emailRes.results.length; i++) {
        strings = emailRes.results[i].des_facet;
        for (let j = 0; j < emailRes.results.length; j++) {
          if (emailRes.results[i].des_facet[j]) {
            keywords.push(emailRes.results[i].des_facet[j]);
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
      <h1>{this.formatCount()}</h1>

      <div>{JSON.stringify(this.props.myObj)}</div>

    </div>);
  }
  formatCount() {
    const {count} = this.state;
    return count == 0
      ? 'Zero'
      : count;
  }
}

// <ul>
//
//          {this.state.ingredients.map(
//            (value ,index) => <li> { '# '}{ value }</li>)}
//          </ul>

export default Sketch;
