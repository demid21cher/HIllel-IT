const weekFn = require('./main_10');

describe('weekFn', () => {
  test('should return correct day of the week for valid inputs', () => {
    expect(weekFn(1)).toBe('Понеділок');
    expect(weekFn(2)).toBe('Вівторок');
    expect(weekFn(3)).toBe('Середа');
    expect(weekFn(4)).toBe('Четвер');
    expect(weekFn(5)).toBe("П'ятниця");
    expect(weekFn(6)).toBe('Субота');
    expect(weekFn(7)).toBe('Неділя');
  });

  test('should return null for invalid inputs', () => {
    expect(weekFn(0)).toBeNull();
    expect(weekFn(8)).toBeNull();
    expect(weekFn(-1)).toBeNull();
    expect(weekFn(1.5)).toBeNull();
    expect(weekFn('2')).toBeNull();
  });
});
