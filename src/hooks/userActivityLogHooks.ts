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

interface User {
  usrname: string;
  usrcde: string;
  token: string;
}

export const useUserActivityLog = () => {
  const { userDetails } = useAppSelector((state) => state.auth.user);
  const { handlePost } = useServiceHooks();

  const postActivity = async (data: Data, user?: User) => {
    const payloadData = {
      ...data,
      usrname: userDetails?.usrname || user?.usrname,
      usrcde: userDetails?.usrcde || user?.usrcde,
      trndte: moment().format("YYYY-MM-DD HH:mm:ss"),
      usrdte: moment().format("YYYY-MM-DD"),
      usrtim: moment().format("LTS"),
      logdte_client: moment().format("YYYY-MM-DD HH:mm:ss"),
      logdte_server: moment().format("YYYY-MM-DD HH:mm:ss"),
      module: "NG_WMS",
    };

    console.log("dito ?", userDetails);

    handlePost({
      url: "lst_tracc/useractivitylogfile",
      requestData: [payloadData],
      disableToast: true,
      config: {
        headers: {
          Authorization: `Bearer ${userDetails?.token || user?.token}`,
        },
      },
    });
  };

  const updateAction = (data: ActionData, user?: User) => {
    const finalCreateData = { ...data };
    postActivity(finalCreateData, user);
  };

  return {
    postActivity,
    updateAction,
  };
};
