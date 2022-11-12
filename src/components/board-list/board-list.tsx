import Board from "../board/board";
import "./board-list.css";
import { TrelloBoard, TrelloCard } from "../../types/types";
import { useState } from "react";
import Form from "../form/form";

function BoardList(): JSX.Element {
  const [boards, setBoards] = useState<TrelloBoard[]>([]);

  const addBoardHandler = (name: string) => {
    const BoardsList = [...boards];
    BoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(BoardsList);
  };

  const removeBoard = (boardId: number) => {
    const boardIndex = boards.findIndex(
      (item: TrelloBoard) => item.id === boardId
    );
    const BoardsList = [...boards];
    BoardsList.splice(boardIndex, 1);
    setBoards(BoardsList);
  };

  const addCardHandler = (boardId: number, title: string) => {
    const boardIndex = boards.findIndex(
      (item: TrelloBoard) => item.id === boardId
    );
    const boardsList = [...boards];
    boardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      description: "",
      date: "",
    });
    setBoards(boardsList);
  };

  const removeCard = (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex(
      (item: TrelloBoard) => item.id === boardId
    );
    const boardsList = [...boards];
    const cards = boardsList[boardIndex].cards;
    const cardIndex = cards.findIndex((item) => item.id === cardId);
    cards.splice(cardIndex, 1);
    setBoards(boardsList);
  };

  const updateCard = (boardId: number, cardId: number, card: TrelloCard) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const boardsList = [...boards];
    const cards = boardsList[boardIndex].cards;
    const cardIndex = cards.findIndex((item) => item.id === cardId);

    if (cardIndex < 0) return;
    boardsList[boardIndex].cards[cardIndex] = card;

    setBoards(boardsList);
  };

  return (
    <div className="app">
      <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              updateCard={updateCard}
            />
          ))}
          <Form
            displayClass="app-boards-add-board"
            editClass="app-boards-add-board-edit"
            placeholder="Enter Board Name"
            text="Add Board"
            buttonText="Add Board"
            onSubmit={addBoardHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default BoardList;
