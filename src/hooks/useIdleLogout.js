import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../services/authenticationService.js'

const IDLE_TIMEOUT = 3 * 60 * 1000; // 10 Seconds

const useIdleLogout = () => {

    const navigate = useNavigate();
    const timerRef = useRef();

  useEffect(() => {

    const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, IDLE_TIMEOUT);
    };

    resetTimer(); // Start timer on mount

    // Reset timer on activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer)); 

    async function logout () {

    try {

            const service = new authenticationService();
            await service.logoutRequest();  
            alert('Session timed out due to inactivity.');     
                
            } catch (error) {
                console.error('Failed to login:', error);
            }
    
  };

    
    

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [navigate]);
};

export default useIdleLogout;
