import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Summary from './components/summary';
import Trend from './components/trend';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responseData: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch('https://www.mocky.io/v2/5a29b5672e00004a3ca09d33')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          responseData: result,
          isLoaded: true,
          error: null
        });
      },
      (error) => {
        this.setState({
          responseData: [],
          isLoaded: true,
          error: error
        })
      }
    )
  }

  render() {

    const {responseData, isLoaded, error} = this.state;

    if(error) {
      return <div> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      //the mocky sample api response is missing the 6th year of national trend data
      //Kaleb said just make one up so the following line adds it
      responseData.trend_comparison.nation.push(331572);

      return (
        <>
        <Container>
          <Row className="mb-5">
            <h1>Occupation Overview</h1>
            <h2>{responseData.occupation.title} in {responseData.region.title}</h2>
          </Row>
          <Row>
            <h3>Occupation Summary for {responseData.occupation.title}</h3>
          </Row>
          <Summary summary={responseData.summary}/>
          <Row>
            <h3>Regional Trends</h3>
          </Row>
          <Trend trend_comparison={responseData.trend_comparison}/>
        </Container>
        </>
      );
    }
  }

}


export default App;
