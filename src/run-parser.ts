import { parseCSV } from "./basic-parser";
import * as z from "zod";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name
const ZOD_SCHEMA = z.tuple([z.string(), z.coerce.number()])

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, ZOD_SCHEMA)
  //, ZOD_SCHEMA

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();