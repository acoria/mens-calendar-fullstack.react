export interface IAmountButtonProps {
  allowsNegativeValues?: boolean;
  initialValue?: number;
  label?: string;
  onAmountChange?: (amount: number) => void;
}
