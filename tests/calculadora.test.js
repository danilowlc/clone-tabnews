const calculadora = require("../models/calculadora.js");

test("somar 1 + 2 = 3", () => {
  expect(calculadora.somar(1, 2)).toBe(3);
});
