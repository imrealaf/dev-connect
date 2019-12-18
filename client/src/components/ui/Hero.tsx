/**
 *  Hero
 *
 *  @type UI Component
 *  @desc a hero component with many different options
 */

import React from "react";
import { Container } from "react-bootstrap";

import { ViewHeight } from "../../types/Misc";

// Hero props
interface IHeroProps {
  bg: string;
  text: string;
  image?: string | undefined;
  vh?: ViewHeight;
  fluid: boolean;
  overlay: boolean;
  overlayOpacity: number;
}

const Preloader: React.FC<IHeroProps> & {
  defaultProps: Partial<IHeroProps>;
} = ({ children, bg, vh, image, fluid, text, overlay, overlayOpacity }) => {
  const className = (): string => {
    const classes = ["hero", `bg-${bg}`, `text-${text}`];
    if (vh) classes.push("has-vh");
    if (image) classes.push("has-image");
    return classes.join(" ");
  };

  const styles = (): any => {
    const styles: any = {};
    if (vh) styles.height = `${vh}vh`;
    if (image) styles.backgroundImage = `url(${image})`;
    return styles;
  };

  return (
    <div className={className()} style={styles()}>
      {overlay ? (
        <div className="hero_overlay" style={{ opacity: overlayOpacity }}></div>
      ) : null}
      <Container className="hero_container" fluid={fluid}>
        {children}
      </Container>
    </div>
  );
};

Preloader.defaultProps = {
  bg: "light",
  text: "dark",
  fluid: false,
  overlay: false,
  overlayOpacity: 0.5
};

export default Preloader;
