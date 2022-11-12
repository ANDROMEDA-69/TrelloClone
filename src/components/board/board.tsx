import "./board.css";
import { TrelloBoard, TrelloCard } from "../../types/types";
import Card from "../card/card";
import Form from "../form/form";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

type BoardProps = {
  board: TrelloBoard;
  addCard: (boardId: number, title: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: TrelloCard) => void;
};

function Board({
  board,
  addCard,
  removeBoard,
  removeCard,
  updateCard,
}: BoardProps): JSX.Element {
  const [boardValues, setBoardValues] = useState<TrelloBoard>({ ...board });
  const updateTitle = (value: string) => {
    setBoardValues({ ...boardValues, title: value });
  };

  return (
    <div className="board">
      <div className="board-inner" key={board?.id}>
        <div className="board-header">
          <p className="board-header-title">
            <Form
              defaultValue={boardValues.title}
              text={boardValues.title}
              placeholder="Edit Title"
              onSubmit={updateTitle}
            />
          </p>
          <DeleteIcon
            onClick={() => removeBoard(board.id)}
            className="board-delete"
          />
        </div>
        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              updateCard={updateCard}
            />
          ))}
          <Form
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value: string) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
