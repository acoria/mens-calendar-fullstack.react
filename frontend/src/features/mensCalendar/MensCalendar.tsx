import { useState } from "react";
import { Tabstrip } from "../../components/tabstrip/Tabstrip";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { CalendarSection } from "../calendar/calendarSection/CalendarSection";
import styles from "./MensCalendar.module.scss";

export const MensCalendar: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const content =
    selectedTab === 0 ? <CalendarSection /> : <div>Statistiken</div>;
  //   const content = selectedTab === 0 ? <CalendarSection /> : <Statistics />
  return (
    <div className={styles.mensCalendar}>
      <Tabstrip
        captions={[
          t(texts.calendarMens.calendar.tabTitle),
          t(texts.calendarMens.statistics.tabTitle),
        ]}
        selectedTabIndex={selectedTab}
        onTabSelect={(index) => {
          setSelectedTab(index);
        }}
        darkMode
      />
      {content}
    </div>
  );
};
