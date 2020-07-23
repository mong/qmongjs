import { expect } from './utils.js';
import{ add } from '../src/new_fun.js'

describe('The func add', function () {
  it('works for 1 and 2', function () {
    expect(add(1,2)).to.equal(3);
  })
})
