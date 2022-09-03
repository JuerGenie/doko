export enum Sex {
  Keep = -1,
  Female = 0,
  Male = 1,
}

export interface Personal {
  nickName: string;
  avatarUrl: string;
  sex: Sex;
}
