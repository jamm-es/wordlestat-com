import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import ByRow from './ByRow';
import ByLetter from './ByLetter';
import Wins from './Wins';
import NewDataTimer from './NewDataTimer';

import './stats.css';

function Stats(props) {

  const { wordleNumberParam } = useParams();
  const wordleNumber = +(wordleNumberParam ?? props.wordleNumber);

  const [data, setData] = useState({ byLetter: [], byRow: [], wins: [], total: '?' });

  const tooltip = useRef(null);

  useEffect(() => {
    axios.get(`https://api.wordlestat.com/wordle-data/${wordleNumber}`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  return <div className='stats-background'>
    <main className='wrapper mx-auto px-2'>
      <div>Test</div>
      <div className='stats-tooltip position-fixed' ref={tooltip} >fjdaskldfljdas</div>
      <Row>
        <Col sm={3}>
          <ByRow data={data.byRow} tooltipRef={tooltip} />
        </Col>
        <Col sm={6}>
          <ByLetter data={data.byLetter}/>
        </Col>
        <Col sm={3}>
          <Wins data={data.wins}/>
        </Col>
      </Row>
      <div className='text-center'>
        <p>Based on {data.total} games</p>
        <NewDataTimer />
      </div>
    </main>
  </div>

}

export default Stats;