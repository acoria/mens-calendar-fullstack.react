export interface IAmountButtonProps {
  label?: string;
  onAmountChange?: (amount: number) => void;
  allowsNegativeValues?: boolean;
}
