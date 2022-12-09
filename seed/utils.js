

function _randomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
    _randomItemFromArray
}