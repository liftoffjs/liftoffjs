import * as React from 'react';

export const Card: React.FC = (props) => {
  return (
    <div className="rounded-xl bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800">
      {props.children}
    </div>
  );
}