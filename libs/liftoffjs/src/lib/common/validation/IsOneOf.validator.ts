import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isOneOf', async: false })
export class IsOneOf implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (Array.isArray(args.constraints)) {
      return args.constraints.includes(text);
    }

    return Object.values(args.constraints).some(x => x === text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is an invalid value.';
  }
}