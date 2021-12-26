const formatCash =(str)=> {
  var money = '' + str;
  return money
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + '.') + prev;
    });
}
 export default formatCash;
