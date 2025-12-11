import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*<>?])[A-za-z\d!@#$%^&*<>?]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}
