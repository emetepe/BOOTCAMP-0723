import "./FigureUser.css";

const FigureUser = (user) => {
  return (
    <figure className="photoProfile">
      <img src={user.user.image} alt="photo user" className="photoUser" />
      <h4 className="emailUser">Email: {user.user.email}</h4>
    </figure>
  );
};

export default FigureUser;