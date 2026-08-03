import { createContext, useContext } from 'react';

const ThemeContext = createContext('світла');
const LanguageContext = createContext('українська');
const UserContext = createContext({ name: 'Гість', age: 0 });

const AppContext = () => {
  return (
    <ThemeContext.Provider value="темна">
      <LanguageContext.Provider value="англійська">
        <UserContext.Provider value={{ name: 'John Doe', age: 30 }}>
          <Content />
        </UserContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

const Content = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const user = useContext(UserContext);

  return (
    <div>
      <p>2 level</p>
      <p>Тема: {theme}</p>
      <p>Мова: {language}</p>
      <p>
        Користувач: {user.name}, Вік: {user.age}
      </p>
      <Paragraph />
    </div>
  );
};

const Paragraph = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const user = useContext(UserContext);

  return (
    <div>
      <p>3 level</p>
      <p>Тема: {theme}</p>
      <p>Мова: {language}</p>
      <p>
        Користувач: {user.name}, Вік: {user.age}
      </p>
    </div>
  );
};
export default AppContext;
