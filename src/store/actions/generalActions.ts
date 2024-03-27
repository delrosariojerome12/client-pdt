import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { ScanCategory } from "../../models/generic/ScanCategory";
export interface ScanDocumentParams {
  barcode: string;
  category: ScanCategory;
  itmcde?: string;
  untmea?: string;
  copyline?: string;
  intnum?: string;
  linklpnnum?: string;
  addbatch?: string;
  docnum?: string;
  lpnnum?: string;
  pdtmanualqtyinbound?: string;
  pdtmanualqtyoutbound?: string;
  display_linenum?: number;
  intqty?: number;
  itmqty?: number;
  srtqty?: number;
  recid?: string;
  scanlevel?: string;
  barcodelvl2?: string;
  refnum?: string;
  usrnam?: string;
  tms_docnum?: string;
  spl_docnum?: string;
  fromspl?: string;
  tms_category?: string;
  scanneditem?: string;
  linenum?: string;
  [key: string]: string | number | undefined;
}

interface BatchPayload {
  limit: number;
  offset: number;
  itmcde: string;
  paginating?: boolean;
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
  onSuccess: (res?: any) => void;
  onFailure: (e: any) => void;
  dontShowSuccess?: boolean;
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

interface BatchUpdate {
  document: {
    field: {
      docnum: string;
    };
    data: {
      pdtopen: "Y";
      doclock: "Y";
    };
  };
  item: {
    field: {
      lpnnum: string;
    };
    data: {
      mfgdte: string;
      expdte: string;
      batchnum: string;
    };
  };
  onSuccess: () => void;
}

interface WarehousePayload {
  limit: number;
  offset: number;
  paginating?: boolean;
}

interface ItemPayload {
  limit: number;
  offset: number;
  paginating?: boolean;
}

interface BinNumPayload {
  limit: number;
  offset: number;
  paginating?: boolean;
}

export const getDocument = createAsyncThunk(
  "general/getDocument",
  async (
    { barcode, category }: ScanDocumentParams,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/scanBarcode/?barcode=${barcode}&category=${category}`;

      const response = await axios.get(url);
      console.log("eto");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPutaway = createAsyncThunk(
  "general/getPutaway",
  async (
    { category, limit, offset }: PutawayDetails,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

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
  async (props: ConnectToPHPParams, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const {
      user: { userDetails, sesid },
      phpServer: { traccDomain, traccDirectory },
      server: { ipAddress, port, protocol },
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
      dontShowSuccess,
    } = props;

    if (!userDetails || !sesid) {
      console.log("sesid missing and userdetails");
      onFailure("User details or sesid missing. Try re-logging in.");
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

    const baseURl = `${protocol}://${ipAddress}:${port}`;

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

      case "PTAPUR":
        targerPPHP = "trn_putawayto_ajax.php";
        event_action = "postputawayto";

        formData.append("event_action", event_action);
        formData.append("recid", recid);
        formData.append("intnum", docnum);
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

        let arr_data = [];
        const cc_item: any = await axios.get(
          `${baseURl}/api/lst_tracc/cyclecountfile2?docnum=${docnum}&_includes=recid,uncounted,stritmqty`
        );

        for (let value of cc_item.data) {
          let temp_obj: any = {};

          if (value.recid > 0) {
            temp_obj.recid = value.recid.toString();
            temp_obj.uncounted = value.uncounted.toString();
            temp_obj.itmqty = value.stritmqty;

            if (value.stritmqty === "") temp_obj.uncounted = "1";

            arr_data.push(temp_obj);
          }
        }

        formData.append("xparams[event_action]", event_action);
        formData.append("xparams[docnum]", docnum);
        formData.append("xparams[source]", "PDT");
        formData.append("xarr_data", JSON.stringify(arr_data));

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

    console.log("form data", formData);
    function stripHtmlTags(html: any) {
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    }
    function cleanHTML(text: string): string {
      var regex = /<br\s*[\/]?>/gi;
      return text.replace(regex, ". ");
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {},
      });
      const formattedResult = await response.json();
      console.log("AXIOS RESPONSE:", formattedResult);

      if (formattedResult.bool) {
        if (formattedResult.softvalmsg && !formattedResult.softval) {
          onSuccess(cleanHTML(formattedResult.softvalmsg));
          return { formattedResult, dontShowSuccess };
        }
        onSuccess(formattedResult);
        return { formattedResult, dontShowSuccess };
      } else {
        if (formattedResult.msg) {
          const listItemRegex = /<li>(.*?)<\/li>/g;
          const listItems = [];
          let match;
          while ((match = listItemRegex.exec(formattedResult.msg)) !== null) {
            const strippedItem = stripHtmlTags(match[1]);
            listItems.push(strippedItem);
          }

          const formattedList = listItems
            .map((item, index) => `• Item Line ${index + 1}: ${item}`)
            .join("\n");

          onFailure(formattedList || stripHtmlTags(formattedResult.msg));
          return rejectWithValue(
            formattedList || stripHtmlTags(formattedResult.msg)
          );
        }
        if (formattedResult.errmsg) {
          onFailure(formattedResult.errmsg);
          return rejectWithValue(formattedResult.errmsg);
        }
        if (formattedResult.pdtmsg) {
          let errorMessage = "Something Went Wrong";
          const errorKeys = Object.keys(formattedResult.pdtmsg);
          errorKeys.forEach((key) => {
            const errorMessages = formattedResult.pdtmsg[key];
            errorMessage += `\n${errorMessages.join(", ")}`;
          });
          onFailure(errorMessage || formattedResult.msg);
          return rejectWithValue(errorMessage);
        }
        if (formattedResult.msg) {
          let errorMessage = "Something Went Wrong";
          onFailure(errorMessage || formattedResult.msg);
          return rejectWithValue(errorMessage);
        }
      }
    } catch (error: any) {
      console.log("mali", error);
      onFailure(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getBatch = createAsyncThunk(
  "general/getBatch",
  async (
    { limit, offset, paginating, itmcde }: BatchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/batchfile?itmcde=${itmcde}&_limit=${limit}&_offset=${offset}`;

      console.log("daan", url);

      const response = await axios.get(url);

      return {
        data: response.data,
        paginating: paginating,
      };
    } catch (error: any) {
      console.log("mali:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateBatch = createAsyncThunk(
  "general/updateBatch",
  async (
    { document, item, onSuccess }: BatchUpdate,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url1 = `${protocol}://${ipAddress}:${port}/api/lst_tracc/purchasetofile1`;
      const url2 = `${protocol}://${ipAddress}:${port}/api/lst_tracc/purchasetofile2`;

      // const responseDocument = await axios.patch(url1, document);
      // const responseItem = await axios.patch(url2, item);

      const [responseDocument, responseItem] = await Promise.all([
        axios.patch(url1, document),
        axios.patch(url2, item),
      ]);

      onSuccess();

      console.log("mga pinasa");
      console.log(document, item);

      console.log("responder");
      console.log(responseDocument);
      console.log(responseItem);

      return {
        item: responseItem.data,
        document: responseDocument.data,
      };
    } catch (error: any) {
      console.log("mali:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getWarehouse = createAsyncThunk(
  "general/getWarehouse",
  async (
    { limit, offset, paginating }: WarehousePayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;
      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/warehousefile2?warcde=nev2:%20null&warcdenum=nev2:%20null&warloccde=nev2:%20null&_limit=${limit}&_offset=${offset}`;
      const response = await axios.get(url);

      return {
        data: response.data,
        paginating: paginating,
      };
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getItem = createAsyncThunk(
  "general/getItem",
  async (
    { limit, offset, paginating }: ItemPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/itemfile?itmcde=nev2:%20null&_limit=${limit}&_offset=${offset}`;
      const response = await axios.get(url);

      return {
        data: response.data,
        paginating: paginating,
      };
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getBinNum = createAsyncThunk(
  "general/getBinNum",
  async (
    { limit, offset, paginating }: BinNumPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/binfile1?binnum=nev2:%20null&_limit=${limit}&_offset=${offset}`;
      const response = await axios.get(url);

      return {
        data: response.data,
        paginating: paginating,
      };
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.message);
    }
  }
);
