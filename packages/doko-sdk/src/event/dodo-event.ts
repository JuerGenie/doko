import { DodoEventData } from "./dodo-event-data.js";
import { DodoEventType } from "./dodo-event-type.js";

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
