import { useState, useEffect } from 'react';

export function TypingText({ value, duration = 3000 }: { value: string; duration?: number }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const total = value.length;
    const delay = duration / total;

    const interval = setInterval(() => {
      setDisplayedText(value.slice(0, i + 1));
      i++;
      if (i >= total) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{displayedText}</span>;
}