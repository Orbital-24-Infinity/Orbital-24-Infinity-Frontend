import React from "react";

import styles from "./Icon.module.sass";

export enum Icons {
  Add = "M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z",
  Delete = "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z",
  Back = "m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z",
  Edit = "M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
  Close = "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z",
  Upload = "M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z",
}

export type IconKeys = keyof typeof Icons;

export const getIconName = (iconPath: string): IconKeys | undefined => {
  return Object.keys(Icons).find(
    (key) => Icons[key as IconKeys] === iconPath
  ) as IconKeys | undefined;
};

interface IconProps {
  type: Icons;
  size?: number;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  colour?: string;
  hoverEffects?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  ariaInvalid?: boolean;
}

const Icon = ({
  type,
  size = 24,
  width = size,
  height = size,
  viewBox = "0 -960 960 960",
  colour = "#e8eaed",
  hoverEffects = false,
  className = "",
  style = {},
  onClick = () => {},
  ariaInvalid = false,
}: IconProps) => {
  return (
    <svg
      aria-label={getIconName(type)}
      aria-invalid={ariaInvalid}
      xmlns="http://www.w3.org/2000/svg"
      height={typeof height === "number" ? String(height) + "px" : height}
      viewBox={viewBox}
      width={typeof width === "number" ? String(width) + "px" : width}
      fill={colour}
      className={className + " " + (hoverEffects ? styles.iconHover : "")}
      style={style}
      onClick={onClick}
    >
      <path d={type}></path>
    </svg>
  );
};

export default Icon;
