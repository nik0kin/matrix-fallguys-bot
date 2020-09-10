
export const add = (num1: number, num2: number): number => {
  return num1 + num2;
};

describe('add', () => {
  test('should add 2 numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
