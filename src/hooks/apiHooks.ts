import {useAppSelector, useAppDispatch} from "../store/store";
import {ScanDocumentParams} from "../store/actions/generalActions";
import axios, {AxiosResponse} from "axios";
import {Alert} from "react-native";
import {setStatus} from "../reducers/statusReducer";
import {useServiceHooks} from "./serviceHooks";
import {
  handleToggleNotificationModal,
  handleSetNotificationText,
} from "../reducers/modalReducer";

interface ConnectToPHPParams {
  recid: any;
  docnum: string;
  type: string;
  refnum?: string;
  lpnnum?: string;
  itmcde?: string;
  itmdsc?: string;
  batchnum?: string;
  mfgdte?: string;
  expdte?: string;
  copyline?: string;
  spldocnum?: string;
  soconum?: string;
}
interface GetLPN {
  lpnnum: string;
  usage: "pur" | "whs";
}
interface ValidateBin {
  binnum: string;
  lpnnum: string;
  patchUrl: string;
}

interface Endpoint {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  payload?: any;
}

interface Result {
  success: boolean;
  data?: any;
  error?: string;
}

export const useAPIHooks = () => {
  const {
    user: {userDetails, sesid},
    phpServer: {traccDomain, traccDirectory},
    server: {ipAddress, port, protocol},
  } = useAppSelector((state) => state.auth);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();
  const {handleGet, handlePost, handlePatch} = useServiceHooks();

  const baseUrl = `${protocol}://${ipAddress}:${port}`;

  const connectToPHPNotDispatch = async (props: ConnectToPHPParams) => {
    const {
      docnum,
      recid,
      type,
      batchnum = "",
      copyline = "",
      expdte = "",
      itmcde = "",
      itmdsc = "",
      lpnnum = "",
      mfgdte = "",
      refnum = "",
      soconum = "",
      spldocnum = "",
    } = props;

    console.log(userDetails, sesid);

    if (!userDetails?.usrcde) {
      throw new Error("Missing Usercode");
    }
    if (!sesid) {
      throw new Error("Missing Session ID");
    }
    if (!traccDirectory || !traccDomain) {
      throw new Error("Missing TRACC Domain or Directory");
    }
    const formData = new FormData();
    formData.append("asdfglmiwms", sesid);
    formData.append("pdt_usrcde", userDetails?.usrcde);
    formData.append("from_pdt", "true");

    let targerPPHP = "",
      event_action = "";

    switch (type) {
      case "PTO":
        targerPPHP = "trn_purchaseto_ajax.php";
        event_action = "post_to";
        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        break;

      case "PTO_ADDBATCH":
        targerPPHP = "trn_purchaseto_ajax.php";
        event_action = "save_addbatch";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("ptodocnum", docnum);
        formData.append("addlpnnum", lpnnum);
        formData.append("additmcde", itmcde);
        formData.append("additmdsc", itmdsc);
        formData.append("addbatchnum", batchnum);
        formData.append("addmfgdte", mfgdte);
        formData.append("addexpdte", expdte);
        formData.append("hid_addcopyline", copyline);
        break;

      case "rearrangelinennum":
        targerPPHP = "trn_purchaseto_ajax.php";
        event_action = "rearrangelinennum";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        break;

      case "chk_binbatch_onhand":
        targerPPHP = "trn_wavepicksocoadd.php";
        event_action = "chk_binbatch_onhand";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        break;

      case "VALIDATE_WPL":
        targerPPHP = "trn_wavepicksocoadd.php";
        event_action = "chk_validated_posted";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        formData.append("for_posting", "1");
        break;

      case "STOCKREP_delete_item":
        targerPPHP = "trn_stockreplenishmenttransferorder_ajax.php";
        event_action = "delete_item";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[recid]", recid);
        break;

      case "INVPOST":
        targerPPHP = "trn_wavepicksocoadd.php";
        event_action = "post_docWPL";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        formData.append("spldocnum", spldocnum);
        formData.append("sonum", soconum);
        formData.append("fromspl", "1");
        break;

      case "WTO":
        targerPPHP = "trn_whstointransit_ajax.php";
        event_action = "post_to";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        break;

      case "SRTO":
        targerPPHP = "trn_salesreturnadd.php";
        event_action = "post_to";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        break;

      case "WPTO":
        targerPPHP = "trn_wavepicksocoadd.php";
        event_action = "post_docWPL";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("docnum", docnum);
        break;

      case "PTAPUR":
        targerPPHP = "trn_putawayto_ajax.php";
        event_action = "postputawayto";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("intnum", docnum);
        break;

      case "PTAWHS":
        targerPPHP = "trn_putawayto_whsto_ajax.php";
        event_action = "postputawayto";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("intnum", docnum);
        break;

      case "CC":
        targerPPHP = "trn_cyclecount_ajax.php";
        event_action = "validate_item";

        // let arr_data = [];
        // let cc_item = await this.CycleCountFile2Service.getAll({
        //   docnum: docnum,
        //   _includes: "recid,uncounted,stritmqty",
        // });
        // for (let value of cc_item) {
        //   let temp_obj = {};
        //   if (value.recid > 0) {
        //     temp_obj.recid = value.recid.toString();
        //     temp_obj.uncounted = value.uncounted.toString();
        //     temp_obj.itmqty = value.stritmqty;
        //     if (value.stritmqty == "") temp_obj.uncounted = "1";
        //     arr_data.push(temp_obj);
        //   }
        // }

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[source]", "PDT");
        // formData.append("xarr_data", JSON.stringify(arr_data));
        break;

      case "VALIDATE_SLOC":
        targerPPHP = "trn_sloctosloc_ajax.php";
        event_action = "check_bin";

        formData.append("event_action", event_action);
        formData.append("docnum", docnum);
        formData.append("recid", recid);
        formData.append("xpar", "POST");
        break;

      case "SLOC":
        targerPPHP = "trn_sloctosloc_ajax.php";
        event_action = "post_item";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[recid]", recid);
        formData.append("xparams[xpar]", "POST");
        break;

      case "VALIDATE_PIR":
        // targerPPHP = "trn_phc_multiperday_ajax.php";
        // event_action = "check_1isto1"; // laging icheck pagmay changes dito. damay ung counter part

        targerPPHP = "trn_phc_multiperday_info_addbin.php";
        event_action = "validate_allitem";

        formData.append("event_action", event_action);
        formData.append("docnum", docnum);
        formData.append("refnum", refnum);
        break;

      case "PIR":
        targerPPHP = "trn_phc_multiperday_info_addbin.php";
        event_action = "uncounted";

        formData.append("event_action", event_action);
        formData.append("docnum", docnum);
        formData.append("refnum", refnum);
        break;
      case "VALIDATE_WHREPTO":
        targerPPHP = "trn_stockreplenishmenttransferorder_ajax.php";
        event_action = "check_bin";

        formData.append("event_action", event_action);
        formData.append("docnum", docnum);
        formData.append("recid", recid);
        break;

      case "WHREPTO":
        targerPPHP = "trn_stockreplenishmenttransferorder_ajax.php";
        event_action = "post_item";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[recid]", recid);
        break;

      case "BNT_SOFTVAL":
        targerPPHP = "trn_add_stt_bintobin.php";
        event_action = "validate_post";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[recid]", recid);
        formData.append("xparams[par]", "POST");
        break;

      case "BNT_POST":
        targerPPHP = "trn_add_stt_bintobin.php";
        event_action = "post_item";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[recid]", recid);
        formData.append("xparams[par]", "POST");
        break;

      case "WTO_SOFTVAL":
        targerPPHP = "trn_whs_transfer_outbound_to_ajax.php";
        event_action = "validatedocument";

        formData.append("event_action", event_action);
        formData.append("id", recid);
        formData.append("posting", "yes");
        break;

      case "WTO_POST":
        targerPPHP = "trn_whs_transfer_outbound_to_ajax.php";
        event_action = "post-unpost";

        formData.append("event_action", event_action);
        formData.append("id", recid);
        formData.append("type", "Post");
        break;

      case "SPL":
        targerPPHP = "trn_singlepicksocoadd.php";
        event_action = "post_doc";

        formData.append("event_action", event_action);
        formData.append("docnum", docnum);
        break;

      case "DTS_SOFTVAL":
        targerPPHP = "trn_dts_to_ajax.php";
        event_action = "validate_post";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[par]", "POST");
        formData.append("xparams[source]", "PDT");
        formData.append("xparams[recid]", recid);
        formData.append("xparams[docnum]", docnum);
        break;

      case "DTS_POST":
        targerPPHP = "trn_dts_to_ajax.php";
        event_action = "post_item";

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[par]", "POST");
        formData.append("xparams[source]", "PDT");
        formData.append("xparams[recid]", recid);
        formData.append("xparams[docnum]", docnum);
        break;

      default:
        console.log("default");
        break;
    }

    const url = `${traccDomain}${traccDirectory}/${targerPPHP}`;
    console.log("post url:", url);

    console.log("pinasa", formData);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {},
      });
      const formattedResult = await response.json();
      console.log("sukli", formattedResult);

      if (formattedResult.sofValMsg.length > 0) {
        dispatch(handleToggleNotificationModal());
        dispatch(handleSetNotificationText(formattedResult.sofValMsg));
        return null;
      }
      if (formattedResult.bool) {
        console.log("connect php success");
        return formattedResult;
      } else {
        console.log("connect php error");
        // throw new Error(formattedResult.pdtmsg["1"] || formattedResult.msg);
        Alert.alert(
          "Transaction Posting Fail",
          `${formattedResult.pdtmsg["1"] || formattedResult.msg}`,
          [
            {
              text: "Ok",
              onPress: () => {},
              style: "destructive",
            },
          ]
        );
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const scanBarcode = async (
    queryParams: ScanDocumentParams,
    disableStatus?: boolean
  ) => {
    dispatch(setStatus("loading"));
    try {
      const {barcode, category, ...restParams} = queryParams;
      const searchParams = new URLSearchParams();
      searchParams.append("barcode", barcode);
      searchParams.append("category", category);

      for (const key in restParams) {
        if (Object.prototype.hasOwnProperty.call(restParams, key)) {
          const value = restParams[key];
          if (value !== undefined) {
            searchParams.append(
              key,
              typeof value === "number" ? String(value) : value
            );
          }
        }
      }
      const url = `${baseUrl}/api/scanbarcode/?${searchParams.toString()}`;

      console.log("daan", url);

      const response = await axios.get(url);
      if (response.data.bool) {
        !disableStatus && dispatch(setStatus("success"));
        console.log("tae", response.data);
        return response.data;
      } else {
        console.log("mali", response.data);
        dispatch(setStatus("failed"));
        Alert.alert("Something Went Wrong", response.data.message, [
          {
            text: "OK",
          },
        ]);
        return null;
      }
    } catch (error: any) {
      dispatch(setStatus("failed"));
      console.log(error);
      Alert.alert("Something Went Wrong", "Server Error", [
        {
          text: "OK",
        },
      ]);
    }
  };

  const getLPN = async ({lpnnum, usage}: GetLPN) => {
    try {
      dispatch(setStatus("loading"));
      let response;
      let url = "";

      switch (usage) {
        case "pur":
          url = `lst_tracc/purchasetofile2?lpnnum=${lpnnum}&ptostat=TO%20-%20POSTED`;
          break;
        case "whs":
          url = `lst_tracc/warehousetransferorderfile2?lpnnum=${lpnnum}&posted=1`;
          break;

        default:
          break;
      }

      response = await handleGet({
        url: url,
        disableToast: true,
      });

      if (response.length === 0) {
        dispatch(setStatus("idle"));
        Alert.alert(
          "LPN Not Ready",
          "LPN Number is not ready for Putway TO Validation",
          [
            {
              text: "OK",
            },
          ]
        );
        return;
      }
      if (response) {
        if (response[0].ptaval === 1) {
          dispatch(setStatus("idle"));
          Alert.alert("Search Error", "LPN already Validated", [
            {
              text: "OK",
            },
          ]);
        } else {
          dispatch(setStatus("idle"));
          return response;
        }
      }
      return null;
    } catch (error) {
      Alert.alert("Something Went Wrong", "Server error", [
        {
          text: "OK",
        },
      ]);
    }
  };

  const getBinAndValidate = async ({binnum, lpnnum, patchUrl}: ValidateBin) => {
    try {
      const binDetails = await handleGet({
        url: `lst_tracc/binfile1?binnum=${binnum}`,
        disableToast: true,
      });

      console.log("ito ang bin", binDetails);
      console.log();

      if (binDetails) {
        if (binDetails.length === 0) {
          Alert.alert("Bin Error", "Bin Number Not Found", [
            {
              text: "OK",
            },
          ]);
        } else if (binnum !== selectedDocument.binnum2) {
          Alert.alert("Invalid Bin Number", "Bin Number did not matched.", [
            {
              text: "OK",
            },
          ]);
        } else {
          const patchDocument = {
            field: {
              lpnnum: lpnnum,
            },
            data: {
              ptaval: 1,
              putawayvalidby: userDetails?.usrcde,
            },
          };
          handlePatch({
            // url: "lst_tracc/purchasetofile2",
            url: patchUrl,
            requestData: patchDocument,
            disableToast: true,
          });
          return binDetails;
        }
      }
    } catch (error) {
      Alert.alert("Something Went Wrong", "Server error", [
        {
          text: "OK",
        },
      ]);
    }
  };

  const removeScannedQuantityService = async (
    endpoints: Endpoint[],
    onSucces: () => void
  ): Promise<Result[]> => {
    const results: Result[] = [];
    dispatch(setStatus("loading"));

    const promises = endpoints.map(async (endpoint) => {
      const {url, method, payload} = endpoint;

      const completeUrl = `${baseUrl}/api/${url}`;

      try {
        let response: AxiosResponse;
        switch (method) {
          case "GET":
            response = await axios.get(completeUrl);
            break;
          case "POST":
            response = await axios.post(completeUrl, payload);
            break;
          case "PATCH":
            response = await axios.patch(completeUrl, payload);
            break;
          case "DELETE":
            response = await axios.delete(completeUrl);
            break;

          default:
            throw new Error(`Unsupported method: ${method}`);
        }
        results.push({success: true, data: response.data});
      } catch (error: any) {
        results.push({success: false, error: error.message});
      }
    });

    await Promise.all(promises);
    dispatch(setStatus("success"));
    onSucces();
    return results;
  };

  return {
    scanBarcode,
    connectToPHPNotDispatch,
    getLPN,
    getBinAndValidate,
    removeScannedQuantityService,
  };
};
