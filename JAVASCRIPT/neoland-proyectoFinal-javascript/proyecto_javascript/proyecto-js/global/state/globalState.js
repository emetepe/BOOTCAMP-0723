const currentUser = {
  name: sessionStorage.getItem("currenUser")
    ? sessionStorage.getItem("currentUser")
    : "",
};

// Función set
export const setUser = (username) => {
  currentUser.name = username;
};

// Función get
export const getUser = () => {
  return currentUser;
};
