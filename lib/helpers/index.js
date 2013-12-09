var util = require('util');

/**
 *
 * @param status http статус ответа
 * @param body   содержимое ответа
 * @constructor  Наследование от Error необходимо потому, что в ряде модулей cb(err, ... , ...) реагирует на err только, если она является экземляром Error
 */
function Http(status, body) {
    Error.call(this);
    Error.captureStackTrace(this, this);
    this.name = 'Http';
    this.status = status || 200;
    this.body = body || '';
}

util.inherits(Http, Error);

exports.Http = Http;