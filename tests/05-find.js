var assert = require('assert');
var array = require('../your-code')();

describe('find()', function() {
  it('is a function', function() {
    assert(typeof array.find === 'function');
  });

  it('passes each array element to fn until fn returns truthy value', function() {
    var elements = [];
    function fn(element) {
      elements.push(element);
      return elements.length > 1;
    }

    array.find(fn);

    assert.deepEqual(elements, ['red', 'green']);
  });

  it('passes indices as second arg to fn until fn returns truthy value', function() {
    var indices = [];
    function fn(element, index) {
      indices.push(index);
      return indices.length > 1;
    }

    array.find(fn);

    assert.deepEqual(indices, [0, 1]);
  });

  it('passes the array as third arg to fn until fn returns truthy value', function() {
    var arrays = [];
    function fn(element, index, arr) {
      arrays.push(arr);
      return arrays.length > 1;
    }

    array.find(fn);

    assert.equal(arrays.length, 2);
    assert(arrays[0] == array, 'array was not passed on iteration 0');
    assert(arrays[1] == array, 'array was not passed on iteration 1');
  });

  it('returns first element for which fn returns truthy value', function() {
    function fn(element) {
      return element.length > 3;
    }

    var result = array.find(fn);

    assert.deepEqual(result, 'green');
  });

  it('returns undefined if fn didnt return truthy for any elements', function() {
    function fn(element) {
      return false;
    }

    var result = array.find(fn);

    assert.equal(result, undefined);
  });

  it('does not modify original array', function() {
    var copy = array.slice();

    array.find(function() {
      return 'hi';
    });

    assert.deepEqual(array, copy);
  });

  it('accepts second arg to set "this" of fn', function() {
    var obj = {
      color: 'red'
    };

    function fn(element) {
      return element === this.color;
    }

    var result = array.find(fn, obj);

    assert.deepEqual(result, 'red');
  });
});