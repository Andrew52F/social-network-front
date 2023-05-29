
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateNow = new Date();
  const dateYesterday = new Date(dateNow);
  dateYesterday.setDate(dateNow.getDate() - 1);

  switch (date.toDateString()) {
    case dateYesterday.toDateString():
      return 'yesterday';
    case dateNow.toDateString(): 
      return 'today';
    default: 
      return date.toLocaleDateString([], {day: '2-digit', month:'2-digit', year: '2-digit'})
  }
}

export default formatDate;