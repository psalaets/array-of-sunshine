var assert = require('assert');
var array = require('../your-code')();

describe('some()', function() {
  it('is a function', function() {
    assert(typeof array.some === 'function');
  });

  it('passes each array element to fn until fn returns truthy value', function() {
    var elements = [];
    function fn(element) {
      elements.push(element);
      return element === 'green';
    }

    array.some(fn);

    assert.deepEqual(elements, ['red', 'green']);
  });

  it('passes indices as second arg to fn until fn returns truthy value', function() {
    var indices = [];
    function fn(element, index) {
      indices.push(index);
      return index > 0;
    }

    array.some(fn);

    assert.deepEqual(indices, [0, 1]);
  });

  it('passes the array as third arg to fn until fn returns truthy value', function() {
    var arrays = [];
    function fn(element, index, arr) {
      arrays.push(arr);
      return index > 0
    }

    array.some(fn);

    assert.equal(arrays.length, 2);
    assert(arrays[0] == array, 'array was not passed on iteration 0');
    assert(arrays[1] == array, 'array was not passed on iteration 1');
  });

  it('returns true if fn returns truthy value for at least one element', function() {
    function fn(element) {
      return element.length > 3;
    }

    var result = array.some(fn);

    assert.deepEqual(result, true);
  });

  it('returns false if fn didnt return truthy for any elements', function() {
    function fn(element) {
      return false;
    }

    var result = array.some(fn);

    assert.equal(result, false);
  });

  it('does not modify original array', function() {
    var copy = array.slice();

    array.some(function() {
      return 'hi';
    });

    assert.equal(array[0], copy[0]);
    assert.equal(array[1], copy[1]);
    assert.equal(array[2], copy[2]);
    assert.equal(array.length, copy.length);
  });

  it('accepts second arg to set "this" of fn', function() {
    var obj = {
      color: 'red'
    };

    function fn(element) {
      return element === this.color;
    }

    var result = array.some(fn, obj);

    assert.deepEqual(result, true);
  });
});