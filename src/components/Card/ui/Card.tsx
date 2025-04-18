import { FC, useState } from "react";
import style from "./Card.module.css";
import { TCard } from "../../../shared/types/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { moveCard, selectCard, unselectCard } from "../../../shared/store/cardsSlice";

interface CardProps {
  card: TCard;
}

const Card: FC<CardProps> = ({ card }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();

  const selectedCard = useAppSelector((state) => state.cards.selectedCard);

  const dragStartHandler = () => {
    setIsDragging(true);
    dispatch(selectCard({ card }));
  };

  const dragEndHandler = () => {
    setIsDragging(false);
    dispatch(unselectCard());
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = () => {
    if (selectedCard && selectedCard.id !== card.id) {
      dispatch(moveCard({ dragOverCard: card }));
    }
  };

  return (
    <div
      className={isDragging ? [style.Card, style.Dragging].join(" ") : style.Card}
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <h2 className={isDragging ? [style.Title, style.Dragging].join(" ") : style.Title}>{card.title}</h2>
    </div>
  );
};

export default Card;
