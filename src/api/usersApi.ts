import axios from "axios";
import type { RandomUserApiResponse, User } from "../types";

export const fetchUsersApi = async (): Promise<User[]> => {
  const res = await axios.get<RandomUserApiResponse>(
    "https://randomuser.me/api/?results=50"
  );

  return res.data.results.map((user) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    city: user.location.city,
    country: user.location.country,
    phone: user.phone,
    address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
    picture: user.picture.large,
  }));
};
