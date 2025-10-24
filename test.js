/**
 * Simple tests for listbetter-property
 */

const {
  listProperties,
  displayProperties,
  groupByType,
  countProperties
} = require('./index');

// Test object
const testObj = {
  name: 'Test Object',
  age: 25,
  active: true,
  tags: ['tag1', 'tag2'],
  config: {
    debug: false
  }
};

// Define a non-enumerable property
Object.defineProperty(testObj, 'hidden', {
  value: 'secret',
  enumerable: false,
  writable: true,
  configurable: true
});

// Define a property with getter/setter
Object.defineProperty(testObj, 'computed', {
  get() {
    return this.age * 2;
  },
  set(val) {
    this.age = val / 2;
  },
  enumerable: true,
  configurable: true
});

console.log('=== Test 1: List Properties ===');
const props = listProperties(testObj);
console.log('Found properties:', props.length);
console.assert(props.length > 0, 'Should find properties');
console.log('✓ Test 1 passed\n');

console.log('=== Test 2: List Properties (including non-enumerable) ===');
const propsWithHidden = listProperties(testObj, { includeNonEnumerable: true });
console.log('Found properties:', propsWithHidden.length);
console.assert(propsWithHidden.length > props.length, 'Should find more properties with non-enumerable');
console.log('✓ Test 2 passed\n');

console.log('=== Test 3: Display Properties ===');
const display = displayProperties(testObj);
console.log(display);
console.assert(display.includes('name'), 'Display should include property names');
console.log('✓ Test 3 passed\n');

console.log('=== Test 4: Group By Type ===');
const grouped = groupByType(testObj);
console.log('Grouped by type:', JSON.stringify(grouped, null, 2));
console.assert(grouped.string && grouped.string.includes('name'), 'Should group string properties');
console.assert(grouped.number && grouped.number.includes('age'), 'Should group number properties');
console.log('✓ Test 4 passed\n');

console.log('=== Test 5: Count Properties ===');
const counts = countProperties(testObj);
console.log('Property counts:', JSON.stringify(counts, null, 2));
console.assert(counts.total > 0, 'Should count total properties');
console.assert(counts.enumerable > 0, 'Should count enumerable properties');
console.assert(counts.nonEnumerable > 0, 'Should count non-enumerable properties');
console.assert(counts.withGetters > 0, 'Should count properties with getters');
console.log('✓ Test 5 passed\n');

console.log('=== Test 6: Display with values ===');
const displayWithValues = displayProperties(testObj, { 
  showValues: true,
  includeNonEnumerable: true 
});
console.log(displayWithValues);
console.assert(displayWithValues.includes('Value:'), 'Display should show values');
console.log('✓ Test 6 passed\n');

console.log('=== All Tests Passed! ===');
