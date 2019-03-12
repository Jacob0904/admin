const crypto = require('crypto');
function md5(t){
  return crypto.createHash('md5').update(t).digest('hex');
}
module.exports = md5;
