export interface STGDetailsModel {
  docnum: string;
  itmcde: string;
  itmdsc: string;
  itmqty: number;
  untmea: string;
  batchnum: string;
  mfgdte: string;
  expdte: string;
  binnum: string | null;
  binto: string;
  binfrom: string;
  linenum: number;
  recid: number;
  validated: number;
  scanqty: number;
  batchexist: boolean;
  reqbatchnum: boolean;
}
