import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

export interface ScanDocumentParams {
  barcode: string;
  category:
    | "wrr"
    | "lpnum"
    | "lpnnum_wto"
    | "lpnnum_srto"
    | "wrr_wto"
    | "lpnnum_srto"
    | "wrr_wto_outbound"
    | "lpnnum_wto_outbound"
    | "wpto"
    | "wpto_item"
    | "cc"
    | "cc_item"
    | "sloc"
    | "sloc_item"
    | "sloc_bin"
    | "pir"
    | "pir_item"
    | "whrepto"
    | "whrepto_item"
    | "whrepto_bin"
    | "bnt"
    | "bnt_item"
    | "bnt_bin"
    | "spl"
    | "spl_item"
    | "dts"
    | "dts_item"
    | "tms_shop_doc"
    | "tms_SO_item";
}

interface PutawayDetails {
  limit: number;
  offset: number;
  category: "PUR" | "WHS" | "SRTO";
}

interface ConnectToPHPParams {
  recid: any;
  docnum: string;
  type: string;
  onSuccess: () => void;
  onFailure: (e: any) => void;
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

export const getDocument = createAsyncThunk(
  "general/getDocument",
  async (
    {barcode, category}: ScanDocumentParams,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/scanBarcode/?barcode=${barcode}&category=${category}`;

      const response = await axios.get(url);
      console.log("eto");

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPutaway = createAsyncThunk(
  "general/getPutaway",
  async (
    {category, limit, offset}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=${category}&limit=${limit}&offset=${offset}}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const connectToPHP = createAsyncThunk(
  "general/connectToPHP",
  async (props: ConnectToPHPParams, {rejectWithValue, getState}) => {
    const state = getState() as RootState;
    const {
      user: {userDetails, sesid},
      phpServer: {traccDomain, traccDirectory},
    } = state.auth;
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
      onFailure,
      onSuccess,
    } = props;

    if (!userDetails || !sesid) {
      console.log("sesid missing and userdetails");
      onFailure("User details or sesid missing");
      return rejectWithValue("User details or sesid missing");
    }
    if (!traccDirectory || !traccDomain) {
      console.log("domain and dir are missing");
      onFailure("Missing Domain and Directory");
      return rejectWithValue("Missing Domain and Directory");
    }

    const formData = new FormData();
    formData.append("asdfglmiwms", sesid);
    formData.append("pdt_usrcde", userDetails.usrcde);
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

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {},
      });
      const formattedResult = await response.json();
      onSuccess();
      return formattedResult;
    } catch (error: any) {
      console.log(error);
      onFailure(error);
      return rejectWithValue(error.message);
    }
  }
);
