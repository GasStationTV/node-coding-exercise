<times_added>
    <style scoped>
        h2{
            margin-bottom:0;
        }
        .hidden{
            display: none;
        }
    </style>
    <section>
        <h2>Sunday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in sunday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="1" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="1"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="1">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>
    <section>
        <h2>Monday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in monday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="2" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="2"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="2">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>
    <section>
        <h2>Tuesday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in tuesday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="3" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="3"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="3">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>
    <section>
        <h2>Wednesday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in wednesday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="4" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="4"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="4">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>
    <section>
        <h2>Thursday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in thursday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="5" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="5"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="5">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>
    <section>
        <h2>Friday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in friday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="6" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="6"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="6">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>
    <section>
        <h2>Saturday</h2>
        <input type="button" value="expand" onclick="{expand}">
        <div class="container hidden">
            <div each="{ item, i in saturday }" onclick="{select_item}" data-_id="{i}">
                <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="7" ></time_form>
            </div>
            <div>
                <time_form id="time_form" submit_callback="{time_added}" day="7"></time_form>
            </div>
            <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="7">
            <input type="button" value="close" onclick="{close}">
        </div>
    </section>


    <script type="es6">
        "use strict";
        let self = this;
        const owner_id = 1;
        this.times = [];

        this.expand = (event) =>{
            let container =event.target.parentNode.querySelector('.container');
            event.target.classList.add('hidden');
            container.classList.remove('hidden');
        }
        this.close = (event) =>{
            let container =event.target.parentNode;
            container.classList.add('hidden');
            event.target.parentNode.parentNode.querySelector('input.hidden').classList.remove('hidden');
        }

        function validate_day(day, times, value_start, value_end){
            // could have just checked previous day...
            const my_array = times.find((time) => {
                if(time.day !== day && ((time.value_start > value_end && time.value_start < value_start) || (time.value_end > value_end && time.value_end < value_start)))

                return time.day !== day && ((time.value_start > value_end && time.value_start < value_start)
                || (time.value_end > value_end && time.value_end < value_start)) ? true : false;
            })
            return !my_array || my_array.length == 0 ? true : false
        }

        this.process_response = (event) => {
            if (event.target.readyState == 4 && event.target.status == 200) {
                let response = JSON.parse(event.target.responseText);
                if (response.error) {
                    alert('Cannot add/update time: ' + response.error);//could set data-_id on each bind, then here use queryselector and have time_form show error
                } else {
                    // should show toast of success;
                    this.get_times(owner_id);
                }
            }
        };

        this.time_added_24 = (event) => {
            let xmlHttp = new XMLHttpRequest();
            const day = event.target.dataset.day
            let value, is_valid, day_name;
            switch(day) {
                case "1":
                    value = 0; day_name = 'sunday';
                    break;
                case "2":
                    value = 48; day_name = 'monday';
                    break;
                case "3":
                    value = 96; day_name = 'tuesday';
                    break;
                case "4":
                    value = 144; day_name = 'wednesday';
                    break;
                case "5":
                    value = 192; day_name = 'thursday';
                    break;
                case "6":
                    value = 240; day_name = 'friday';
                    break;
                default:
                    value = 288; day_name = 'saturday';
            }
            if(validate_day(day, this.times, value, value+48)){
                //loop through and delete all times in day.
                this[day_name].forEach((time) => {
                    this.time_deleted(time);
                })

                //simulate waiting on above to finish, should not do this normally, use callbacks/promises
                setTimeout(()=>{
                    xmlHttp.onreadystatechange = this.process_response
                    xmlHttp.open("POST", "/owners/" + owner_id + "/times/");
                    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xmlHttp.send(JSON.stringify({time_start: 1
                        , time_end: 1
                        , day: day
                        , is_24: true
                        , value_start: value
                        , value_end: value + 48
                        , _id: null}));
                }, 500);

            }else{
                alert('Unable to Create/Update: there is at least one overlapping time slot')
            }
        }
        this.time_added = (form) => {
            //const owner_id = 1; // mock the owner_id.
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = this.process_response;
            xmlHttp.open("POST", "/owners/" + owner_id + "/times/");
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify(form));
        }
        this.time_edited = (form) =>{
            form.owner_id = owner_id;
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = this.process_response;
            xmlHttp.open("PUT", "/times/" + form._id);
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify(form));
        }
        this.time_deleted = (form) =>{
            form.owner_id = owner_id;
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = this.process_response
            //        () => {
            //    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //        this.get_times(owner_id);
            //    }
            //};
            xmlHttp.open("DELETE", "/times/" + form._id);
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify(form));
        }

        this.seperate_days = (times) => {
            this.sunday = this.times.filter((time) => {
                return time.day === "1" ? true : false;
            })
            this.monday = this.times.filter((time) => {
                return time.day === "2" ? true : false;
            })
            this.tuesday = this.times.filter((time) => {
                return time.day === "3" ? true : false;
            })
            this.wednesday = this.times.filter((time) => {
                return time.day === "4" ? true : false;
            })
            this.thursday = this.times.filter((time) => {
                return time.day === "5" ? true : false;
            })
            this.friday = this.times.filter((time) => {
                return time.day === "6" ? true : false;
            })
            this.saturday = this.times.filter((time) => {
                return time.day === "7" ? true : false;
            })
        }

        this.get_times = (owner_id) => {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    if (xmlHttp.responseText) {
                        this.times = JSON.parse(xmlHttp.responseText).times;
                        this.seperate_days(this.times);
                    } else {
                        this.times = [];
                    }
                    this.update();
                }
            };
            xmlHttp.open("GET", "/owners/" + owner_id + "/times/", true);
            xmlHttp.send();
        }
        self.on('mount', function () {
            this.get_times(owner_id);
        });
    </script>
</times_added>