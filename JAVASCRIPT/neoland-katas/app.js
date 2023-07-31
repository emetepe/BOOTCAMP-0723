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

// const str_count = (s, c) => {
//     let total = 0;
//     for (let i = 0; i < s.length; i++) {
//             if (s.charAt(i) == c) {
//                 total++;
//             }
//     }
//     return total;
// }

// console.log(str_count("Hello", 'o')); // returns 1
// console.log(str_count("Hello", 'l')); // returns 2
// console.log(str_count("", 'z')); // returns 0

// Kata nivel 8 - 20/07/2023
/* Bob is working as a bus driver. However, he has become extremely popular amongst the city's residents. 
With so many passengers wanting to get aboard his bus, he sometimes has to face the problem of not enough space 
left on the bus! He wants you to write a simple program telling him if he will be able to fit all the passengers */

/* You have to write a function that accepts three parameters:

cap is the amount of people the bus can hold excluding the driver.
on is the number of people on the bus excluding the driver.
wait is the number of people waiting to get on to the bus excluding the driver.
If there is enough space, return 0, and if there isn't, return the number of passengers he can't take */

// const enough = (cap, on, wait) => {
//     let capacity = cap - on;
//     wait <= capacity ? capacity = 0 : capacity = wait - capacity;
//     return capacity;
// }

// console.log(enough(10, 5, 5));
// console.log(enough(100, 60, 50));
// console.log(enough(20, 5, 5));

// Kata nivel 8 - 21/07/2023
/* Numbers ending with zeros are boring. They might be fun in your world, but not here.
Get rid of them. Only the ending ones.
1450 -> 145
960000 -> 96
1050 -> 105
-1050 -> -105
Zero alone is fine, don't worry about it. Poor guy anyway*/

// const noBoringZeros = (n) => {
//   if (n == 0) return n;
//   else {
//     for (i = 1; n % 10 == 0; i++) {
//       n /= 10;
//     }
//     return n;
//   }
// };

// console.log(noBoringZeros(1450));
// console.log(noBoringZeros(960000));
// console.log(noBoringZeros(1050));
// console.log(noBoringZeros(-1050));
// console.log(noBoringZeros(-105));
// console.log(noBoringZeros(0));
