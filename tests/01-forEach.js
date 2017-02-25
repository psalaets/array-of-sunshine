var assert = require('assert');
var array = require('../your-code')();

describe('forEach()', function() {
  it('is a function', function() {
    assert(typeof array.forEach === 'function');
  });

  it('passes each array element to fn', function() {
    var elements = [];
    function fn(element) {
      elements.push(element);
    }

    array.forEach(fn);

    assert.deepEqual(elements, ['red', 'green', 'blue']);
  });

  it('passes indices as second arg to fn', function() {
    var indices = [];
    function fn(element, index) {
      indices.push(index);
    }

    array.forEach(fn);

    assert.deepEqual(indices, [0, 1, 2]);
  });

  it('passes the array as third arg to fn', function() {
    var arrays = [];
    function fn(element, index, arr) {
      arrays.push(arr);
    }

    array.forEach(fn);

    assert.equal(arrays.length, 3);
    assert(arrays[0] == array, 'array was not passed on iteration 0');
    assert(arrays[1] == array, 'array was not passed on iteration 1');
    assert(arrays[2] == array, 'array was not passed on iteration 2');
  });

  it('returns undefined', function() {
    var returnValue = array.forEach(function() {
      return 1;
    });

    assert.equal(returnValue, undefined);
  });

  it('does not modify original array', function() {
    var copy = array.slice();

    array.forEach(function() {});

    assert.deepEqual(array, copy);
  });

  it('accepts second arg to set "this" of fn', function() {
    var obj = {
      suffix: '-fish'
    };

    var values = [];
    function fn(element) {
      values.push(element + this.suffix);
    }

    array.forEach(fn, obj);

    assert.deepEqual(values, ['red-fish', 'green-fish', 'blue-fish']);
  });
});