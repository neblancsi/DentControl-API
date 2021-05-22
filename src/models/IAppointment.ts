export interface Appointment {
  date: Date;
  patient_id?: number;
  doctor_id: number;
  newPatient: boolean;
}
