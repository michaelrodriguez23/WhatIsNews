import React, {Component} from "react";
import p5 from "p5";

class Sketch extends React.Component {
  state = {
    count: '0'
  }
  constructor(props) {
    super(props); // this calls the base class constructor
    this.myRef = React.createRef();
    this.state = {
      message: 'Welcome',
      ingredients: []
    }
  }
  Sketch = (p) => {
    // Global Variables //////////////////////////////////////////////////////////////////////
    let queue = [];
    let keywords = [];
    let apiKey = process.env.API_KEY;
    let myFont;
    let currHeadline;
    let i = 0;
    let k = 0;
    let q = 0;
    let tintFlag = false;
    let bottomBuffer;
    let topBuffer;
    let strings;
    let results,
      line;
    let mark;
    let mickey;
    // Images ///////////////////////////////////////////////////////////////////////////
    let markImg = {
      img: mark,
      x: p.windowWidth / 1.25,
      y: 150,
      width: p.windowWidth / 5,
      height: p.windowWidth / 5
    };
    let mickeyImg = {
      img: mickey,
      x: p.windowWidth / 30,
      y: 0,
      width: p.windowWidth / 8,
      height: p.windowWidth / 8
    };
    // API Results/////////////////////////////////////////////////////////////////////////////
    let facebookRes = {
      x: p.windowWidth / 2,
      y: p.windowHeight / 10,
      leadX:p.windowWidth/2,
      leadY:p.windowHeight,
      title: "The most shared articles on Facebook are",
      apiUrl: "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?" + apiKey,
      img: "mark.png",
      tinted: false,
      results: [],
      flag: false,
      queue: []
    };

    let emailRes = {
      x: p.windowWidth / 7,
      y: p.windowHeight / 10,
      leadX:p.windowWidth/2,
      leadY:p.windowHeight/2,
      title: "The most emailed articles are",
      apiUrl: "https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?" + apiKey,
      img: "mickey.png",
      tinted: false,
      results: [],
      flag: false,
      queue: []
    };
    //  Headline Object/////////////////////////////////////////////////////////////////////////////
    let KeywordObj = {
      x: '',
      y: '',
      text: ''
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 1.9);
      p.fill(255)
      p.textSize(60)
      p.text("<-- EMAILS", emailRes.leadX, emailRes.LeadY);
      p.text(" FACEBOOK --> ", facebookRes.leadX, facebookRes.leadY)
      bottomBuffer = p.createGraphics(p.windowWidth / 1.5, p.windowHeight / 10); //size
      // topBuffer = p.createGraphics(p.windowWidth / 5, p.windowHeight / 4);
    };
    p.preload = () => {
      console.log(apiKey);
      // Preloading the section with question & buttons
      mickey = p.loadImage(emailRes.img);
      mark = p.loadImage(facebookRes.img);
      myFont = p.loadFont('Chomsky.otf');
      // API CALLS -> Response -> JSON -> Success -> Extract Data  Fail -> Console.log Err
      fetch(emailRes.apiUrl).then(response => response.json()).then(emailJSONtoData).catch(err => console.log('error'));
      fetch(facebookRes.apiUrl).then(response => response.json()).then(fbJSONtoData).catch(err => console.log('error communicating with api'));
    };
    p.draw = () => {
        drawKeywords();
      p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);
      p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);
      overImage();

    };
    // Functions /////////////////////////////////////////////////////////////////////////

    function drawKeywords() {
      const bb = p.image(bottomBuffer, p.width / 5, 0); // location of buffer
      p.textSize(12)
       // p.text('The Topics We Consume',p.width/2.3,10)
      bottomBuffer.textFont(myFont);
      bottomBuffer.background(0);
      bottomBuffer.fill(255);
      bottomBuffer.textSize(bottomBuffer.width / 17);
      bottomBuffer.textFont(myFont)
      if (q < 90) {
        q=p.floor(p.mouseX/20);
        bottomBuffer.background(0);
        //location of buffer
        currHeadline = bottomBuffer.text(keywords[q], bottomBuffer.width / 12, bottomBuffer.height / 1.5);
      } else {
        q = 1;
      }
    }
    // Converting JSON -> Pushing it to each array
    function emailJSONtoData(data) {
      emailRes.results = data.results;
      getKeywords();
    }
    function fbJSONtoData(data) {
      facebookRes.results = data.results;
    }

    // If image is hovered over load the results, tint image, and remove keyword instance -> Then print the other results after 2.5 secs.
    function overImage() {


      p.textFont();
      let overMickey = p.mouseX > 0 && p.mouseX < p.width / 6 && p.mouseY > 0 && p.mouseY < p.windowHeight / 3.3;
      let overMark = p.mouseX > p.width / 1.1 && p.mouseY > p.height / 3 && p.mouseY < p.height;
      if (overMickey) {
        emailRes.flag = true;
        loadEmailResults();
        tintOtherImg();
        p.removeElements();
        // bb.hide();
        setTimeout(printAQueue, 2500);
        p.removeElements();
        p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);
          p.noLoop();

      }
      if (overMark) {
        facebookRes.flag = true;
        loadFbResults();
        tintOtherImg();
        p.redraw();
        setTimeout(printAQueue, 2500);
        p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);
          p.noLoop();

      }
    }

    function loadFbResults() {
      getHeadlines();
      printQueue();
      // p.noLoop();
    }
    function loadEmailResults() {
      getHeadlines();
      printQueue();
      // p.noLoop();

    }
    // Boolean logic to stream data results from the two api queries
    function gotData(data) {
      if (facebookRes.flag) {
        facebookRes.results = data.results;
      }
      if (emailRes.flag) {
        emailRes.results = data.results;
      }
      getHeadlines();
      printQueue();
    }
    // Pushings results to its respectively array
    function getHeadlines() {
      for (let i = 0; i < 10; i++) {
        emailRes.queue[i] = emailRes.results[i].title;
        facebookRes.queue[i] = facebookRes.results[i].title;
      }
    }
    // Printing Animation : Create Space Between Headlines, and style text if even/odd.
    function printQueue() {
      p.fill(255);
      p.textSize(30);
      p.textSize(15);
      if (i < 10) {
        if (emailRes.flag) {
          emailRes.y = emailRes.y + 25;
        }
        if (facebookRes.flag) {
          facebookRes.y = facebookRes.y + 25;
        }
        if (i % 2 === 0 || i === 0) {
          p.fill(245, 100, 104);
        } else {
          p.fill(255);
        }
        if (emailRes.flag) {
          line = p.text((i + 1) + ". " + emailRes.queue[i], emailRes.x, emailRes.y);
        }
        if (facebookRes.flag) {
          p.text((i + 1) + ". " + facebookRes.queue[i], facebookRes.x, facebookRes.y);
        }
        ++i;
      }
      let interval = setTimeout(printQueue, 100);
    }
    // Printing Animation for the data that wasn't initially loaded. * * Refactor so its DRY?
    function printAQueue() {
      p.loop();
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
        if (emailRes.flag) {
          p.text((k + 1) + ". " + facebookRes.queue[k], facebookRes.x, facebookRes.y);
          p.redraw();
          p.noTint();
          p.image(mark, markImg.x, markImg.y, markImg.width, markImg.height);
        }
        if (facebookRes.flag) {
          line = p.text((k + 1) + ". " + emailRes.queue[k], emailRes.x, emailRes.y);
          p.redraw();
          p.noTint();
          p.image(mickey, mickeyImg.x, mickeyImg.y, mickeyImg.width, mickeyImg.height);
        }
        ++k;
        tintFlag = true;
      }
      let intervalA = setTimeout(printAQueue, 100);
    }
    function tintOtherImg() {
      if(!tintFlag){
      p.tint(0, 0, 0, 180);
    }
  }

    // Iterating through each article, and inside the nested array & pushing it into keywords arr
    function getKeywords() {
      for (let i = 0; i < emailRes.results.length; i++) {
        strings = emailRes.results[i].des_facet;
        for (let j = 0; j < emailRes.results.length; j++) {
          if (emailRes.results[i].des_facet[j]) {
            keywords.push(emailRes.results[i].des_facet[j]);
          }
        }
      }
    }
  };
  // Mounting p5 as an instance.
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
