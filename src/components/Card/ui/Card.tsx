import { FC, useState } from "react";
import style from "./Card.module.css";
import { TCard } from "../../../shared/types/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import {
  moveCard,
  selectCard,
  startDragging,
  stopDragging,
  unselectCard,
  updateDragPosition,
} from "../../../shared/store/cardsSlice";

interface CardProps {
  card: TCard;
  isTemplate?: boolean;
}

const Card: FC<CardProps> = ({ card, isTemplate = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();

  const selectedCard = useAppSelector((state) => state.cards.selectedCard);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dispatch(startDragging());
    dispatch(selectCard({ card }));
    dispatch(updateDragPosition({ x: e.clientX, y: e.clientY }));
  };

  const dragEndHandler = () => {
    setIsDragging(false);
    dispatch(stopDragging());
    dispatch(unselectCard());
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (selectedCard && selectedCard.id !== card.id) {
      dispatch(moveCard({ dragOverCard: card }));
    }
  };

  return (
    <div
      className={isDragging ? [style.Card, style.Dragging].join(" ") : style.Card}
      draggable={!isTemplate}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
    >
      <h2 className={isDragging ? [style.Title, style.Dragging].join(" ") : style.Title}>{card.title}</h2>
    </div>
  );
};

export default Card;
