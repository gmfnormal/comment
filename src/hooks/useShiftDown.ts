import { useEffect, useState } from 'react';

export default (initStatus: boolean = false) => {
  const [status, setStatus] = useState(initStatus);
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (['ShiftLeft', 'ShiftRight'].includes(event.code)) {
        setStatus(true);
      }
    });
    window.addEventListener('keyup', (event) => {
      if (['ShiftLeft', 'ShiftRight'].includes(event.code)) {
        setStatus(false);
      }
    });
  }, []);
  return status;
};