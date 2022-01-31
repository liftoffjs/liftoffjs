import * as React from "react";
import { AppContext, MasterLayout } from '../../common';

export interface IndexViewProps {
}

const IndexView: React.FC<IndexViewProps> = (props) => {
  const { user } = React.useContext(AppContext);

  return (
    <MasterLayout contain={true}>
      <p className="text-white">
        Welcome to my app, {user ? user.username : 'stranger'}!
      </p>
    </MasterLayout>
  );
}

export default IndexView;