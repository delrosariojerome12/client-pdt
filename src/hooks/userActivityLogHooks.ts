import moment from "moment";
import { METHODS } from "../enums/activitylog";
import { useAppSelector } from "../store/store";
import { useServiceHooks } from "./serviceHooks";

interface Data {
  method: METHODS;
  activity: string;
  remarks: String;
}

interface ActionData {
  method: METHODS;
  activity: string;
  remarks: String;
}

export const useUserActivityLog = () => {
  const { userDetails } = useAppSelector((state) => state.auth.user);
  const { handlePost } = useServiceHooks();

  const postActivity = async (data: Data) => {
    const payloadData = {
      ...data,
      usrname: userDetails?.usrname,
      usrcde: userDetails?.usrcde,
      trndte: moment().format("YYYY-MM-DD HH:mm:ss"),
      usrdte: moment().format("YYYY-MM-DD"),
      usrtim: moment().format("LTS"),
      logdte_client: moment().format("YYYY-MM-DD HH:mm:ss"),
      logdte_server: moment().format("YYYY-MM-DD HH:mm:ss"),
      module: "NG_WMS",
    };

    handlePost({
      url: "lst_tracc/useractivitylogfile",
      requestData: [payloadData],
      disableToast: true,
    });
  };

  const updateAction = (data: ActionData) => {
    const finalCreateData = { ...data };
    postActivity(finalCreateData);
  };

  return {
    postActivity,
    updateAction,
  };
};
