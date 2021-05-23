import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppointmentValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    if (!value.newPatient && !value.patient) {
      throw new BadRequestException('no patient provided from pipe');
    } else if (value.newPatient && value.patient !== undefined) {
      throw new BadRequestException(
        'request cannot contain patient ID in case of new patient',
      );
    } else {
      return value;
    }
  }
}
