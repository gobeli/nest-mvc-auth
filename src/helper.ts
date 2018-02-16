import { ValidationError } from "class-validator";

export function formatErrors(validationErrors: ValidationError[]): string {
  let errorsArray: string[] = [];

  for (let error of validationErrors) {
      let errorsString= '';

      for (let constraint in error.constraints) {
          if (!error.constraints.hasOwnProperty(constraint)) {
              continue;
          }
          errorsString += ` - ${error.constraints[constraint]} <br>`;
      }
      errorsArray.push(errorsString);
  }
  return errorsArray.join('\n');
}