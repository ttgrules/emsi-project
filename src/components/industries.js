import React, {Component} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NumberComma from './number-comma';


class Industries extends Component {

  renderTable(industries) {
    return industries.map((industry,index) => {
      var width_style={
        //since the parent td is 50% of table width
        //and it looks better if you base the bar graph
        //off the full width
        //we either divide by 0.5 or multiply by 2
        //to make the percentage based off the full table width
        width: industry.percent_in_industry*2 + "%"
      };
      return (
        <tr key={industry.key}>
          <td className="w-50 parent_td text-nowrap"><div className="industry_bar" style={width_style} />{industry.title}</td>
          <td className="text-right"><NumberComma number={industry.in_occupation_jobs} decimals={0} /></td>
          <td className="text-right">{industry.percent_in_industry}%</td>
          <td className="text-right">{industry.industry_percent_of_total}%</td>
        </tr>
      );
    });
  }


  industry_compare(a,b) {
    if(a.percent_in_industry > b.percent_in_industry) return -1;
    if(a.percent_in_industry < b.percent_in_industry) return 1;

    return 0;
  }

  render() {

    var parsed_industries = this.props.employing_industries.industries;

    const total_jobs = this.props.employing_industries.jobs;

    var biggest_percentage = 0;

    for(var i=0;i<parsed_industries.length;i++) {

      var industry_jobs = parseInt(parsed_industries[i].jobs);
      var occupation_industry_jobs = parseInt(parsed_industries[i].in_occupation_jobs);

      parsed_industries[i].key = parsed_industries[i].title;
      parsed_industries[i].percent_in_industry = Math.round(occupation_industry_jobs/total_jobs*1000)/10;
      parsed_industries[i].industry_percent_of_total = Math.round(occupation_industry_jobs/industry_jobs*1000)/10;

      if(parsed_industries[i].percent_in_industry > biggest_percentage) biggest_percentage=parsed_industries[i].percent_in_industry;

    }

    parsed_industries.sort(this.industry_compare);

    return (
      <Row className="mb-5">
        <Col>
          <table className="table table-hover table-responsive-lg">
            <thead>
              <tr>
                <th scope="col" className="w-50">Industry</th>
                <th scope="col" className="text-right">Occupation Jobs in Industry ({this.props.employing_industries.year})</th>
                <th scope="col" className="text-right">% of Occupation in Industry ({this.props.employing_industries.year})</th>
                <th scope="col" className="text-right">% of Total Jobs in Industry ({this.props.employing_industries.year})</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable(parsed_industries)}
            </tbody>
          </table>
        </Col>
      </Row>
    );

  }

}

export default Industries
