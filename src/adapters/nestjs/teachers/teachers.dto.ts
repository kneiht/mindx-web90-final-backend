// Response DTO for GET /teachers
export class TeacherResponseDto {
  code: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  address?: string;
  positions: {
    name: string;
    code: string;
    description?: string;
  }[];
  degrees: {
    type: string;
    school: string;
    major: string;
    year: number;
    isGraduated: boolean;
  }[];
}
