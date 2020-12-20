
import React from 'react'
import p5 from 'p5'
let x = 1;
let capture;
class Sketch extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {

        // Native p5 functions work as they would normally but prefixed with
        // a p5 object "p"
        p.setup = () => {
            //Everyhting that normally happens in setup works
            p.createCanvas(p.windowWidth,p.windowHeight/2.5)
            // p.capture = p.createCapture(p.VIDEO);

        }

        p.draw = () => {
        drawCircles()

        // p.capture.size(320, 240);
        //
        // p.image(capture, 0, 0, 320, 240);
        // p.filter(p.INVERT);


    }



          function drawCircles() {
               p.background(245,100,104);
              p.stroke(127, 19, 120);
                // p.circle(p.width / 2 -(x), p.height / 2, x);
              p.fill(39,24,79);
              p.stroke(127, 63, 120);
              p.circle(p.width / 2 -(x), p.height / 2, x); // left
              p.circle(p.width / 2, p.height / 2,x-(.8*x));// middle
              p.circle(p.width / 2 +(x), p.height / 2, x+90);// right
              x+=1.5;

              console.log(x)

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
