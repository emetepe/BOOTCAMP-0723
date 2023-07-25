const currentUser = {
  name: sessionStorage.getItem("currentUser")
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
