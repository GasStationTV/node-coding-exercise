app
  stations(each='{ this.opts.stations }')
    name { this.type }
    hours(each='{this.hours}')
  script.
    console.log(this.opts.stations)
