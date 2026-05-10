const ageClassification = require('./main_10');

describe('ageClassification', () => {
  test('should return null for negative ages', () => {
    expect(ageClassification(-1)).toBeNull();
  });

  test('should return zero', () => {
    expect(ageClassification(0)).toBeNull();
  });

  test("should return 'Дитинство' for ages 1 to 24", () => {
    expect(ageClassification(1)).toBe('Дитинство');
  });

  test("should return 'Молодість' for ages 25 to 44", () => {
    expect(ageClassification(25)).toBe('Молодість');
  });

  test("should return 'Зрілість' for ages 45 to 65", () => {
    expect(ageClassification(45)).toBe('Зрілість');
  });

  test("should return 'Старість' for ages 66 to 75", () => {
    expect(ageClassification(66)).toBe('Старість');
  });

  test("should return 'Довголіття' for ages 76 to 90", () => {
    expect(ageClassification(76)).toBe('Довголіття');
  });

  test("should return 'Рекорд' for ages 91 to 122", () => {
    expect(ageClassification(91)).toBe('Рекорд');
  });
  test('should return null for ages greater than 123', () => {
    expect(ageClassification(123)).toBeNull();
  });
});
