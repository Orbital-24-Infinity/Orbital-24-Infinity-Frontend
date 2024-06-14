import { TaskStatus } from "@/components/dashboard/topic/constants";

import styles from "./Actions.module.sass";
import GenerateButton from "./generate";
import ManageButton from "./manage";
import ViewButton from "./view";

interface IActionButtonProps {
  type: TaskStatus;
}

interface IActionButtonWrapper {
  children: React.ReactNode;
}

const ActionButtonWrapper = ({ children }: IActionButtonWrapper) => {
  return <div className={styles.actionButtonsWrapper}>{children}</div>;
};

const ActionButton = ({ type }: IActionButtonProps) => {
  return {
    [TaskStatus.CREATED]: (
      <ActionButtonWrapper>
        <ManageButton />
      </ActionButtonWrapper>
    ),
    [TaskStatus.GENERATING]: (
      <ActionButtonWrapper>
        <></>
      </ActionButtonWrapper>
    ),
    [TaskStatus.COMPLETED]: (
      <ActionButtonWrapper>
        <ManageButton />
        <ViewButton />
        <GenerateButton />
      </ActionButtonWrapper>
    ),
    [TaskStatus.ATTEMPTING]: (
      <ActionButtonWrapper>
        <ManageButton />
        <ViewButton />
      </ActionButtonWrapper>
    ),
  }[type];
};

export default ActionButton;
