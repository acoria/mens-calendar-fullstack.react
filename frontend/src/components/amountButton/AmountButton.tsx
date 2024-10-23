import { IAmountButtonProps } from "./IAmountButtonProps";
import styles from "./AmountButton.module.scss";
import { useState } from "react";

export const AmountButton: React.FC<IAmountButtonProps> = (props) => {
  const [amount, setAmount] = useState(props.initialValue ?? 0);

  const reduceAmount = () => {
    setAmount((previous) => {
      let newValue = previous - 1;
      if (!props.allowsNegativeValues) {
        if (newValue < 0) {
          newValue = 0;
        }
      }
      props.onAmountChange?.(newValue);
      return newValue;
    });
  };

  const raiseAmount = () => {
    setAmount((previous) => {
      const newValue = previous + 1;
      props.onAmountChange?.(newValue);
      return newValue;
    });
  };

  return (
    <div className={styles.amountButton}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={raiseAmount}>
          +
        </button>
        <span id="amount" className={styles.amount}>
          {amount}
        </span>
        <button className={styles.button} onClick={reduceAmount}>
          -
        </button>
      </div>
      {props.label && (
        <label htmlFor="amount" className={styles.label}>
          {props.label}
        </label>
      )}
    </div>
  );
};
