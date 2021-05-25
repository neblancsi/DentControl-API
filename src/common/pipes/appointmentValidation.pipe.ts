import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppointmentValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    if (!value.newPatient && value.patient_id == undefined) {
      throw new BadRequestException('no patient provided');
    } else if (value.newPatient && value.patient_id !== undefined) {
      throw new BadRequestException(
        'request cannot contain patient ID in case of new patient',
      );
    } else {
      return value;
    }
  }
}
