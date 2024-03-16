export interface ProductData {
  docnum: string;
  itmcde: string;
  itmdsc: string;
  itmqty: number;
  intqty: number;
  untmea: string;
  lpnnum: string;
  batchnum: string | null;
  mfgdte: string | null;
  expdte: string | null;
  recid: number;
  copyline: number;
  linklpnnum: string | null;
  addbatch: number;
  batchexist: boolean;
  reqbatchnum: boolean;
  reachlimit: boolean;
  linenum: number;
  srtqty: number;
}
