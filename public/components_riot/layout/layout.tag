<layout>
    <style scoped>
        h1{
            margin: 10px 0 0 0;
        }
    </style>
    <h1>Time Schedule</h1>
    <times_added id="times_added" list="{times}"></times_added>

    <!--<time_form id="time_form" submit_callback="{time_added}"></time_form>-->

    <script type="es6">
        "use strict";

        const owner_id = 1;

        //let self = this;
        //this.time_added = (form) => {
        //    //ajax
        //    const owner_id = 1; // mock the owner_id.
        //    let xmlHttp = new XMLHttpRequest();
        //    xmlHttp.onreadystatechange = () => {
        //        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        //            this.times_added._tag.get_times(owner_id);
        //        }
        //    };
        //    xmlHttp.open("POST", "/owners/" + owner_id + "/times/");
        //    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //    xmlHttp.send(JSON.stringify(form));
        //}

        this.on('mount', () => {
        });
    </script>
</layout>