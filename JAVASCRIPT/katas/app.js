// Kata nivel 8 - 18/07/2023
/* For this problem you must create a program that says who ate the last cookie. If the input is a string then "Zach" ate the cookie. If the input is a float or an int then "Monica" ate the cookie. If the input is anything else "the dog" ate the cookie. The way to return the statement is: "Who ate the last cookie? It was (name)!" 
Ex: Input = "hi" --> Output = "Who ate the last cookie? It was Zach! (The reason you return Zach is because the input is a string)
Note: Make sure you return the correct message with correct spaces and punctuation.*/
    
// const cookie = (x) => {
//     const text = "Who ate the last cookie? It was"
//     switch (typeof x) {
//         case "string":
//             return(`${text} Zach!`);
//             break;
//         case "number":
//             return(`${text} Monica!`);
//             break;
//         default:
//             return(`${text} the dog!`);
//     }
// }

// cookie("Ryan");
// cookie(26);
// cookie(2.3);
// cookie(true);

// Kata nivel 8 - 19/07/2023
/* Create a function that accepts a string and a single character, and returns an integer 
of the count of occurrences the 2nd argument is found in the first one.
If no occurrences can be found, a count of 0 should be returned. */

const str_count = (s, c) => {
    let total = 0;
    for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) == c) {
                total++;
            }
    }
    return total;
}

console.log(str_count("Hello", 'o')); // returns 1
console.log(str_count("Hello", 'l')); // returns 2
console.log(str_count("", 'z')); // returns 0