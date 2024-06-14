"use client";
import { useState } from "react";

import styles from "./Popup.module.sass";

interface IPopupEvent {
  value: string;
}

interface PopupProps {
  header: string;
  text: string;
  placeholder?: string;
  accentColour?: string;
  accentColourSecondary?: string;
  handleYes: (event: IPopupEvent) => void;
  handleNo: (event: IPopupEvent) => void;
  option1Text?: string;
  option2Text?: string;
  isDefaultOption1?: boolean;
  isTextEditable?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Popup = ({
  header,
  text,
  placeholder = "",
  handleYes,
  handleNo,
  accentColour = "rgb(255, 0, 0)",
  accentColourSecondary = "rgb(210, 0, 0)",
  option1Text = "Yes",
  option2Text = "No",
  isDefaultOption1 = false,
  isTextEditable = false,
  style = {},
  children,
}: PopupProps) => {
  const [eventValue, setEventValue] = useState<IPopupEvent>({
    value: text,
  });

  return (
    <div
      className={styles.popupWrapper}
      style={style}
      onClick={(e) =>
        isDefaultOption1 ? handleYes(eventValue) : handleNo(eventValue)
      }
    >
      <div
        className={styles.popup}
        style={{ border: `2px solid ${accentColour}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.header}>{header}</p>

        {isTextEditable ? (
          <input
            value={eventValue.value}
            className={`${styles.text} ${styles.editableText}`}
            style={{
              color: `${accentColour}`,
              borderBottomColor: `${accentColour}`,
            }}
            onChange={(e) =>
              setEventValue((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            placeholder={placeholder}
          ></input>
        ) : (
          <p className={styles.text} style={{ color: `${accentColour}` }}>
            {text}
          </p>
        )}

        {children}

        <div className={styles.decisionButtons}>
          <button
            onClick={(e) => handleYes(eventValue)}
            className={styles.yes}
            style={{ color: `${accentColourSecondary}` }}
          >
            {option1Text}
          </button>

          <button onClick={(e) => handleNo(eventValue)} className={styles.no}>
            {option2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
