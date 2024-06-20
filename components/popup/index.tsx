"use client";
import { useState } from "react";

import styles from "./Popup.module.sass";

interface IPopupEvent {
  value: string;
}

interface PopupProps {
  header: string;
  text: string;
  accentColour?: string;
  accentColourSecondary?: string;
  handleOption1: (event: IPopupEvent) => void;
  handleOption2: (event: IPopupEvent) => void;
  handleDefault?: (event: IPopupEvent) => void;
  option1Text?: string;
  option2Text?: string;
  isOption1Underlined?: boolean;
  isHeaderDisabled?: boolean;
  isTextDisabled?: boolean;
  isDefaultOption1?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Popup = ({
  header,
  text,
  handleOption1,
  handleOption2,
  accentColour = "rgb(255, 0, 0)",
  accentColourSecondary = "rgb(210, 0, 0)",
  option1Text = "Yes",
  option2Text = "No",
  isHeaderDisabled = false,
  isTextDisabled = false,
  isDefaultOption1 = false,
  handleDefault = isDefaultOption1 ? handleOption1 : handleOption2,
  style = {},
  isOption1Underlined = true,
  children,
}: PopupProps) => {
  const [eventValue, setEventValue] = useState<IPopupEvent>({
    value: text,
  });

  return (
    <div
      className={styles.popupWrapper}
      style={style}
      onClick={(e) => handleDefault(eventValue)}
    >
      <div
        className={styles.popup}
        style={{ border: `2px solid ${accentColour}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isHeaderDisabled && <p className={styles.header}>{header}</p>}

        {!isTextDisabled && (
          <p className={styles.subheader} style={{ color: `${accentColour}` }}>
            {text}
          </p>
        )}

        {children}

        <div className={styles.decisionButtons}>
          <button
            onClick={(e) => handleOption1(eventValue)}
            className={styles.yes}
            style={{
              color: `${accentColourSecondary}`,
              textDecoration: isOption1Underlined ? "underline" : "none",
            }}
          >
            {option1Text}
          </button>

          <button
            onClick={(e) => handleOption2(eventValue)}
            className={styles.no}
          >
            {option2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
