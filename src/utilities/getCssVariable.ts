const getCssVariable = (variableName: string): string => {
  const styles = getComputedStyle(document.body);
  return styles.getPropertyValue(variableName);
}

export default getCssVariable;