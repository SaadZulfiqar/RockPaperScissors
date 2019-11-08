const assert = require('assert')
import { OPTIONS, RESULTS, getResult, getRandomChoice, checkOption } from './src/shared';

// testing rules
it('paper should beat rock', () => {
  const result = getResult(OPTIONS.PAPER, OPTIONS.ROCK);
  assert.equal(result.RESULT, RESULTS.WIN);
});

it('rock should beat scissor', () => {
  const result = getResult(OPTIONS.SCISSOR, OPTIONS.ROCK);
  assert.equal(result.RESULT, RESULTS.LOST);
});

it('paper should draw with paper', () => {
  const result = getResult(OPTIONS.PAPER, OPTIONS.PAPER);
  assert.equal(result.RESULT, RESULTS.DRAW);
});

it('rock should bear scissor', () => {
  const result = getResult(OPTIONS.SCISSOR, OPTIONS.ROCK);
  assert.equal(result.RESULT, RESULTS.LOST);
});

// testing randome choices
it('getRandomChoice gives valid option', () => {
  const choice = getRandomChoice();
  const find = checkOption(choice);
  assert.equal(choice, find);
});
