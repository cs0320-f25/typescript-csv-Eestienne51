import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import * as z from "zod";

// Created a few supplemental files to store data of various kinds
const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const CAR_CSV_PATH = path.join(__dirname, "../data/cars.csv");
const POSTCODES_CSV_PATH = path.join(__dirname, "../data/postcodes.csv");

// This represents a path to a file that does not exist
const INCORRECT_PATH = path.join(__dirname, "../data/random.csv");

// Represents the three different schema corresponding to the three data files that are in my code
const PEOPLE_SCHEMA = z.tuple([z.string(), z.coerce.number()])
const CAR_SCHEMA = z.tuple([z.string(), z.coerce.number(), z.coerce.string()])
const POSTCODES_SCHEMA = z.tuple([z.string(), z.coerce.string()])



// Provided test that tests whether the program behaves as expected when the schema is undefined
// TODO: Finish this test
test("parseCSV yields arrays", async () => {

  const results = await parseCSV(PEOPLE_CSV_PATH, )
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);

});


// Tests what happens when an incorrect file path is passed into the parser
test("filepath is false", async () => {

  expect(() => parseCSV(INCORRECT_PATH, PEOPLE_SCHEMA)).toEqual("Error: No such path exists")

});

// Here one of my files has comma separated values and so this test is designed to assess how the parser handles this
test("Commas", async () => {

  const results = await parseCSV(CAR_CSV_PATH, CAR_SCHEMA)

  expect(results).toHaveLength(5);
  expect(results[0]).toHaveLength(4);
  expect(results[1]).toHaveLength(4);
  expect(results[1]).toEqual(["BMW", "100,000", "MX8HT6", "Jim Smith"]);
  expect(results[2]).toEqual(["Mercedes","45,000","FG892P","Klaus Gerdt"]);
  expect(results[3]).toHaveLength(4);
  expect(results[4]).toHaveLength(4);

});


// Test to check how the parser handles data that doesn't have a heading
test("No heading", async () => {

  const results = await parseCSV(POSTCODES_CSV_PATH, POSTCODES_SCHEMA)

  expect(results).toHaveLength(8);
  expect(results[0]).toEqual(["St John's Wood","NW8"]);
  expect(results[2]).toEqual(["Kennigton","SE11"]);
  expect(results[4]).toHaveLength(2);
  expect(results[7]).toHaveLength(2);

});


// Test that was provided to check that parser only returns only arrays
test("parseCSV yields only arrays", async () => {

  const results = await parseCSV(PEOPLE_CSV_PATH, PEOPLE_SCHEMA)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});
