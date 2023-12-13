import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({ example: 'User authenticated' })
  message: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    nullable: true,
  })
  data: {
    accessToken: string;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
