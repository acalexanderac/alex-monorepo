import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          
          const date = new Date(value);
          if (isNaN(date.getTime())) return false;

          // Validar que la fecha no sea futura
          if (date > new Date()) return false;

          // Para fechaNacimiento: validar que el alumno tenga entre 3 y 18 años
          if (args.property === 'fechaNacimiento') {
            const age = calculateAge(date);
            return age >= 3 && age <= 18;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          if (args.property === 'fechaNacimiento') {
            return 'La fecha de nacimiento debe corresponder a una edad entre 3 y 18 años';
          }
          return 'La fecha proporcionada no es válida';
        },
      },
    });
  };
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
} 