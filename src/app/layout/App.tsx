import { FC } from "react";
import "../style/App.css";
import { CardsList } from "../../components/CardsList";
import { useAppDispatch, useAppSelector } from "../store/appStore";
import { updateDragPosition } from "../../shared/store/cardsSlice";
import { Card } from "../../components/Card";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const pos = useAppSelector((state) => state.cards.dragPosition);
  const isDragging = useAppSelector((state) => state.cards.isDragging);
  const selectedCard = useAppSelector((state) => state.cards.selectedCard);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    dispatch(updateDragPosition({ x: e.clientX, y: e.clientY }));
  };

  return (
    <div className="App" onDragOver={dragOverHandler}>
      {isDragging && selectedCard && (
        <div style={{ position: "fixed", top: pos.y, left: pos.x }}>
          <Card card={selectedCard} isTemplate />
        </div>
      )}
      <CardsList />
    </div>
  );
};

export default App;
