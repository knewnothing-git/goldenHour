import assert from 'node:assert/strict';
import test from 'node:test';
import { amountRanges, banks, channels, disclosure, timings } from '../src/mockData.js';

test('the triage choices and mock bank contacts are complete', () => {
  assert.equal(channels.length, 5);
  assert.equal(amountRanges.length, 4);
  assert.equal(timings.length, 4);
  assert.ok(banks.length >= 5);
  assert.ok(banks.every((bank) => bank.name && bank.email.includes('@')));
});

test('the prototype disclosure plainly states its boundaries', () => {
  assert.match(disclosure.works.join(' '), /timer/i);
  assert.match(disclosure.mocked.join(' '), /nothing is sent/i);
  assert.match(disclosure.needs.join(' '), /identity verification/i);
});
