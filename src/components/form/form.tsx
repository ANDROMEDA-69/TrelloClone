import { useState } from "react";
import { X } from "react-feather";
import "./input.css";

type FormProps = {
  text: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
  editClass?: string;
  displayClass?: string;
};

function Form({
  text,
  onSubmit,
  placeholder,
  defaultValue,
  buttonText,
  editClass,
  displayClass,
}: FormProps): JSX.Element {
  const [isInput, setIsInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e: any) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsInput(false);
  };

  return (
    <div className="custom-input">
      {isInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <button type="submit">{buttonText || "Add"}</button>
            <X onClick={() => setIsInput(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsInput(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default Form;
