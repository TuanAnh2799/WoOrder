
function convertDate (s) {
    let arr =s.split('-');
    let day = arr[2]+"-"+arr[1]+"-"+arr[0];
    return day;
}
 export default convertDate;