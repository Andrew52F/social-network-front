export type IProfile = {
  id?: string;
  username: string,
  name: string,
  surname: string,
  isMale: boolean,
  birthDate?: Date;
  image?: string
}