export interface SLOC {
  status: string | null;
  docnum: string;
  trncde: string;
  remarks: string;
  trntot: number;
  usrnam: string;
  curcde: string | null;
  currte: number;
  logtim: string;
  warcde: string;
  wardsc: string | null;
  cuscde: string | null;
  cusdsc: string | null;
  totvaramt: number;
  trntypcde: string | null;
  argnum: string | null;
  comstat: string | null;
  disinvgl: string | null;
  doclock: string | null;
  trndte: string;
  logdte: string;
  vardte: string | null;
  gldepcde: string | null;
  refnum: string | null;
  warcdenum: string;
  warloccde: string;
  validate: string;
  binfrom: string | null;
  binto: string | null;
  counted: string | null;
  invmvmnttyp: string | null;
  recid: number;
}
export interface SLOCDetails {
  batchnum: string | null;
  binnum: string;
  binnum2: string;
  docnum: string;
  expdte: string | null; // Assuming date format, change if needed
  itmcde: string;
  itmdsc: string;
  itmqty: number;
  linenum: number;
  mfgdte: string | null; // Assuming date format, change if needed
  recid: number;
  reqbatchnum: boolean;
  scanqty: number;
  showscanqty: boolean;
  sourcescan: boolean;
  targetscan: boolean;
  untmea: string;
  validate: number;
}
