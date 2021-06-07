import { useUsersByUsernamesQuery } from "../generated/graphql";

interface Props {
  username?: string[];
}

export const useGetUser = ({ username }: Props) => {
  const users = useUsersByUsernamesQuery({
    skip: username == [] || username == [''] || username == null,
    variables: {
      usernames: username,
    },
  });

  return users?.data?.usersByUsernames.data;
};
  