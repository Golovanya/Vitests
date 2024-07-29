import { describe,test,expect } from "vitest";
import { formFormToServer, fixedFunction } from "./functionToTest";
import { TEST_CASES } from "./TestCases";



describe.each(TEST_CASES)('Form output check', ({description,formData,expected}) => {
    test(`${description}`, () => {
      expect(fixedFunction(formData)).toEqual(expected)
    })
  })
