// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
module.exports = {

  //
  hours: (s, n) => {
    let d = s.d;
    let before = new Date(d.getTime());
    //move it locally
    d.setHours(n);
    //compare before+after
    let diff = before - d.getTime();
    //do the same thing remotely
    return s.epoch - diff;
  }
};
