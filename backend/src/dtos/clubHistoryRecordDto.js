import {recordStatus} from "../constants/recordStatus.js";

class clubHistoryRecordDto {
    constructor(clubId, type, waiterNameOrId) {
        this.clubId = clubId;
        this.type = type;
        this.waiterNameOrId = waiterNameOrId;
    }

    get status(){
        if (this.clubId && this.type && this.waiterNameOrId) {
            return recordStatus.complete;
        } else {
            return recordStatus.incomplete;
        }
    }
}

export default clubHistoryRecordDto;