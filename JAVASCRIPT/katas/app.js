// Kata nivel 8 - 18/07/2023
/* For this problem you must create a program that says who ate the last cookie. If the input is a string then "Zach" ate the cookie. If the input is a float or an int then "Monica" ate the cookie. If the input is anything else "the dog" ate the cookie. The way to return the statement is: "Who ate the last cookie? It was (name)!" 
Ex: Input = "hi" --> Output = "Who ate the last cookie? It was Zach! (The reason you return Zach is because the input is a string)
Note: Make sure you return the correct message with correct spaces and punctuation.*/
    
const cookie = (x) => {
    const text = "Who ate the last cookie? It was"
    switch (typeof x) {
        case "string":
            return(`${text} Zach!`);
            break;
        case "number":
            return(`${text} Monica!`);
            break;
        default:
            return(`${text} the dog!`);
    }
}

cookie("Ryan");
cookie(26);
cookie(2.3);
cookie(true);