import { useUsersByIdsQuery } from "../generated/graphql";

interface Props {
  ids?: string[];
}

export const useGetUserById = ({ ids }: Props) => {
  const users = useUsersByIdsQuery({
    variables: {
      ids,
    },
  });

  return users;
};
