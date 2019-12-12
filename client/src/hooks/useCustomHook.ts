/**
 *  useCustomHook
 *
 *  @type Custom Hook
 *  @desc to do ..
 */

import { useState, useEffect } from "react";

export default () => {
  /* 
    Create state
  */
  const [data, setData] = useState({}) as any;

  /* 
    Run this when the component using it is mounted
  */
  useEffect(() => {
    // Do something ...
    setData({
      foo: "bar"
    });
  }, []);

  /* 
    Return data for component consumption
  */
  return [data];
};
