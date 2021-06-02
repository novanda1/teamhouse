import { useUsersByIdsQuery } from "../generated/graphql";

interface Props {
  ids?: string[];
}

export const useGetUserById = ({ ids }: Props) => {
  const users = useUsersByIdsQuery({
    skip: ids == [] || ids == [''] || ids == null,
    variables: {
      ids,
    },
  });

  return users?.data?.usersByIds;
};
  