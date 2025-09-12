# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    1) Specify the input type that you want for each column. Is it a number, string, boolean, etc.
    2) Handle what happens when an incorrect file path is inputted by the user.
    3) Ensure that you differentiate between commas used in numbers/ quotes and those used to separate columns.
    4) Ensure there is a way to figure out if a file has a header or not.

- #### Step 2: Use an LLM to help expand your perspective.
    1) Ensure that all rows are the same length - decide what to do with rows that are too long or too short
    2) Deal with quoted fields with new lines and escaped quotes like "new \nline" or "He said ""Hello"""
    3) Handle comments, trim whitespace, whether to use headers - allow for user configuration
    4) Deal with missing or duplicated headers
    5) Continue on Error rows and collect errors to provide a summary to the user. 

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1) As a user I specify whether or not a particular file has a header. I then specify the type of each data column to ensure that my CSV file has data of the types I want. If I want I can choose not to specify the data types and the parser will not check that my adheres
    to a particular schema.
    Functionality  
    Myself + LLM

    2) If I input an incorrect filepath into the parser, the parser will spot this and immediately prompt me to re-enter the file path as it cannot find it so that I can use the program further.
    Functionality
    Myself

    3) When providing data, if I upload a file that is missing a specific column header or has inconsistent row length, the parser will deal with this appropriately so I don't have to worry about my data being completely formatted in the way that the parser expects. Allows me to make small errors without entire program crashing.
    Functionality + Extensibility 
    LLM

    4) As a user if in one my input strings there is a new line character or extra quotes, the parser will deal with this appropriately so I don't have to worry about changing my data into a specific format. 
    Functionality
    LLM

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas were focused on providing a smooth user experience by specifying input data types, headers and filepaths to ensure that the program performed as was expected. When I prompted the LLM for the first time with a longer prompt I did not expect it to provide as many suggestions as it did and many of them were very minor edge cases that, while very important when designing a larger version of this parser, were beyond the scope of this project. Then I decided to make my prompt shorter and simpler by not specifying any of my thoughts, which led to a broader answer with the chatbot less interested in smaller edge cases and more on the bigger picture. In my final prompt I asked it to only provide me with three  functionality and three extensibility bullet points. Again, this led to even broader bullet points that were focused on making larger changes that going for specific edge cases right away. 

### Reflection
1) 
The parser should proccess the data correctly. Correctly meaning in a way that is useful to the user. Examples are:
    - Making sure the inputted file adheres to the schema provided by the user.
    - Spotting when the csv file has a header or not and making adjustments based on this criteria.
    - When the user gives data that is incomplete or formatted in an unexpected way the parser should deal with these appropriately. Extra   data should be discarded and gaps should be filled in such a way as to notify the user that the data is incomplete.
    - The parser can handle any data types.
    - If it encounters an error, it communicates this back to the user so that they know that something has gone wrong.
    - It should aim to preserve the original meaning of the data it is parsing, meaning it keeps quotation marks and commas intact.

2) 
As I created all the data in my test files, I know what pitfalls are in which files and so use these files to test only one particular 
kind of failure. With the random data generation I could not predict what the data would look like and so any particular file could 
contain any number of different problems that my code would then have to solve all at once. By having data whose shortcomings I do
not know, I could test that I have created a truly robust parser that can deal with any kind of data thrown its way.

3) 
There was surprisingly little programming, instead the sprint was all about designing prior to coding. I did run into a bug with my return 
type for the parser but, after posting on Ed, I got an extremely helpful answer that allowed me to solve my bug. Another thing about
this assignment was that most of the code I wrote was in the testing suite, where I actually tried to predict shortcomings of my code 
before writing anything. While this was a feature in cs20, it was interesting to pick this up again. 

### Design Choices
The first change I made to my parser was to allow it to accept Zod Schemas or undefined as input and to be able to output an array of the provided Zod schemas. This allows a caller to pass in a zod schema that can be used on the CSV file or, if undefined is the input, the parser simply resumes to its initial functionality without checking data against schemas. 

Next, in the else clause of the if statement that checks whether schema is undefined, the rows are first split on commas as previously 
(I would like to change this part in the future as it leads to some bizarre results) in order to facilitate the work of the Zod parser. Then the zod parser tries to parse the csv file using the provided schema and push each parsed row to the results array. Now, if at any point this fails, the code throws a new ParsingError (a new error class that I created below). The reason I decided to make my own error class was because a few different things could go wrong with the parsing and having my own Error class to be able to customise and then send back to the user, provides me with more freedom in terms of the information that I feed back to the caller when something goes wrong.

I also included a few testing blocks in the basic-parser.test.ts file that are empty at the moment. As the comments above these explain, these are areas I would like to test but because I haven't yet conceptually decided how I want to deal with these problems, I cannot yet write tests to check that the behaviour of these is as expected. 

#### Team members and contributions (include cs logins):
Elizabeth Sessa (elizabethsessa) - helped with the code to throw an error when something goes wrong with the parser

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 
Collaborators: elizabethsessa
AI: ChatGPT was my AI of choice for the prompt questions and Google Gemini whenever I searched the web with any queries

#### Total estimated time it took to complete project: 8 hours
#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-Eestienne51
