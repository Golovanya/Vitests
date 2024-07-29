import { describe,test,expect } from "vitest";
import { formFormToServer, fixedFunction } from "./functionToTest";
import { TEST_CASES } from "./TestCases";



describe.each(TEST_CASES)('Fixed function  output check', ({description,formData,expected}) => {
  test(`${description}`, () => {
    expect(fixedFunction(formData)).toEqual(expected)
  })
})

describe.each(TEST_CASES)('First function output check', ({description,formData,expected}) => {
    test(`${description}`, () => {
      expect(formFormToServer(formData)).toEqual(expected)
    })
  })