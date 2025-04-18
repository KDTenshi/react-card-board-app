import { FC } from "react";
import style from "./CardsList.module.css";
import { useAppSelector } from "../../../app/store/appStore";
import Card from "../../Card/ui/Card";

const CardsList: FC = () => {
  const cards = useAppSelector((state) => state.cards.cards);

  return (
    <div className={style.List}>
      <h1 className={style.Title}>Cards Board</h1>
      <div className={style.Container}>
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
