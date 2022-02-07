import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';
import * as d3 from 'd3';
import Helmet from 'react-helmet';

import ByRow from './ByRow';
import ByLetter from './ByLetter';
import Wins from './Wins';
import MobileRowLabel from './MobileRowLabel';

import keyPath from './key.svg';
import globalKeyPath from './global_key.svg';

import './stats.css';

function Stats(props) {

  const { wordleNumberParam } = useParams();
  const wordleNumber = +(wordleNumberParam ?? props.wordleNumber);
  const [data, setData] = useState({ byLetter: [], byRow: [], wins: [], total: '?' });
  const [totalData, setTotalData] = useState({ byLetter: [], byRow: [], wins: [], total: '?' });
  const [enableGlobalAverages, setEnableGlobalAverages] = useState(false);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.wordlestat.com/wordle-data/${wordleNumber}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        if(err.response.status === 404) {
          navigate('/not-found', { replace: true });
        }
        else {
          navigate('/error', { replace: true });
        }
      });

    axios.get('https://api.wordlestat.com/total-data')
      .then(res => {
        setTotalData(res.data);
      })
      .catch(err => {
        navigate('/error', { replace: true });
      });
  }, []);

  useEffect(() => {
    console.log(d3.selectAll('.hide-avg-line'));
    if(enableGlobalAverages) {
      d3.selectAll('.hide-avg-line')
        .style('visibility', 'visible');
    }
    else {
      d3.selectAll('.hide-avg-line')
        .style('visibility', 'hidden');
    }
  }, [enableGlobalAverages])

  return <div className='stats-background'>
    {
      typeof wordleNumberParam !== 'undefined' && <Helmet>
        <title>{`Wordle ${wordleNumber}`}</title>
        <meta 
          name='description' 
          content={`Compare your score on Wordle ${wordleNumber} with global overall results. Win rates, guess frequency, difficulty, comparisons, and average Wordle letter and row outcome analysis and statistics for Wordle ${wordleNumber}`}
        />
      </Helmet>
    }
    <main className='wrapper mx-auto px-3'>
      <div className='stats-tooltip position-fixed' ref={tooltipRef} style={{ visibility: 'hidden' }} ></div>
      {
        data.total < 100 && <Alert variant='dark' className='mt-3' >
          <span className='fas fa-exclamation-triangle' /> There {data.total === 1 ? 'is' : 'are'} only {data.total} game{data.total === 1 ? '' : 's'} 
          {} recorded for this wordle!
          That's because this is either a very old or very new wordle. Take the stats here with a grain of salt until
          more data can be collected.
        </Alert>
      }
      <BrowserView>
        <Row className='mt-3'>
          <Col className='col-sidemid'>
            <h4>Distribution of letter guess results</h4>
          </Col>
        </Row>
        <Row>
          <Col className='col-side'>
            <h4>... by row</h4>
          </Col>
          <Col className='col-mid'>
            <h4>... by letter</h4>
          </Col>
          <Col className='col-side'>
            <h4>Game length</h4>
          </Col>
        </Row>
        <Row>
          <Col className='col-side px-0' >
            <ByRow data={data.byRow} totalData={totalData.byRow} tooltipRef={tooltipRef} />
          </Col>
          <Col className='col-mid px-0' >
            <ByLetter data={data.byLetter} totalData={totalData.byLetter} tooltipRef={tooltipRef} />
          </Col>
          <Col className='col-side px-0' >
            <Wins data={data.wins} totalData={totalData.wins} tooltipRef={tooltipRef} />
          </Col>
        </Row>
        <div className='pb-3'>
          <Form.Check 
            type='switch' 
            label='Toggle global averages for guess result distributions' 
            checked={enableGlobalAverages}
            onChange={() => setEnableGlobalAverages(!enableGlobalAverages)}
          />
        </div>
        <Row className='justify-content-center my-3'>
          <div style={{ maxWidth: '429px', height: '156px' }} className='position-relative' >
            <embed className='key-image' src={globalKeyPath} style={{ visibility: enableGlobalAverages ? 'visible' : 'hidden', top: '2px' }} />
            <embed className='key-image' src={keyPath} style={{ visibility: enableGlobalAverages ? 'hidden' : 'visible'}} />
          </div>
        </Row>
      </BrowserView>
      <MobileView>
        <h4 className='mt-3'>Distribution of guess results by letter</h4>
        <ByLetter data={data.byLetter} totalData={totalData.byLetter} tooltipRef={tooltipRef} />
        <div className='d-flex align-end'>
          <div className='col-mobile-side'>
            <h4>Guess results by row</h4>
          </div>
          <div className='col-mobile-mid' />
          <div className='col-mobile-side'>
            <h4>Game length</h4>
          </div>
        </div>
        <div className='d-flex'>
          <div className='col-mobile-side'>
            <ByRow data={data.byRow} totalData={totalData.byRow} tooltipRef={tooltipRef} />
          </div>
          <div className='col-mobile-mid'>
            <MobileRowLabel />
          </div>
          <div className='col-mobile-side'>
            <Wins data={data.wins} totalData={totalData.wins} tooltipRef={tooltipRef} />
          </div>
        </div>
        <div className='pb-3'>
          <Form.Check 
            type='switch' 
            label='Toggle global averages for guess result distributions' 
            checked={enableGlobalAverages}
            onChange={() => setEnableGlobalAverages(!enableGlobalAverages)}
          />
        </div>
        <div className='my-3' style={{ maxWidth: '429px' }}>
          <div style={{ maxWidth: '429px', height: '156px' }} className='position-relative' >
            <embed className='key-image' src={globalKeyPath} style={{ visibility: enableGlobalAverages ? 'visible' : 'hidden', top: '2px' }} />
            <embed className='key-image' src={keyPath} style={{ visibility: enableGlobalAverages ? 'hidden' : 'visible'}} />
          </div>
        </div>
      </MobileView>
      <div className='text-center'>
        <p>Based on {data.total} games</p>
        <p>New data every 10 minutes</p>
      </div>
    </main>
  </div>

}

export default Stats;