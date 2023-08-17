import { ShiftType } from "./shift_type";

export type HTSale = {
  item: string; //item id
  icon: string; //fontawesome ref
  item_name: string;
  amount: number;
  log_points: number; //calculated value of log
  log: string; //log id
};

export type HTStaff = {
  staff: string; //staff id
  staff_name: string;
  shift_points: number; //score for the shift
  sales: Array<HTSale>;
};

export type HTCluster = {
  timestamp: string;
  author: string; //user id
  staffs: Array<HTStaff>;
};

export type HTShiftID = {
  date: number;
  shift_type: ShiftType;
};

export type HTShift = {
  _id: HTShiftID;
  clusters: Array<HTCluster>;
};
