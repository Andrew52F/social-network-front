export const scrollToCoordinates = (xCoord: number, yCoord:number) => {
  document.querySelector('#topDiv')?.scrollIntoView()
  // document.querySelector('#topDiv')?.scrollTo({top: xCoord, behavior: 'smooth'})
  // window.scrollTo(xCoord, yCoord);
};