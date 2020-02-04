import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Summary = ({summary}) => {

  var aboveBelowClass="text-warning";
  var aboveBelow="equal to";
  var percent = "";

  var regionalGrowthClass = "text-warning";
  var nationalGrowthClass = "text-warning";

  var regionalGrowth = "0%";
  var nationalGrowth = "0%";

  if(summary.jobs.regional > summary.jobs.national_avg && summary.jobs.national_avg > 0) {
    aboveBelowClass="text-success";
    aboveBelow="above";
    percent = Math.round(summary.jobs.regional/summary.jobs.national_avg*100)+"% ";
  }
  if(summary.jobs.regional < summary.jobs.national_avg && summary.jobs.national_avg > 0) {
    aboveBelowClass="text-danger";
    aboveBelow="below";
    percent = Math.round((1-summary.jobs.regional/summary.jobs.national_avg)*100)+"% ";
  }

  if(summary.jobs_growth.regional > 0) {
    regionalGrowthClass = "text-success";
    regionalGrowth = "+" + summary.jobs_growth.regional + "%";
  }
  if(summary.jobs_growth.regional < 0) {
    regionalGrowthClass = "text-danger";
    regionalGrowth = summary.jobs_growth.regional + "%";
  }

  if(summary.jobs_growth.national_avg > 0) {
    nationalGrowthClass = "text-success";
    nationalGrowth = "+" + summary.jobs_growth.national_avg + "%";
  }
  if(summary.jobs_growth.national_avg < 0) {
    nationalGrowthClass = "text-danger";
    nationalGrowth = summary.jobs_growth.national_avg + "%";
  }

  return (
    <Row className="mb-5">
      <Col md className="border-top border-right border-bottom">
        <Container className="align-middle text-center">
          <Row>
            <Col>
              <h1>{summary.jobs.regional}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Jobs </b>({summary.jobs.year})
            </Col>
          </Row>
          <Row>
            <Col>
              {percent}<span className={aboveBelowClass}>{aboveBelow}</span> National average
            </Col>
          </Row>
        </Container>
      </Col>
      <Col md className="border-top border-right border-left border-bottom">
        <Container className="align-middle text-center">
          <Row>
            <Col>
              <h1 className={regionalGrowthClass}>{regionalGrowth}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>%Change </b>({summary.jobs_growth.start_year} to {summary.jobs_growth.end_year})
            </Col>
          </Row>
          <Row>
            <Col>
              Nation: <span className={nationalGrowthClass}>{nationalGrowth}</span>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col md className="border-top border-left border-bottom">
        <Container className="align-middle text-center">
          <Row>
            <Col>
              <h1>${summary.earnings.regional}/hr</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Median Hourly Earnings</b>
            </Col>
          </Row>
          <Row>
            <Col>
              Nation: ${summary.earnings.national_avg}/hr
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>

  )

};

export default Summary
