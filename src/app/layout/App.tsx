import { FC } from "react";
import "../style/App.css";
import { CardsList } from "../../components/CardsList";

const App: FC = () => {
  return (
    <div className="App">
      <CardsList />
    </div>
  );
};

export default App;
