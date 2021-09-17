import { UserReducerInterface } from './userTypes';

export interface MembersReducerInterface {
  members: { [key: string]: UserReducerInterface };
  member: UserReducerInterface;
}
