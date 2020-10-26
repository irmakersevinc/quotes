import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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

  onClickButton() {
    const rand = Math.floor(Math.random() * 10);
    let itemOfList = this.state.items[rand];
    this.setState({random: itemOfList});
 }
  // async componentDidMount() {
  //   const apiResults = await axios.get("https://quotesondesign.com/wp-json/wp/v2/posts");
  //   this.setState({
  //     isLoaded: true,
  //     items: apiResults.data,
  //   });
  // }

  componentDidMount() {

    fetch('https://quotesondesign.com/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(response => {
        if (response) {
          let sizeResponse = response.length;
          let responseObj = [];
          for(let i = 0; i < sizeResponse; i++){
              responseObj.push(response[i].content.rendered); 
          }
          this.setState({ isLoaded: true,
            items: responseObj});
        }
      })
  }

  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div >
        <p> Loading.. </p>
      </div>
    }

    else {
              
    //         const a = this.state.items.map((item, index) => {
    //           return (             
    //               <span>
    //                 <li>
    //                   {item.content.rendered}
    //                 </li>
    //               </span>  
    //           )
    // })
            
            

            return (
              <div>

            <button onClick={this.onClickButton.bind(this)}>Click</button>
            <div>The quote is: {this.state.random}</div>

            
            
            </div>
            )

        //   <div>
        //        {items.map(({ content }) => (
        //            <ul>
        //                {content.map((eachThing) =>
        //                    <li>
        //                        {eachThing.rendered}
        //                  </li>
        //               )}
        //          </ul>
        //       ))}
        // </div>

      
    }

  }

}

export default App;
