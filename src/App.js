import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Summary from './components/summary';
import Trend from './components/trend';
import Industries from './components/industries';

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
      //catch request errors
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
      return (
        <Container>
          <Jumbotron className="text-center mt-5 bg-danger">
            <h1 className="display-4">Error!</h1>
            {error.message}
          </Jumbotron>
        </Container>
      );
    }
    else if (!isLoaded) {
      return (
        <Container>
          <Jumbotron className="text-center mt-5">
            <h1 className="display-4">Loading...</h1>
          </Jumbotron>
        </Container>
      );
    }
    else {
      //the mocky sample api response is missing the 6th year of national trend data
      //Kaleb said just make one up so the following lines adds it if it is missing
      if(responseData.trend_comparison.nation.length < responseData.trend_comparison.regional.length) {
        responseData.trend_comparison.nation.push(331572);
      }

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
          <hr />
          <Trend trend_comparison={responseData.trend_comparison}/>
          <Row>
            <h3>Industries Employing {responseData.occupation.title}</h3>
          </Row>
          <Industries employing_industries={responseData.employing_industries}/>
        </Container>
        </>
      );
    }
  }

}


export default App;
