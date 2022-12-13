import React from 'react';

import { Select, Tag } from 'antd';

const options = [
    {
      value: 'gold',
    },
    {
      value: 'lime',
    },
    {
      value: 'green',
    },
    {
      value: 'cyan',
    },
  ];

  const SelectFilter = () => (
    <Select
      mode="multiple"
      showArrow
      tagRender={(props=> <b>{props.label}, </b>)}
      defaultValue={['gold', 'cyan']}
      style={{
        width: '100%',
      }}
      allowClear={false}
      autoClearSearchValue={false}
      maxTagCount={1}
      placeholder="Filtrer par site "
      options={options}
    />
  );
  export default SelectFilter;