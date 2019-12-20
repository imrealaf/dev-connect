/**
 *  Generic
 *
 *  @type Component
 *  @desc generic page component
 */

import React from "react";
import { Container } from "react-bootstrap";

import { Page } from "../components/hoc";
import { sanitize } from "../utils";

interface IGenericProps {
  title: string;
  descrip: string;
  content: string;
}

const Generic: React.FC<IGenericProps> = ({ title, descrip, content }) => {
  /*
   *  Render
   */
  return (
    <Page title={title} descrip={descrip}>
      <div id="content" className="mt-5">
        <Container className="py-4">
          <h1>{title}</h1>
          <hr className="my-4" />
          <div dangerouslySetInnerHTML={sanitize(content)}></div>
        </Container>
      </div>
    </Page>
  );
};

export default Generic;
