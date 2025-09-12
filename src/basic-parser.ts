import * as fs from "fs";
import * as readline from "readline";
import * as z from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values. This could be a 2d array of strings or an array of the Zod schemas
 */

export async function parseCSV<T>(path: string, schema: z.ZodType<T> | undefined): Promise<(string[] | T)[]> {


  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create an empty array to hold the results
  let result = []
  
  
  // If the schema is undefined, the program reverts back to its previous behaviour
  if (schema == undefined){

    // We add the "await" here because file I/O is asynchronous. 
    // We need to force TypeScript to _wait_ for a row before moving on. 
    // More on this in class soon!
    for await (const line of rl) {

      // Splits lines based on commas - does not yet handle statements where commas do not separate data  
      let values: string[] = line.split(",").map((v) => v.trim());
      result.push(values);
    }
  }


  // Otherwise if we have a schema that is defined
  else {

    // We loop through each line of code
    for await (const line of rl) {

      // Again we split the values when we come across commas
      let values = line.split(",").map((v) => v.trim());

      // Here we have a try block that attempts to parse our values based on the schema and then push these to the result array
      try {
        let validatedRows = schema.parse(values);
        result.push(validatedRows);
        

      } catch (error: unknown) {
        // If an exception is thrown by something going wrong during the parsing, we throw a ParsingError
        // to notify the caller of the failure.
        throw new ParsingError("Error while parsing file");

      }
    } 
  }

  // Return the result array at the end
  return result;
}


// Here is our Parsing Error class
class ParsingError extends Error {
  // We have a constructor into which we pass our error message
  constructor(message: string) {
    super(message);
    // We also give the error a name
    this.name = 'ParsingError'; 
  }
} 


