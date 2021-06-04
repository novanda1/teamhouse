import { MainScreen } from "../../modules/common/MainScreen";
import { withApollo } from "../../utils/withApollo";

const Team: React.FC = () => {
  return <MainScreen />;
};

export default withApollo()(Team);
