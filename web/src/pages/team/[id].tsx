import { NextPage } from "next";
import { useEffect } from "react";
import { WaitForAuth } from "../../modules/auth/WaitForAuth";
import { MainScreen } from "../../modules/common/MainScreen";
import { usePanelStore, IPanelStore } from "../../modules/common/usePanelStore";
import { withApollo } from "../../utils/withApollo";

const Team: NextPage = () => {
  const panel = usePanelStore();
  useEffect(() => {
    panel.set((s: IPanelStore) => void (s.mainPanel = "team"));
  }, []);
  return (
    <>
      <WaitForAuth>
        <MainScreen />
      </WaitForAuth>
    </>
  );
};

/**
 * slow
 * 8ms without this
 * 1.05s with this
 */
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const client = getStandAloneApolloClient(ctx);
//   const { data }: { data: TeamsQuery } = await client.query({
//     query: TeamsDocument,
//   });
//   const ids = data.teams.map((t) => t._id);
//   const isExists = ids.includes(ctx.params.id as string);

//   // if (!isExists) {
//   //   ctx.res.writeHead(302, { Location: "/home" });
//   //   ctx.res.end();
//   // }

//   return {
//     props: {
//       isExists,
//     },
//   };
// };

export default withApollo()(Team);
