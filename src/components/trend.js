import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FlexibleWidthXYPlot, FlexibleXYPlot, LineMarkSeries, YAxis,XAxis,ChartLabel} from 'react-vis';

import '../../node_modules/react-vis/dist/style.css';

const Trend = ({trend_comparison}) => {

  //re-format trend data to by x-y series

  var regional = [];
  var state = [];
  var nation = [];

  var j=1;
  for(var i=trend_comparison.start_year+1;i<trend_comparison.end_year;i++) {
    var this_regional = parseInt(trend_comparison.regional[j]);
    var last_regional = parseInt(trend_comparison.regional[j-1]);
    var this_state = parseInt(trend_comparison.state[j]);
    var last_state = parseInt(trend_comparison.state[j-1]);
    var this_nation = parseInt(trend_comparison.nation[j]);
    var last_nation = parseInt(trend_comparison.nation[j-1]);
    regional.push({x:i,y:(this_regional-last_regional)/last_regional*100});
    state.push({x:i,y:(this_state-last_state)/last_state*100});
    nation.push({x:i,y:(this_nation-last_nation)/last_nation*100});
    j++;
  }

  return (
    <>
    <Row>
      <Col>
        
      </Col>
    </Row>
    <Row className="mb-5">
    </Row>
    </>
  )

};

export default Trend
