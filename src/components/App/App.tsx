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
  }, []);

  return (
    <>
      <Header />
      <Main data={data} />
    </>
  );
}

export default App;
