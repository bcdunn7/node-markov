/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i=0; i<this.words.length; i++) {
      if (Object.keys(chains).includes(this.words[i])) {
        if (!chains[this.words[i]].includes(this.words[i+1])) {
          chains[this.words[i]].push(this.words[i+1])
        }
      }
      else {
        chains[this.words[i]] = [this.words[i+1]];
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let output = [Object.keys(this.chains)[0]];
    console.log(output)

    for (let i=0; i<numWords; i++) {
      let curr = output[output.length-1];

      console.log(curr);
      console.log(this.chains[curr])

      let arr = this.chains[curr]

      // arrays.length are not working properly (but it will print to terminal??)
      console.log(arr, arr.length)

      let next = this.chains[curr][Math.floor(Math.random()*(arr.length))]

      output = output.push(next);
    }

    return output;
  }
}

let mm = new MarkovMachine("I could not, would not, on a boat. I will not, will not, with a goat. I will not eat them in the rain. I will not eat them on a train. Not in the dark! Not in a tree! Not in a car! You let me be! I do not like them in a box. I do not like them with a fox. I will not eat them in a house. I do not like them with a mouse. I do not like them here or there. I do not like them anywhere!");
// console.log(mm.chains);

let output = mm.makeText();
console.log(output)