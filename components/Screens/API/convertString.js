
const chuanhoa = async(str)=> {
    let z = str.trim();
      let mang = z.split(' ');
      let chuanhoa ='';
      mang.map(e => {
          if(e !== '')
          {
              chuanhoa += e+' ';
          }
      })
      return chuanhoa;
  }

  export default chuanhoa;