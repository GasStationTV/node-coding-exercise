var time = (function () {
    //timezone
    //daylight savings time
    function time(value_start, value_end, day, time_start, time_end, is_24, owner_id, deleted, _id) {
        this.value_start = value_start;
        this.value_end = value_end;
        this.day = day;
        this.time_start = time_start;
        this.time_end = time_end;
        this.is_24 = is_24;
        this.owner_id = owner_id.toString();
        this.deleted = deleted ? deleted : null;
        this._id = _id;
    }
    return time;
})();
exports.time = time;
