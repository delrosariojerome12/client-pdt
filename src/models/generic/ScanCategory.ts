export interface ScanCategory {
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