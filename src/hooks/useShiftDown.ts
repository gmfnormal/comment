import { useEffect, useState } from 'react';

export default (initStatus: boolean = false) => {
  const [status, setStatus] = useState(initStatus);
  useEffect(() => {
    const handleKeydown = (event) => {
      if (['ShiftLeft', 'ShiftRight'].includes(event.code)) {
        setStatus(true);
      }
    }
    const handleKeyup = (event) => {
      if (['ShiftLeft', 'ShiftRight'].includes(event.code)) {
        setStatus(false);
      }
    }
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    }
  }, []);
  return status;
};