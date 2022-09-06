export enum Sex {
  Keep = -1,
  Female = 0,
  Male = 1,
}

export interface PersonalModel {
  nickName: string;
  avatarUrl: string;
  sex: Sex;
}
