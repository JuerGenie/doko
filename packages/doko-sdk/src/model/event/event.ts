import { DodoEventData } from "./event-data.js";
import { DodoEventType } from "./event-type.js";

export enum DodoDataType {
  BusinessData = 0,
}

export type DodoEvent =
  | {
      type: 1;
    }
  | {
      type: DodoDataType.BusinessData;
      data: DodoEventData<DodoEventType>;
    };
