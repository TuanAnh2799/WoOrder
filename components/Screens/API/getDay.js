const getDay = (data)=> {
    const event = new Date(data);
    return event.toISOString().slice(0,10)
  }

  export default getDay;