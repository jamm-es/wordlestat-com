import { useState, useEffect, useRef } from 'react';

function NewDataTimer(props) {

  const [curTime, setCurTime] = useState(new Date());
  const targetTime = new Date();
  targetTime.setSeconds(0);
  targetTime.setMilliseconds(0);
  targetTime.setMinutes(Math.ceil(curTime.getMinutes() / 10)*10);
  const targetTimeRef = useRef(targetTime);

  useEffect(() => {
    const interval = setInterval(() => setCurTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeDeltaSeconds = Math.max(Math.floor((targetTimeRef.current - curTime) / 1000), 0);
  return <p>
    New data in {Math.floor(timeDeltaSeconds / 60)}:{(timeDeltaSeconds % 60).toString().padStart(2, '0')}
    {timeDeltaSeconds === 0 && <a className='link-info' style={{ 'marginLeft': '1rem' }} onClick={() => window.location.reload()}>Refresh</a>}
  </p>
}

export default NewDataTimer;