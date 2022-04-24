import * as React from 'react';

export const Table: React.FC<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>> = (props) => {
  return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...props}>
      {props.children}
    </table>
  </div>
}

export const Thead: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
> = (props) => {
  return <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props}>
    {props.children}
  </thead>
}

export const Tr: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> & { rowType?: 'body' }> = (props) => {
  const className = props.rowType === 'body'
    ? 'border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
    : '';
  const trProps = { ...props };
  delete trProps.rowType;
  delete trProps.children;
  return <tr {...trProps} className={className}>{props.children}</tr>
}

export const Th: React.FC<React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & { width?: string | number }> = (props) => {
  const styles = {
    ...(props.style || {}),
  };
  if (!!props.width) {
    styles.width = props.width;
    styles.minWidth = props.width;
  }
  return <th scope="col" className="px-6 py-3" {...props} style={styles}>{props.children}</th>
}

export const Tbody: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
> = (props) => {
  return <tbody {...props}>
    {props.children}
  </tbody>
}

export const Td: React.FC<React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>> = (props) => {
  return <td className="px-6 py-4" {...props}>{props.children}</td>
}
