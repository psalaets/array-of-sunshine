var assert = require('assert');
var array = require('../your-code')();

describe('every()', function() {
  it('is a function', function() {
    assert(typeof array.every === 'function');
  });

  it('passes each array element to fn until fn returns falsey value', function() {
    var elements = [];
    function fn(element) {
      elements.push(element);
      return elements.length < 2;
    }

    array.every(fn);

    assert.deepEqual(elements, ['red', 'green']);
  });

  it('passes indices as second arg to fn until fn returns falsey value', function() {
    var indices = [];
    function fn(element, index) {
      indices.push(index);
      return indices.length < 2;
    }

    array.every(fn);

    assert.deepEqual(indices, [0, 1]);
  });

  it('passes the array as third arg to fn until fn returns falsey value', function() {
    var arrays = [];
    function fn(element, index, arr) {
      arrays.push(arr);
      return arrays.length < 2;
    }

    array.every(fn);

    assert.equal(arrays.length, 2);
    assert(arrays[0] == array, 'array was not passed on iteration 0');
    assert(arrays[1] == array, 'array was not passed on iteration 1');
  });

  it('returns true if fn returns truthy value for all elements', function() {
    function fn(element) {
      return element.length > 2;
    }

    var result = array.every(fn);

    assert.deepEqual(result, true);
  });

  it('returns false if fn returns false for any element', function() {
    function fn(element) {
      return element.length > 3;
    }

    var result = array.every(fn);

    assert.equal(result, false);
  });

  it('does not modify original array', function() {
    var copy = array.slice();

    array.every(function() {
      return 'hi';
    });

    assert.deepEqual(array, copy);
  });

  it('accepts second arg to set "this" of fn', function() {
    var obj = {
      minLength: 3
    };

    function fn(element) {
      return element.length >= this.minLength;
    }

    var result = array.every(fn, obj);

    assert.deepEqual(result, true);
  });
});