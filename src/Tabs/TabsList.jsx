import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import SearchMovie from "../SearchMovie/SearchMovie";
import RateList from "../RateList/RateList";

const TabsList = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [shouldRenderRateList, setShouldRenderRateList] = useState(false);

  useEffect(() => {
    setShouldRenderRateList(activeKey === "2");
  }, [activeKey]);

  return (
    <Tabs
      size="large"
      defaultActiveKey="1"
      centered
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      items={[
        {
          key: "1",
          label: "Search",
          children: <SearchMovie />,
        },
        {
          key: "2",
          label: "Rated",
          children: shouldRenderRateList ? <RateList /> : null,
        },
      ]}
    />
  );
};

export default TabsList;
