var assert = require('assert');
var array = require('../your-code')();

describe('reduce()', function() {
  it('is a function', function() {
    assert(typeof array.reduce === 'function');
  });

  describe('initial value specified', function() {
    it('passes prev value to each invocation of fn', function() {
      var count = 0;
      var prevs = [];
      function fn(prev) {
        prevs.push(prev);
        return ++count;
      }

      array.reduce(fn, 0);

      assert.deepEqual(prevs, [0, 1, 2])
    });

    it('passes current element to each invocation of fn, starting at beginning of array', function() {
      var currs = [];
      function fn(prev, curr) {
        currs.push(curr);
      }

      array.reduce(fn, 0);

      assert.deepEqual(currs, ['red', 'green', 'blue']);
    });

    it('passes current element index to each invocation of fn, starting at 0', function() {
      var indices = [];
      function fn(prev, curr, index) {
        indices.push(index);
      }

      array.reduce(fn, 0);

      assert.deepEqual(indices, [0, 1, 2]);
    });

    it('passes array to each invocation of fn', function() {
      var arrays = [];
      function fn(prev, curr, index, array) {
        arrays.push(array);
      }

      array.reduce(fn, 0);

      assert.equal(arrays.length, 3);
      assert(arrays[0] == array, 'array was not passed on iteration 0');
      assert(arrays[1] == array, 'array was not passed on iteration 1');
      assert(arrays[2] == array, 'array was not passed on iteration 2');
    });

    it('returns value returned by fn on final invocation', function() {
      function fn(prev, curr) {
        return prev + ' ' + curr;
      }

      var result = array.reduce(fn, 'initial');

      assert.equal(result, 'initial red green blue');
    });

    it('does not modify original array', function() {
      var copy = array.slice();

      array.reduce(function() {
        return 'hi';
      }, 'initial');

      assert.deepEqual(array, copy);
    });
  });

  describe('initial value not specified', function() {
    it('passes prev value to each invocation of fn, with first element as first prev', function() {
      var count = 0;
      var prevs = [];
      function fn(prev) {
        prevs.push(prev);
        return ++count;
      }

      array.reduce(fn);

      assert.deepEqual(prevs, ['red', 1]);
    });

    it('passes current element to each invocation of fn, starting at second element of array', function() {
      var currs = [];
      function fn(prev, curr) {
        currs.push(curr);
      }

      array.reduce(fn);

      assert.deepEqual(currs, ['green', 'blue']);
    });

    it('passes current element index to each invocation of fn, starting at 1', function() {
      var indices = [];
      function fn(prev, curr, index) {
        indices.push(index);
      }

      array.reduce(fn);

      assert.deepEqual(indices, [1, 2]);
    });

    it('passes array to each invocation of fn', function() {
      var arrays = [];
      function fn(prev, curr, index, array) {
        arrays.push(array);
      }

      array.reduce(fn);

      assert.equal(arrays.length, 2);
      assert(arrays[0] == array, 'array was not passed on iteration 0');
      assert(arrays[1] == array, 'array was not passed on iteration 1');
    });

    it('returns value returned by fn on final invocation', function() {
      function fn(prev, curr) {
        return prev + ' ' + curr;
      }

      var result = array.reduce(fn);

      assert.equal(result, 'red green blue');
    });

    it('does not modify original array', function() {
      var copy = array.slice();

      array.reduce(function() {
        return 'hi';
      });

      assert.deepEqual(array, copy);
    });
  });
});