app
  button.action.add(onclick='{this.newStation}') New Station
  station(each='{ this.opts.stations }')
  script.
    this.newStation = function(){
      this.opts.stations.unshift({})
    }.bind(this)
