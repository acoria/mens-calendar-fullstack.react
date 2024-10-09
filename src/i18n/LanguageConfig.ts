import { Language } from "../lib/translation/language/types/Language";

class LanguageConfigDefault {
  language: Language = Language.DE;
}
export const LanguageConfig = new LanguageConfigDefault();
