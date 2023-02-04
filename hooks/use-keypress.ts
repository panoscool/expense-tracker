import { useState, useEffect } from 'react';
import { KeyPress } from '../lib/interfaces/calculator';

function useKeyPress() {
  // State for keeping track of the value of the pressed key
  const [keyCode, setKeyCode] = useState<KeyPress | null>(null);

  // Add event listeners
  useEffect(() => {
    function downHandler(event: KeyboardEvent) {
      const { key, code } = event;
      // detect combination of shiftKey and set the state with the combination
      if (event.shiftKey && code.match(/Digit8|Minus|Equal/)) {
        setKeyCode({ key, code });
        return;
      }

      setKeyCode({ key, code });
    }

    const upHandler = () => {
      setKeyCode(null);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyCode;
}

export default useKeyPress;
