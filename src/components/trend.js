import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Line} from 'react-chartjs-2';

const Trend = ({trend_comparison}) => {

  const regional_color = '#1c008a';
  const state_color = '#1c77ff';
  const nation_color = '#33ccff';

  var options = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display:true,
          labelString: "Percent Change"
        },
        gridLines: {
          display:false
        }
      }]
    }
  }

  var labels = [];
  var datasets = [];
  var regional = {
    label: 'regional',
    lineTension:0.05,
    fill:false,
    borderColor: regional_color,
    pointBackgroundColor: regional_color,
    pointStyle: 'circle',
    pointRadius: 5,
    data: []
  };
  var state = {
    label: 'state',
    fill:false,
    lineTension:0.05,
    borderColor: state_color,
    pointBackgroundColor: state_color,
    pointStyle: 'rect',
    pointRadius: 5,
    data: []
  };
  var nation = {
    label: 'nation',
    fill:false,
    lineTension:0.05,
    borderColor: nation_color,
    pointBackgroundColor: nation_color,
    pointStyle: 'triangle',
    pointRadius: 5,
    data: []
  };

  var j=0;
  for(var i=trend_comparison.start_year;i<=trend_comparison.end_year;i++) {
    var this_regional = parseInt(trend_comparison.regional[j]);
    var this_state = parseInt(trend_comparison.state[j]);
    var this_nation = parseInt(trend_comparison.nation[j]);
    labels.push(i);
    if(j==0) {
      regional.data.push(0);
      state.data.push(0);
      nation.data.push(0);
    }
    else {
      var last_regional = parseInt(trend_comparison.regional[j-1]);
      var last_state = parseInt(trend_comparison.state[j-1]);
      var last_nation = parseInt(trend_comparison.nation[j-1]);
      regional.data.push((this_regional-last_regional)/last_regional*100);
      state.data.push((this_state-last_state)/last_state*100);
      nation.data.push((this_nation-last_nation)/last_nation*100);
    }
    j++;
  }
  datasets=[regional,state,nation];

  var data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <>
    <Row className="mb-4">
      <Col>
        <Line data={data} options={options} />
      </Col>
    </Row>
    <Row className="mb-5">
      <Col>
        <table className="table table-hover table-responsive-md">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Region</th>
              <th scope="col">{trend_comparison.start_year} Jobs</th>
              <th scope="col">{trend_comparison.end_year} Jobs</th>
              <th scope="col">Change</th>
              <th scope="col">% Change</th>
            </tr>
          </thead>
        </table>
      </Col>
    </Row>
    </>
  )

};

export default Trend
