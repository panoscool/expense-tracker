import { useState, useEffect } from 'react';
import { KeyPress } from '../lib/interfaces/calculator';

function useKeyPress() {
  // State for keeping track of the value of the pressed key
  const [keyCode, setKeyCode] = useState<KeyPress | null>(null);

  // Add event listeners
  useEffect(() => {
    function downHandler(event: KeyboardEvent) {
      setKeyCode(null);
    }

    const upHandler = (event: KeyboardEvent) => {
      const { key, code } = event;

      setKeyCode({ key, code });
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
