const calculadora = require("../models/calculadora.js");

test("Somar 2 + 2 deveria retornar 4", () => {
  expect(calculadora.somar(2, 2)).toBe(4);
});
