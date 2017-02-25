var assert = require('assert');
var array = require('../your-code')();

describe('map()', function() {
  it('is a function', function() {
    assert(typeof array.map === 'function');
  });

  it('passes each array element to fn', function() {
    var elements = [];
    function fn(element) {
      elements.push(element);
    }

    array.map(fn);

    assert.deepEqual(elements, ['red', 'green', 'blue']);
  });

  it('passes indices as second arg to fn', function() {
    var indices = [];
    function fn(element, index) {
      indices.push(index);
    }

    array.map(fn);

    assert.deepEqual(indices, [0, 1, 2]);
  });

  it('passes the array as third arg to fn', function() {
    var arrays = [];
    function fn(element, index, arr) {
      arrays.push(arr);
    }

    array.map(fn);

    assert.equal(arrays.length, 3);
    assert(arrays[0] == array, 'array was not passed on iteration 0');
    assert(arrays[1] == array, 'array was not passed on iteration 1');
    assert(arrays[2] == array, 'array was not passed on iteration 2');
  });

  it('returns new array containing return values of fn', function() {
    function fn(element) {
      return element + ' hi';
    }

    var result = array.map(fn);

    assert(result !== array);
    assert.deepEqual(result, ['red hi', 'green hi', 'blue hi']);
  });

  it('does not modify original array', function() {
    var copy = array.slice();

    function fn() {
      return 'hi';
    }

    array.map(fn);

    assert.deepEqual(array, copy);
  });

  it('accepts second arg to set "this" of fn', function() {
    var obj = {
      suffix: '-fish'
    };

    var elements = [];
    function fn(element) {
      elements.push(element + this.suffix);
    }

    array.map(fn, obj);

    assert.deepEqual(elements, ['red-fish', 'green-fish', 'blue-fish']);
  });
});