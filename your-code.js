module.exports = function() {
  var array = ['red', 'green', 'blue'];

  // Hide some built-in array methods...
  hideProperty(array, 'forEach');
  hideProperty(array, 'map');
  hideProperty(array, 'reduce');
  hideProperty(array, 'filter');
  hideProperty(array, 'find');
  hideProperty(array, 'findIndex');
  hideProperty(array, 'some');
  hideProperty(array, 'every');

  function hideProperty(obj, propertyName) {
    Object.defineProperty(obj, propertyName, {
      value: undefined,
      writable: true,
      enumerable: false
    });
  }

  // ...so you can reimplement them below.

  // You can use:
  //   1) Property lookup, e.g. array[1]
  //   2) Length property, e.g. array.length
  //   3) Other methods you've already implemented. After you write forEach()
  //      you can use it in other methods.

  array.forEach = function() {};


  // End of reimplemented array methods

  return array;
};
