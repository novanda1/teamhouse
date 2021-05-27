import { useMemo } from "react";
import { Wrapper } from "../../components/Wrapper";
import { useTeamQuery, useUsersByIdsQuery } from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { withApollo } from "../../utils/withApollo";

const Team: React.FC = () => {
  const team = useTeamQuery({ variables: { id: useGetId() } });
  const leadersId = useMemo(() => team.data?.team.leaders, [team.data]);
  const leadersUser = useUsersByIdsQuery({
    skip: leadersId === undefined || leadersId === [],
    variables: { ids: leadersId },
  });

  return <Wrapper>ok</Wrapper>;
};

export default withApollo()(Team);
