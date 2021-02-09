import "./Landing.css";
const Landing = () => {
  return (
    <div className="container">
      <div className="firstblock my-4">
        <div className="firstBlockText">
          <h3>
            Добро пожаловать в Monday Promise - систему, которая изменит ваш
            подход к своим обещаниям!
          </h3>
          <p>
            Создайте собственное обещание или следите за другими пользователями,
            оставляйте комментарии и делайте ставки на чужие обещания,
            поднимайте свой рейтинг и меняйтесь в лучшую сторону с другими
            пользователями!
          </p>
        </div>
        <img
          src="https://2672686a4cf38e8c2458-2712e00ea34e3076747650c92426bbb5.ssl.cf1.rackcdn.com/2018-04-09-11-28-34.jpeg"
          width="40%"
        />
      </div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
        Возможности сервиса
      </h3>
      <div className="secondBlock my-4 ">
        <div className="secondBlockText">
          <h4>
            Создание своего обещания и отслеживание его выполнения в личном
            кабинете
          </h4>
          <p>
            Создайте обещание, опишите цель, срок, сложность и зачем вы создаете
            данное обещание. Ваш пост сращу попадет в общую ленту и все
            пользователи смогут оценить и прокомментироать ваше общеание. После
            чего вы сможете подписаться на других пользователей и помогать им в
            достижении своих целей, давая советы или просто подбадривая их.
          </p>
        </div>
        <img
          src="https://mma.prnewswire.com/media/1220632/MML360_App_Preview.jpg?p=publish"
          width="40%"
        />
      </div>
      <div className="thirdBlock my-4">
        <div className="thirdBlockText">
          <h4>Общайтесь в общем чате со всеми пользователями</h4>
          <p>
            Мы предусмотрели чат для самых активных пользователей нашего
            сервиса, чтобы вы могли обсудить все волнующие вас вопросы.
          </p>
        </div>
        <img
          src="https://cdn.dribbble.com/users/2176667/screenshots/4675630/ezgif.com-gif-maker.gif"
          alt=""
        />
      </div>

      <div className="fourthBlock my-4">
        <div className="fourthBlockText">
          <h4>Общайтесь в общем чате со всеми пользователями</h4>
          <p>
            Мы предусмотрели чат для самых активных пользователей нашего
            сервиса, чтобы вы могли обсудить все волнующие вас вопросы.
          </p>
        </div>
        <img
          src="https://raw.githubusercontent.com/codemybrainsout/smart-app-rate/master/preview/preview.png"
          width="50%"
        />
      </div>
    </div>
  );
};

export default Landing;
