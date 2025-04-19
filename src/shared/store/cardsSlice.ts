import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard } from "../types/types";

type CardsState = {
  cards: TCard[];
  selectedCard: TCard | null;
  isDragging: boolean;
  dragPosition: { x: number; y: number };
};

const initialState: CardsState = {
  cards: [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
    { id: 4, title: "Card 4" },
  ],
  selectedCard: null,
  isDragging: false,
  dragPosition: { x: 0, y: 0 },
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<{ card: TCard }>) => {
      const { card } = action.payload;

      state.selectedCard = card;
    },
    unselectCard: (state) => {
      state.selectedCard = null;
    },
    moveCard: (state, action: PayloadAction<{ dragOverCard: TCard }>) => {
      const { dragOverCard } = action.payload;

      if (state.selectedCard) {
        const selectedCard = state.selectedCard;

        const dragOverCardIndex = state.cards.findIndex((card) => card.id === dragOverCard.id);
        const selectedCardIndex = state.cards.findIndex((card) => card.id === selectedCard.id);

        state.cards.splice(selectedCardIndex, 1);
        state.cards.splice(dragOverCardIndex, 0, selectedCard);
      }
    },
    updateDragPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;

      state.dragPosition = { x, y };
    },
    startDragging: (state) => {
      state.isDragging = true;
    },
    stopDragging: (state) => {
      state.isDragging = false;
    },
  },
});

export const { selectCard, unselectCard, moveCard, updateDragPosition, startDragging, stopDragging } =
  cardsSlice.actions;
