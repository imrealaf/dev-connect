/**
 *  SidePanel
 *
 *  @type UI Component
 *  @desc a nav like sliding panel component
 */

import React from "react";

const componentName = "sidepanel";

// SidePanel props
interface Props {
  id?: string;
  position: string;
  bg: string;
  shadow: boolean;
  show: boolean;
  handleClose: any;
}

const SidePanel: React.FC<Props> & { defaultProps: Partial<Props> } = ({
  children,
  position,
  bg,
  shadow,
  show,
  handleClose
}) => {
  const classNames = () => {
    const classes = [componentName, `${componentName}-${position}`, `bg-${bg}`];
    if (shadow) classes.push(`${componentName}-shadow`);
    if (show) {
      document.body.classList.add(`${componentName}-active`);
      classes.push("in");
    } else {
      document.body.classList.remove(`${componentName}-active`);
    }
    return classes.join(" ");
  };

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <div className={classNames()}>
        <div className={`${componentName}_body`}>{children}</div>
      </div>
      {show ? (
        <div className={`${componentName}-overlay`} onClick={handleClose}></div>
      ) : null}
    </React.Fragment>
  );
};

SidePanel.defaultProps = {
  position: "right",
  bg: "light",
  shadow: true,
  show: false,
  handleClose: null
};

export default SidePanel;
