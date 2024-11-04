import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { MensCalendar } from "./features/mensCalendar/MensCalendar";
import { ToastSection } from "./lib/toast/components/toastSection/ToastSection";
import { ToastContext } from "./lib/toast/context/ToastContext";
import { IToast } from "./lib/toast/model/IToast";
import { useLanguageStorage } from "./lib/translation/language/useLanguageStorage";

export const App = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  return (
    <AppContext.Provider value={{ language: useLanguageStorage() }}>
      <ToastContext.Provider value={{ toasts: [toasts, setToasts] }}>
        <ToastSection />
        <MensCalendar />
      </ToastContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
