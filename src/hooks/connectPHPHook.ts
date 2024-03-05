import {useAppSelector} from "../store/store";
import {useState} from "react";
import {Alert} from "react-native";

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

export const useConnectPHPHook = () => {
  const {
    user: {userDetails, sesid},
    phpServer: {traccDomain, traccDirectory},
  } = useAppSelector((state) => state.auth);

  const connectToPHP = async (props: ConnectToPHPParams) => {
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

    if (userDetails && sesid) {
      try {
        let targerPPHP = "",
          event_action = "",
          continue_exec = true,
          return_data;
        let formData = new FormData();
        //   const userdevice = await this.getDeviceCredentials();
        //   let tokenval = await this.userService.getAll({usrcde: userdevice.usrcde});
        formData.append("asdfglmiwms", sesid);
        formData.append("pdt_usrcde", userDetails.usrcde);
        formData.append("from_pdt", true.toString());

        switch (type) {
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

          case "rearrangelinennum":
            targerPPHP = "trn_purchaseto_ajax.php";
            event_action = "rearrangelinennum";

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

          case "PTO":
            targerPPHP = "trn_purchaseto_ajax.php";
            event_action = "post_to";
            formData.append("event_action", event_action);
            formData.append("recid", recid);
            formData.append("docnum", docnum);
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
            continue_exec = false;
            break;
        }

        if (continue_exec) {
          const tracc_progdomain = traccDomain; // Provide the domain here
          const tracc_progdir = traccDirectory; // Provide the directory here
          if (
            tracc_progdomain != null &&
            tracc_progdomain !== "" &&
            tracc_progdir != null &&
            tracc_progdir !== ""
          ) {
            const url = `${tracc_progdomain}${tracc_progdir}/${targerPPHP}`;

            const response = await fetch(url, {
              method: "POST",
              body: formData,
              headers: {},
            });

            const formattedResult = await response.json();

            if (formattedResult.bool) {
              console.log("1");

              return_data = {
                success: true,
                softval: formattedResult.softval,
                softvalmsg: formattedResult.softvalmsg,
                log: "success",
                msg: "",
                response_data: formattedResult,
              };
            } else {
              console.log("2");

              return_data = {
                success: false,
                log: "failed",
                msg: "",
                response_data: formattedResult,
              };
            }
          } else {
            console.log("3");

            return_data = {
              success: false,
              log: "catcherr",
              msg: "Something went wrong...",
              response_data: {},
            };
          }
        } else {
          console.log("4");

          return_data = {
            success: false,
            log: "catcherr",
            msg: "Something went wrong...",
            response_data: {},
          };
        }

        console.log("posted", return_data);

        return return_data;
      } catch (e) {
        console.log(e);
        Alert.alert(
          "Notification",
          `Something went wrong: ${e}`,
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "cancel",
            },
          ],
          {cancelable: false}
        );
      }
    } else {
      Alert.alert(
        "Auth Error",
        `User Details and sesid missing`,
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
        {cancelable: false}
      );
    }
  };

  return {connectToPHP};
};
