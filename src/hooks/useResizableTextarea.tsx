import { useEffect, useRef, useState } from 'react';

interface UseAutosizeTextAreaOptions {
  minRows?: number;
  maxRows?: number;
}

interface UseAutosizeTextAreaResult {
  ref: React.RefObject<HTMLTextAreaElement>;
  rows: number;
}

const useAutosizeTextArea = ({ minRows = 1, maxRows = 999 }: UseAutosizeTextAreaOptions = {}): UseAutosizeTextAreaResult => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(minRows);

  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) {
      return;
    }

    const borderHeight = parseInt(getComputedStyle(textarea).getPropertyValue('border-top-width')) + parseInt(getComputedStyle(textarea).getPropertyValue('border-bottom-width'));
    const lineHeight = parseInt(getComputedStyle(textarea).getPropertyValue('line-height'));

    const calculateRows = () => {
      const currentRows = Math.ceil((textarea.scrollHeight - borderHeight) / lineHeight);
      setRows(Math.min(Math.max(minRows, currentRows), maxRows));
    };

    calculateRows();

    textarea.addEventListener('input', calculateRows);

    return () => {
      textarea.removeEventListener('input', calculateRows);
    };
  }, [minRows, maxRows]);

  return { ref, rows };
};

export default useAutosizeTextArea;
