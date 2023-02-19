class IntegerSet {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this.set = new Array(maxValue + 1).fill(false);
  }

  insert(element) {
    if (element >= 0 && element <= this.maxValue) {
      this.set[element] = true;
    }
  }

  remove(element) {
    if (element >= 0 && element <= this.maxValue) {
      this.set[element] = false;
    }
  }

  union(otherSet) {
    const unionSet = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      unionSet.set[i] = this.set[i] || otherSet.set[i];
    }
    return unionSet;
  }

  intersection(otherSet) {
    const intersectionSet = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      intersectionSet.set[i] = this.set[i] && otherSet.set[i];
    }
    return intersectionSet;
  }

  difference(otherSet) {
    const differenceSet = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      differenceSet.set[i] = this.set[i] && !otherSet.set[i];
    }
    return differenceSet;
  }

  toString() {
    let str = "{ ";
    for (let i = 0; i <= this.maxValue; i++) {
      if (this.set[i]) {
        str += i + " ";
      }
    }
    str += "}";
    return str;
  }
}

// Exemplo de uso da classe
const setA = new IntegerSet(10);
setA.insert(2);
setA.insert(5);
setA.insert(8);

const setB = new IntegerSet(10);
setB.insert(5);
setB.insert(7);
setB.insert(10);

const setC = setA.union(setB);
console.log(setC.toString()); // { 2 5 7 8 10 }

const setD = setA.intersection(setB);
console.log(setD.toString()); // { 5 }

const setE = setA.difference(setB);
console.log(setE.toString()); // { 2 8 }
