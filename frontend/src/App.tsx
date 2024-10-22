import { AppContext } from "./context/AppContext";
import { CalendarSection } from "./features/calendar/calendarSection/CalendarSection";
import { PeriodItem } from "./features/periodItem/PeriodItem";
import { useLanguageStorage } from "./lib/translation/language/useLanguageStorage";

export const App = () => {
  return (
    <AppContext.Provider value={{ language: useLanguageStorage() }}>
      <CalendarSection />
    </AppContext.Provider>
  );
};

export default App;
