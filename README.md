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

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): ChatGPT was my AI of choice
#### Total estimated time it took to complete project: 6 hours
#### Link to GitHub Repo:  
