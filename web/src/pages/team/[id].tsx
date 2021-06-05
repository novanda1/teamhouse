import { WaitForAuth } from "../../modules/auth/WaitForAuth";
import { MainScreen } from "../../modules/common/MainScreen";
import { withApollo } from "../../utils/withApollo";

const Team: React.FC = () => {
    return (
        <>
            <WaitForAuth>
                <MainScreen />
            </WaitForAuth>
        </>
    );
};

export default withApollo()(Team);
