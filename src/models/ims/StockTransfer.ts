export interface StockTransfer {
  recid: number;
  cancelrem: string | null;
  supcde: string | null;
  supdsc: string | null;
  delsta: string | null;
  delrem: string | null;
  docnum: string;
  trncde: string;
  remarks: string;
  trntot: number;
  usrnam: string;
  curcde: string | null;
  currte: number;
  trntyp: string | null;
  factor: number;
  logtim: string;
  trntypcde: string;
  cancelled: number | null;
  warcde: string;
  warcde2: string | null;
  cuscde: string | null;
  cusdsc: string | null;
  manualgl: number;
  memtypcde: string | null;
  preby: string | null;
  chkby: string | null;
  apvby: string | null;
  field01: string | null;
  field02: string | null;
  field03: string | null;
  field04: string | null;
  field05: string | null;
  field06: string | null;
  field07: string | null;
  field08: string | null;
  field09: string | null;
  field10: string | null;
  field11: string | null;
  field12: string | null;
  field13: string | null;
  field14: string | null;
  field15: string | null;
  field16: string | null;
  field17: string | null;
  field18: string | null;
  field19: string | null;
  field20: string | null;
  canceldoc: number;
  doclock: string;
  trndte: string;
  logdte: string;
  canceldte: string | null;
  smncde: string | null;
  docstatus: string | null;
  gldepcde: string | null;
  cusadd1: string | null;
  cusadd2: string | null;
  shipto: string | null;
  shipto2: string | null;
  batchnum: string | null;
  expdte: string | null;
  mfgdte: string | null;
  refnum: string | null;
  prccde: string | null;
  incprint: number;
  pcklstselect: number;
  sonum: string | null;
  sttapvr: string | null;
  sttapvstat: number;
  deldte: string | null;
  rcvdte: string | null;
  docdte: string;
  stodocnum: string | null;
  category: string | null;
  stowarcdeto: string | null;
  stiwarcdefrom: string | null;
  savingstat: string;
  trncreator: string | null;
  warcdenum: string;
  warloccde: string;
  binnum: string;
  stiwarcdenum: string;
  stiwarloccde: string;
  stowarcdenum: string;
  stowarloccde: string;
  posted: number;
  btbnum: string;
  createdte: string;
  invtrnstyp: string;
  STATUS: string | null;
  warcdenum2: string | null;
  warloccde2: string | null;
  strglvlcdefrom: string;
  strglvlcdeto: string;
  shpmntdocnum: string | null;
  wpnum: string | null;
  splnum: string | null;
  requestby: string | null;
}
