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




