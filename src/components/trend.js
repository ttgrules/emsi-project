import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Line} from 'react-chartjs-2';

import NumberComma from './number-comma';
import IconSquare from './iconsquare';
import IconDot from './icondot';
import IconTriangle from './icontriangle';


const Trend = ({trend_comparison}) => {

  //calculate start-end year percent changes
  const regional_start = parseInt(trend_comparison.regional[0]);
  const regional_end = parseInt(trend_comparison.regional[trend_comparison.regional.length-1]);
  const regional_change_percent = Math.round((regional_end-regional_start)/regional_start*1000)/10; //cheap way to get 1 decimal place rounded

  const state_start = parseInt(trend_comparison.state[0]);
  const state_end = parseInt(trend_comparison.state[trend_comparison.state.length-1]);
  const state_change_percent = Math.round((state_end-state_start)/state_start*1000)/10; //cheap way to get 1 decimal place rounded

  const nation_start = parseInt(trend_comparison.nation[0]);
  const nation_end = parseInt(trend_comparison.nation[trend_comparison.nation.length-1]);
  const nation_change_percent = Math.round((nation_end-nation_start)/nation_start*1000)/10; //cheap way to get 1 decimal place rounded

  const regional_color = '#1c008a';
  const state_color = '#1c77ff';
  const nation_color = '#33ccff';

  const options = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: -5,
          suggestedMax: 10,
          stepSize: 1
        },
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
    if(j===0) {
      regional.data.push(0);
      state.data.push(0);
      nation.data.push(0);
    }
    else {
      var last_regional = parseInt(trend_comparison.regional[j-1]);
      var last_state = parseInt(trend_comparison.state[j-1]);
      var last_nation = parseInt(trend_comparison.nation[j-1]);
      regional.data.push(Math.round((this_regional-last_regional)/last_regional*1000)/10);
      state.data.push(Math.round((this_state-last_state)/last_state*1000)/10);
      nation.data.push(Math.round((this_nation-last_nation)/last_nation*1000)/10);
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
        <table className="table table-hover table-responsive-lg">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col" className="w-50">Region</th>
              <th scope="col">{trend_comparison.start_year} Jobs</th>
              <th scope="col">{trend_comparison.end_year} Jobs</th>
              <th scope="col">Change</th>
              <th scope="col" className='text-nowrap'>% Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle"><IconDot className="icon_svg" radius={7.5} color={regional_color} /></td>
              <td>Region</td>
              <td><NumberComma number={regional_start} decimals={0} /></td>
              <td><NumberComma number={regional_end} decimals={0} /></td>
              <td><NumberComma number={regional_end-regional_start} decimals={0} /></td>
              <td>{regional_change_percent}%</td>
            </tr>
            <tr>
              <td className="text-center align-middle"><IconSquare className="icon_svg" size={15} color={state_color} /></td>
              <td>State</td>
              <td><NumberComma number={state_start} decimals={0} /></td>
              <td><NumberComma number={state_end} decimals={0} /></td>
              <td><NumberComma number={state_end-state_start} decimals={0} /></td>
              <td>{state_change_percent}%</td>
            </tr>
            <tr>
              <td className="text-center align-middle"><IconTriangle className="icon_svg" size={15} color={nation_color} /></td>
              <td>Nation</td>
              <td><NumberComma number={nation_start} decimals={0} /></td>
              <td><NumberComma number={nation_end} decimals={0} /></td>
              <td><NumberComma number={nation_end-nation_start} decimals={0} /></td>
              <td>{nation_change_percent}%</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
    </>
  )

};

export default Trend
