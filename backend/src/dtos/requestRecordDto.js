import {recordStatus} from "../constants/recordStatus.js";

class requestRecordDto {
    constructor(clubId, username, type) {
        this.clubId = clubId;
        this.username = username;
        this.type = type;
    }

    get status(){
        if (this.clubId && this.username && this.type) {
            return recordStatus.complete;
        } else {
            return recordStatus.incomplete;
        }
    }
}

export default requestRecordDto;