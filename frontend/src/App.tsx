import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { CalendarSection } from "./features/calendar/calendarSection/CalendarSection";
import { ToastSection } from "./lib/toast/components/toastSection/ToastSection";
import { useLanguageStorage } from "./lib/translation/language/useLanguageStorage";
import { IToast } from "./lib/toast/model/IToast";
import { ToastContext } from "./lib/toast/context/ToastContext";

export const App = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  return (
    <AppContext.Provider value={{ language: useLanguageStorage() }}>
      <ToastContext.Provider value={{ toasts: [toasts, setToasts] }}>
        <ToastSection />
        <CalendarSection />
      </ToastContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
