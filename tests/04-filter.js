var assert = require('assert');
var array = require('../your-code')();

describe('filter()', function() {
  it('is a function', function() {
    assert(typeof array.filter === 'function');
  });

  it('passes each array element to fn', function() {
    var elements = [];
    function fn(element) {
      elements.push(element);
    }

    array.filter(fn);

    assert.deepEqual(elements, ['red', 'green', 'blue']);
  });

  it('passes indices as second arg to fn', function() {
    var indices = [];
    function fn(element, index) {
      indices.push(index);
    }

    array.filter(fn);

    assert.deepEqual(indices, [0, 1, 2]);
  });

  it('passes the array as third arg to fn', function() {
    var arrays = [];
    function fn(element, index, arr) {
      arrays.push(arr);
    }

    array.filter(fn);

    arrays.forEach(function(a, i) {
      assert(a == array, 'array was not passed on iteration ' + i);
    });
  });

  it('returns new array containing elements for which fn returned truthy value', function() {
    function fn(element) {
      return element.length > 3;
    }

    var result = array.filter(fn);

    assert(result !== array);
    assert.deepEqual(result, ['green', 'blue']);
  });

  it('returns empty array if fn didnt return truthy for any elements', function() {
    function fn(element) {
      return false;
    }

    var result = array.filter(fn);

    assert.equal(result.length, 0);
  });

  it('does not modify original array', function() {
    var copy = array.slice();

    array.filter(function() {
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

    var result = array.filter(fn, obj);

    assert.deepEqual(result, ['red']);
  });
});