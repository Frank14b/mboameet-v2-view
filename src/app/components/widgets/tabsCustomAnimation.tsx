import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React from "react";

export type TabCustomAnimationProps = {
  label: string;
  value: string;
  icon?: any;
  description?: string;
  htmlContent: React.ReactNode;
};

export function TabsCustomAnimation({
  defaultTab,
  onTabChange,
  tabData,
}: {
  defaultTab: string;
  onTabChange: (value: string) => void;
  tabData: TabCustomAnimationProps[];
}) {
  return (
    <Tabs id="custom-animation" value={defaultTab} onChange={onTabChange}>
      <TabsHeader placeholder={""} className="mx-4 dark:bg-gray-800">
        {tabData.map(({ icon, label, value }) => (
          <Tab
            className="text-xs font-bold dark:text-gray-300"
            placeholder={""}
            key={value}
            value={value}
            onClick={() => onTabChange(value)}
            activeClassName="active-tab-bg-gray"
          >
            <div className="flex items-center gap-2">
              {icon && React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        placeholder={""}
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {tabData.map(({ value, description, htmlContent }) => (
          <TabPanel key={value} value={value}>
            {description ? description : htmlContent ?? <></>}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
