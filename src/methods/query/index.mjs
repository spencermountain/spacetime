'use strict';
import normal from './normal'
import destructive from './destructive'
import tricky from './tricky'

const addMethods = Space => {
  //hook the methods into prototype
  Object.keys(normal).forEach(k => {
    Space.prototype[k] = normal[k];
  });
  Object.keys(destructive).forEach(k => {
    Space.prototype[k] = destructive[k];
  });
  Object.keys(tricky).forEach(k => {
    Space.prototype[k] = tricky[k];
  });
};

export default addMethods;
