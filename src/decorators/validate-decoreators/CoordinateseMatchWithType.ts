import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { GEOLOCATION_TYPE } from '../../geolocation/geoloaction.constants';

export function CoordinatesMatchWithType(property: string, options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    // TODO - figure out more informative message
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `Field '${propertyName}' for ${property}: '${JSON.stringify(object)}' is invalid`,
        ...options,
      },
      constraints: [property],
      validator: MatchConstraints,
    });
  };
}

@ValidatorConstraint({ name: 'CoordinatesMatchWithType' })
export class MatchConstraints implements ValidatorConstraintInterface {
  validatePointArray(arr: any[]): boolean {
    return arr.length === 2 && arr.every((v) => typeof v === 'number' || typeof v === 'string');
  }
  validate(value: any, args?: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    switch (relatedValue) {
      case GEOLOCATION_TYPE.POINT:
        return Array.isArray(value) && this.validatePointArray(value);
      case GEOLOCATION_TYPE.LINESTRING:
        return Array.isArray(value) && value.every((p) => Array.isArray(p) && this.validatePointArray(p));
      case GEOLOCATION_TYPE.POLYGON:
        return (
          Array.isArray(value) &&
          value.length === 1 &&
          value[0].length > 2 &&
          value[0].every((p) => Array.isArray(p) && this.validatePointArray(p))
        );
      default:
        return false;
    }
  }
}
