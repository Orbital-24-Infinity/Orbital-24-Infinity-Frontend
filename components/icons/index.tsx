import styles from "./Icon.module.sass";

export enum Icons {
  Add = "M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z",
  Delete = "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z",
}

export type IconKeys = keyof typeof Icons;

interface IconProps {
  type: Icons;
  size?: number;
  colour?: string;
  hoverEffects?: boolean;
  className?: string;
}

const Icon = ({
  type,
  size = 24,
  colour = "#e8eaed",
  hoverEffects = false,
  className = "",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={String(size) + "px"}
      viewBox="0 -960 960 960"
      width={String(size) + "px"}
      fill={colour}
      className={className + " " + (hoverEffects ? styles.iconHover : "")}
    >
      <path d={type}></path>
    </svg>
  );
};

export default Icon;
