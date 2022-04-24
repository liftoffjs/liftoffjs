import * as React from 'react';

interface FormFieldProps {
  label: string;
  for?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"] | "toggle";
  inputAttrs?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormFieldInput: React.FC<FormFieldProps & { typeProp: string, forProp: string }> = (props) => {
  return <input
    type={props.typeProp}
    id={props.forProp}
    name={props.forProp}
    {...(props.inputAttrs || {})}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />;
}

const FormFieldToggle: React.FC<FormFieldProps & { typeProp: string, forProp: string }> = (props) => {
  return <input
    id={props.forProp}
    name={props.forProp}
    {...(props.inputAttrs || {})}
    type="checkbox"
    role="switch" />
}

export const FormField: React.FC<FormFieldProps> = (props) => {
  const forProp = props?.for?.length ? props.for : props.label.trim().replace(/ /g, '-').toLocaleLowerCase()
  const typeProp = props?.type?.length ? props.type : "text";

  return (<>
    <div className="mb-6">
      <label
        htmlFor={forProp}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {props.label}
      </label>
      {
        typeProp === "toggle" && <FormFieldToggle {...props} forProp={forProp} typeProp={typeProp} />
      }
      {
        typeProp !== "toggle" && <FormFieldInput {...props} forProp={forProp} typeProp={typeProp} />
      }

      {props.children}
    </div>
  </>);
}
