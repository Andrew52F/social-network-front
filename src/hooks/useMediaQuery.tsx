import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean | null   =>  {
  const [ isMatches, setIsMatches] = useState <boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== isMatches) {
      setIsMatches(media.matches);
    }
    const listener = (e: Event) => setIsMatches(media.matches);
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isMatches, query])

  return isMatches;
}

export default useMediaQuery;