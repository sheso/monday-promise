import "./Menu.css";
const Menu = () => {
  return (
    <div>
      <div className="dashboard">
        <div className="user">
          <img src="./images/sackboy.png" alt="" />
          <h3>Simon Twix</h3>
          <p>Pro Member</p>
        </div>
        <div className="links">
          <div className="link">
            <img src="./images/twitch.png" alt="" />
            <h2>Сообщения</h2>
          </div>
          <div className="link">
            <img src="./images/steam.png" alt="" />
            <h2>Цели</h2>
          </div>
          <div className="link">
            <img src="./images/upcoming.png" alt="" />
            <h2>Друзья</h2>
          </div>
          <div className="link">
            <img src="./images/library.png" alt="" />
            <h2>Новая цель</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
