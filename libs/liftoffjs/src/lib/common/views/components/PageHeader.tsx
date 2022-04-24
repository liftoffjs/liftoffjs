import * as React from 'react';

export const PageHeader: React.FC = (props) => {
  return <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-white">{props.children}</h1>;
}

export const PageSubHeader: React.FC = (props) => {
  return <h2 className="font-medium leading-tight text-2xl mt-0 mb-2 text-white">{props.children}</h2>;
}