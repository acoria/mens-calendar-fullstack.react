import { Value } from "../core/types/Value";
import { Language } from "../lib/translation/language/types/Language";

export interface IAppContext {
  language: Value<Language>;
}
