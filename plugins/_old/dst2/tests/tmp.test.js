import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

describe('Basic test suite', () => {
  test('should pass this test', () => {
    assert.strictEqual(1 + 1, 2);
  });

  test('should pass with async', async () => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.strictEqual(2 + 2, 4);
    console.log('hello inside')
  });
  console.log('hello outside')
  process.stderr.write('This log should appear even with dot reporter\n');

  // test('should fail this test', () => {
  //   assert.strictEqual(1 + 1, 3, 'Expected 1+1 to equal 3');
  // });

  test.skip('this test is skipped', () => {
    assert.strictEqual(1, 1);
  });
});

describe('Another test group', () => {
  test('should pass with object comparison', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    assert.deepStrictEqual(obj1, obj2);
  });

  // test('should fail with object comparison', () => {
  //   const obj1 = { a: 1, b: 2 };
  //   const obj2 = { a: 1, b: 3 };
  //   assert.deepStrictEqual(obj1, obj2);
  // });
});