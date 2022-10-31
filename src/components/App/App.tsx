import React, { useEffect, useState } from 'react';
//
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import importData from '../../utils/data';
//

function App() {
  const [data, setData] = useState(importData);
  useEffect(() => {
    setData(importData);
  }, [data]);
  return (
    <>
      <Header />
      <Main data={importData} />
    </>
  );
}

export default App;
