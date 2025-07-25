import { User, UserCreate } from "../types/user.types";
import { UserApi } from "./UserApi";

export const userService = new UserApi<User, UserCreate>();
