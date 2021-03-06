import { User } from "../user/user-types";

export interface SearchUserResults {
  total_count: number,
  incomplete_results: boolean;
  items: User[];
}