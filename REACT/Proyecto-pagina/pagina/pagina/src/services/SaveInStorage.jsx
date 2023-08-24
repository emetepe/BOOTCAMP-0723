export const SaveInStorage = (key, element) => {
    
  // get elements we already have in localstorage
    let elements = JSON.parse(localStorage.getItem(key));
    // check if it is an array
    if(Array.isArray(elements)){
      // Add the new element to array
      elements.push(element)
    } else {
      // Create an array with new dog
      elements = [element];
    }

    // save in localstorage
    localStorage.setItem(key, JSON.stringify(elements));

    // return saved objects
    return element;
  }