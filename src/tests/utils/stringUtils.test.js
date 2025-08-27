import { describe, it, expect } from 'vitest';
import { capitalize, toCamelCase } from '../../utils/stringUtils';

describe('capitalize', () => {
  it('should capitalize the first letter and lowercase the rest', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('hELLO')).toBe('Hello');
    expect(capitalize('HELLO')).toBe('Hello');
    expect(capitalize('h')).toBe('H');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });
});

describe('toCamelCase', () => {
  it('should capitalize a simple string', () => {
    expect(toCamelCase('hello')).toBe('Hello');
    expect(toCamelCase('HELLO')).toBe('Hello');
  });

  it('should format a hyphenated string', () => {
    expect(toCamelCase('hello-world')).toBe('Hello world');
    expect(toCamelCase('HELLO-WORLD')).toBe('Hello world');
    expect(toCamelCase('test-case')).toBe('Test case');
  });

  it('should only replace the first hyphen', () => {
    expect(toCamelCase('multi-hyphen-string')).toBe('Multi hyphen-string');
  });

  it('should handle strings with no hyphens', () => {
    expect(toCamelCase('test')).toBe('Test');
  });

  it('should handle empty string', () => {
    expect(toCamelCase('')).toBe('');
  });

  it('should handle single character', () => {
    expect(toCamelCase('a')).toBe('A');
  });
});
