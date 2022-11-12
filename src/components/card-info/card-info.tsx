import { useState, useEffect } from "react";
import { TrelloCard } from "../../types/types";
import Form from "../form/form";
import Modal from "../modal/modal";
import {Type, List, Calendar} from "react-feather";
import './cardInfo.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type CardInfoProps = {
  card: TrelloCard;
  onClose: () => void;
  updateCard: (boardId: number, cardId: number, card: TrelloCard) => void;
  boardId: number;
};

function CardInfo({
  card,
  onClose,
  updateCard,
  boardId,
}: CardInfoProps): JSX.Element {
  const [cardValues, setCardValue] = useState<TrelloCard>({ ...card });
  const updateTitle = (value: string) => {
    setCardValue({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValue({ ...cardValues, description: value });
  };



  const updateDate = (date: any) => {
  if (!date) return;
 
   setCardValue({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
  }, [cardValues]);

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <Form
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <Form
            defaultValue={cardValues.description}
            text={cardValues.description ||"Add a Description"}
            placeholder="Enter Title"
            onSubmit={updateDesc}
          />
        </div>
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <DatePicker selected={cardValues.date} onChange={(date:Date) => updateDate(date)} />
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
