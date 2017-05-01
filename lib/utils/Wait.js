function Wait(n, cb){
  return () => --n == 0 && cb();
}

module.exports = Wait;
