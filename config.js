const MINE_RATE = 1000; // In milliseconds
const INITIAL_DIFFICULTY = 3;


const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '-----',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    hash: 'hash-one',
    data: []
};

module.exports = {GENESIS_DATA,INITIAL_DIFFICULTY, MINE_RATE};