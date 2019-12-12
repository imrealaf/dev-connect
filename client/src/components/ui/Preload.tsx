/**
 *  Preload
 *
 *  @type Higher Order Component
 *  @desc covers the DOM and acts a a preloader while the app loads
 */

import React, { useEffect, useState } from "react";

import config from "../../constants/config";

const Preload: React.FC = ({ children }) => {
  const [show, setShow] = useState(true);

  /*
   *  On mount ..
   */
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, config.preload.delayTime);
  }, []);

  /*
   *  Render
   */
  return show ? <div className="preload">{children}</div> : null;
};

export default Preload;
