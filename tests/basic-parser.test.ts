import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import * as z from "zod";

// Created a few supplemental files to store data of various kinds
const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const CAR_CSV_PATH = path.join(__dirname, "../data/cars.csv");
const POSTCODES_CSV_PATH = path.join(__dirname, "../data/postcodes.csv");
const CAPITALS_HEADER_CSV_PATH = path.join(__dirname, "../data/capitals_missing_header.csv");
const CAPITALS_ROWS_CSV_PATH = path.join(__dirname, "../data/capitals_inconsistent_rows.csv");
const CAPITALS_CSV_PATH = path.join(__dirname, "../data/capitals.csv");

// This represents a path to a file that does not exist
const INCORRECT_PATH = path.join(__dirname, "../data/random.csv");

// Represents the three different schema corresponding to the three data files that are in my code
const PEOPLE_SCHEMA = z.tuple([z.string(), z.coerce.number()])
const CAR_SCHEMA = z.tuple([z.string(), z.coerce.number(), z.coerce.string(), z.string()])
const POSTCODES_SCHEMA = z.tuple([z.string(), z.coerce.string()])
const CAPITALS_SCHEMA = z.tuple([z.string(), z.string(), z.coerce.number(), z.string(), z.string(), z.string()])



// Provided test that tests whether the program behaves as expected when the schema is undefined
test("undefined schema", async () => {

  const results = await parseCSV(CAR_CSV_PATH, undefined)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["brand","miles","registration","owner"]);
  expect(results[1]).toEqual(["BMW", "100000", "MX8HT6", "Jim Smith"]);
  expect(results[2]).toEqual(["Mercedes", "45000", "FG892P", "Klaus Gerdt"]);
  expect(results[3]).toEqual(["Ford", "88040", "TWJ093", "Yana Kirl"]); 
  expect(results[4]).toEqual(["Toyota", "143670", "FRED09", "Fred Gazebo"]);

});


// Tests what happens when an incorrect file path is passed into the parser
// Currently fails as this funcionality has yet to be implemented
test("filepath is false", async () => {

  expect(() => parseCSV(INCORRECT_PATH, CAR_SCHEMA)).toEqual("Error: No such path exists")

});


// Here one of my files has comma separated values and so this test is designed to assess how the parser handles this
test("Commas", async () => {

  const results = await parseCSV(CAPITALS_CSV_PATH, CAPITALS_SCHEMA)

  // This suite fails so far because I have not implemented how to the parser should deal with such a situation
  expect(results).toHaveLength(5);
  expect(results[0]).toHaveLength(6);
  expect(results[1]).toHaveLength(6);
  expect(results[1]).toEqual(["Washington D.C.", "nice", 0.7, "Donald Trump", "USA", "Hi, how's it going?"]);
  expect(results[2]).toEqual(["Paris", "nice", 2.1, "Emmanuel Macron", "France", "Bonjour, comment ça va?"]);
  expect(results[3]).toHaveLength(6);
  expect(results[4]).toHaveLength(6);
  expect(results[4]).toEqual(["Moscow", "cold", 13.1, "Vladimir Putin", "Russia", "Привет, как дела?"]);

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

// Test to check that code does indeed produce an empty 1d array when an invalid schema is applied
test("No heading", async () => {

  const capital_results = await parseCSV(CAPITALS_CSV_PATH, CAR_SCHEMA)
  const postcode_results = await parseCSV(POSTCODES_CSV_PATH, CAPITALS_SCHEMA)

  expect(capital_results).toEqual([]);
  expect(postcode_results).toEqual([]);

});


// Test that was provided to check that parser only returns only arrays
test("parseCSV yields only arrays", async () => {

  const results = await parseCSV(PEOPLE_CSV_PATH, PEOPLE_SCHEMA)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});


// Used to test a file that has incomplete headings
// Yet to  implement this functionality, hence why it is empty so far
test("incomplete header", async () => {

  const results = await parseCSV(CAPITALS_HEADER_CSV_PATH, CAPITALS_SCHEMA)

  // Will add tests once an implementation is decided upon
  
});


// Used to test a file where row length isn't consistent
// Yet to  implement this functionality, hence why it is empty so far
test("incomplete data", async () => {

  const results = await parseCSV(CAPITALS_ROWS_CSV_PATH, CAPITALS_SCHEMA)

  // Will add tests once an implementation is decided upon
  
});