const { MarkovMachine } = require('./markov');

test('returns some value from input', function() {
    let mm = new MarkovMachine('the');
    let output = mm.makeText();
    expect(output).toMatch(/the/)
})

test('returns string', function() {
    let mm = new MarkovMachine('the cat in the hat is in the house');
    let output = mm.makeText();
    expect(output).toEqual(expect.any(String))
})

test('chains length', function() {
    let mm = new MarkovMachine('the cat in the hat is in the house');
    let chains = mm.chains
    let chainsKeysArr = Array.from(chains.keys());
    expect(chainsKeysArr.length).toEqual(6);
})

test('expect MarkovMachine', () => {
    let mm = new MarkovMachine('the cat in the hat is in the house');
    expect(mm).toEqual(expect.any(MarkovMachine))
})

test('throw error if invalid input', function() {
    expect(() => {
        let mm = new MarkovMachine([1,2,3,4]);
    }).toThrow('text.split is not a function')
})

test('throw error if no input', function() {
    expect(() => {
        let mm = new MarkovMachine();
    }).toThrow("Cannot read property 'split' of undefined")
})