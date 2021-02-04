import Menu from "../Menu/Menu";
import "./Main.css";
const Main = () => {
  return (
    <div className="main d-flex flex-row ">
      <Menu />
      <div className="cards d-flex flex-column align-items-center mx-5">
        <div className="card">
          <img src="./images/assassins.png" alt="" />
          <div className="card-info">
            <h2>Assassins Creed Valhalla</h2>
            <p>PS5 Version</p>
            <div className="progress"></div>
          </div>
          <h2 className="percentage">60%</h2>
        </div>
        <div className="card">
          <img src="./images/assassins.png" alt="" />
          <div className="card-info">
            <h2>Assassins Creed Valhalla</h2>
            <p>PS5 Version</p>
            <div className="progress"></div>
          </div>
          <h2 className="percentage">60%</h2>
        </div>
        <div className="card">
          <img src="./images/assassins.png" alt="" />
          <div className="card-info">
            <h2>Assassins Creed Valhalla</h2>
            <p>PS5 Version</p>
            <div className="progress"></div>
          </div>
          <h2 className="percentage">60%</h2>
        </div>
      </div>
    </div>
  );
};

export default Main;
