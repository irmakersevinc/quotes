import React, { Component } from 'react';
//import './App.css';
import { Button } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { CardSubtitle } from 'reactstrap';
import { CardText } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import { CardFooter } from 'reactstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
//import { Text } from 'reactstrap';
import { ToastHeader } from 'reactstrap';
import { ToastBody } from 'reactstrap';
// import { Col } from 'reactstrap';


//import Card from './App.js';
class App extends Component {

  constructor(props) {
    super(props);

    this.onClickButton = this.onClickButton.bind(this);
    this.state = {
      items: [],
      isLoaded: false,
      random: ""
    }
  }
  HelloWorld() {
    const styleObj = {
      fontSize: 14,
      color: "#4a54f1",
      textAlign: "center",
      paddingTop: "100px",
  }
}
  onClickButton() {
    const rand = Math.floor(Math.random() * 10);
    let itemOfList = this.state.items[rand];
    this.setState({random: itemOfList});
 }

  componentDidMount() {

    fetch('https://quotesondesign.com/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(response => {
        if (response) {
          let sizeResponse = response.length;
          let sentence = "";
          let responseObj = [];
          for(let i = 0; i < sizeResponse; i++){
              sentence = response[i].content.rendered;
              sentence = sentence.replace('<p>','');
              sentence = sentence.replace('</p>','');
              sentence = sentence.replace('&#8217;','');
              responseObj.push(sentence); 
          }
          this.setState({ isLoaded: true,
            items: responseObj});
        }
      })
  }

  render() {

    var { isLoaded, items } = this.state;
    const hStyle = { color: 'blue' };
    //{{ color:'green', fontWeight: 'bold'}};
    const styleObj = {
      fontSize: 18,
      color: "#4a54f1",
      textAlign: "center",
      paddingTop: "100px",
  }
    if (!isLoaded) {
      return <div >
        <p> Loading.. </p>
      </div>
    }

    else {
              
            return (
              <div>
              <div>
              <Row className="justify-content-center bg-light">
                <Col xs="10" md="8" className="p-12">
                <Card className="text-center p-4" body inverse style={{ backgroundColor: '#330300', borderColor: '#333' ,width: '70rem',height:'45rem' }} body outline color="danger" >
                  <CardHeader  tag="h1">QUOTES</CardHeader>
                  {/* #330300 */}
                    <CardBody>
                      <CardTitle tag="h5"></CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                          <CardText>You can see random quotes, if you click the button.</CardText>
                          <ToastBody>
                                <Button color="primary" onClick={this.onClickButton.bind(this)}>Get A Random Quote</Button>

                                <div>
                                  <p style={styleObj}>The quote is: </p> {this.state.random}
                                </div>
                          </ToastBody>
                    </CardBody>
                    {/* <CardFooter>Footer</CardFooter>  */}
                    <footer className="blockquote-footer">
                      Someone famous in <cite title="Source Title">Source Title</cite>
                 </footer>        
                </Card>       
                </Col>
                </Row>
            </div>
            
             {/* <div className="p-3 bg-info my-2 rounded">
             
               <Toast>
                 <ToastHeader>
                   Reactstrap
                   
                 </ToastHeader>
                 <ToastBody>
                 
                 <Button color="primary" onClick={this.onClickButton.bind(this)}>Click</Button>
                                <div>The quote is: {this.state.random}</div>
                                
                 </ToastBody>
                 
               </Toast>
               
             </div> */}
             
             </div>

            )
      
    }

  }

}

export default App;
