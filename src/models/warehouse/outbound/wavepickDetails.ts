export interface WavepickItem {
  docnum: string;
  itmcde: string;
  itmdsc: string;
  itmqty: number;
  intqty: number;
  untmea: string;
  batchnum: string;
  mfgdte: string;
  expdte: string;
  lpnnum: string | null;
  binnum: string;
  linenum: number;
  recid: number;
  binnum2: string;
  validated: number;
  scanqty: number;
  batchexist: boolean;
  reqbatchnum: boolean;
}
