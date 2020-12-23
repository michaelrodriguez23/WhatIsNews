import React from 'react'
import p5 from 'p5'
let x = 1;
let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=dystopia&api-key=QAxdBlc0xuqLooRSPDBfuLaec4GwdRhU'


class Sketch extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }
    Sketch = (p) => {
        p.preload = () => {
        }
        p.setup = () => {
            p.createCanvas(p.windowWidth,p.windowHeight/2.5)
            p.loadJSON(url, gotData);
        }

        function gotData(data){
          var articles = data.response.docs;

          for(var i = 0; i < articles.length; i++){
          p.createElement('h1', articles[i].headline.main);
          p.createP(articles[i].snippet);
          }
        }

        p.draw = () => {
        drawCircles()

    }

          function drawCircles() {
              p.background(245,100,104);
              p.stroke(127, 19, 120);
              p.fill(39,24,79);
              p.stroke(127, 63, 120);
              p.circle(p.width / 2 -(x), p.height / 2, x); // left
              p.circle(p.width / 2, p.height / 2,x-(.8*x));// middle
              p.circle(p.width / 2 +(x), p.height / 2, x+90);// right
              x+=1.5;
            }

          }
    componentDidMount() {
        //We create a new p5 object on component mount, feed it
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }


    render() {
        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef}>

            </div>
        )
    }
}

export default Sketch
