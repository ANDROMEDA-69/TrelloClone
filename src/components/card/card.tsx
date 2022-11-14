import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { TrelloCard } from "../../types/types";
import CardInfo from "../card-info/card-info";
import "./card.css";
import { formatDate } from "../../utils/utils";
import { Clock } from "react-feather";
import DeleteIcon from "@mui/icons-material/Delete";

type CardProps = {
  card: TrelloCard;
  boardId: number;
  removeCard: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: TrelloCard) => void;
};

function Card({
  card,
  boardId,
  removeCard,
  updateCard,
}: CardProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const dayFromToday = differenceInCalendarDays(card.date, new Date());
  let cardColor;
  if (dayFromToday < 0) {
    cardColor = "red";
  } else if (dayFromToday === 0) {
    cardColor = "#9acd32";
  } else if (dayFromToday === 1) {
    cardColor = "yellow";
  } else if (dayFromToday > 1) {
    cardColor = "lightgrey";
  }
  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        key={card.id}
        onClick={() => setShowModal(true)}
        style={{ background: cardColor }}
      >
        <div className="card-header">
          <div className="card-title">
            {card.title}
          </div>
          <DeleteIcon
              onClick={() => removeCard(boardId, card.id)}
              className="card-delete"
            />
        </div>

        <div className="card-footer">
          {card.date && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(card.date)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
