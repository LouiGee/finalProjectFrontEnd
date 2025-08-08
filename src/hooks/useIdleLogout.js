import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../services/authenticationService.js'

// Hooks are reusable pieces of code that can be accessed across components
// They hook into the React features 'State'(store and update data that triggers and re-render), 'Effects'(fetching data) and 'Context'(reading shared data)

const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 Minutes


// Every time an event occurs (mousemove, keydown, click, scroll, touchstart) this code will reset the timer
// If the timer reaches 3 minutes i.e no event has occured in 3 minutes, the code will time out (line 26)
const useIdleLogout = () => {

  // Initialise variables
  const navigate = useNavigate();
  const timerRef = useRef();

  // 'Use effect' means the following code is run after every render
  useEffect(() => {

    // Reset timer function
    const resetTimer = () => {

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logout, IDLE_TIMEOUT);

    };

    // Start timer on mount - adding it the DOM (Document Object Model)
    resetTimer(); 

    // Reset timer on following event occuring
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer)); 

    // Logout function that is embedded within reset timer function(line 26)
    async function logout () {

      try {

              const service = new authenticationService();
              await service.logoutRequest();  
              alert('Session timed out due to inactivity.');     
                  
              } catch (error) {
                  console.error('Failed to logout:', error);
              }
    
    };
 
   // Clean up, remove the event listeners and clear the idle timer
   // Occurs when the component using this hook unmounts (Navigates to another page)
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [navigate]);
};

export default useIdleLogout;
