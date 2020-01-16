module.exports = function parseStringAsArray(_arrayAsString) {

    return _arrayAsString.split(',').map(item => item.trim())

}