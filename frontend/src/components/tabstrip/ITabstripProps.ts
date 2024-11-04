import { IHaveClassName } from "../../types/IHaveClassName";

export interface ITabstripProps extends IHaveClassName {
  captions: string[];
  onTabSelect?: (index: number) => void;
  selectedTabIndex?: number;
  darkMode?: boolean;
}
