import {recordStatus} from "../constants/recordStatus.js";

class clubRecordDto {
    constructor(owner, name, distilled, waiterName) {
        this.owner = owner;
        this.name = name;
        this.distilled = distilled;
        this.waiterName = waiterName;
    }

    get status() {
        if (this.owner && this.name && this.distilled && this.waiterName) {
            return recordStatus.complete;
        } else {
            return recordStatus.incomplete;
        }
    }
}

export default clubRecordDto;