import { useLayoutEffect, useRef } from 'react';

function useAutosizeTextArea(initialHeight: number = 0): React.RefObject<HTMLTextAreaElement> {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  
  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = `${initialHeight}px`;

      const handleResize = () => {
        textarea.style.height = `${initialHeight}px`;
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      handleResize();

      textarea.addEventListener('input', handleResize);

      return () => {
        textarea.removeEventListener('input', handleResize);
      };
    }
  }, [initialHeight]);

  return textareaRef;
}


export default useAutosizeTextArea;