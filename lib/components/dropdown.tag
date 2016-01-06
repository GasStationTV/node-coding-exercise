dropdown
 alternative(each='{alternative, i in this.opts.data}' onclick='{this.select}') { alternative }
 script.
   // probably should have opted for the native select element 
   this.select = function(){
      if(this.parent.opts.data[0] === 'Midnight'){
        var newOpeningTime = this.i * 30;
        if(newOpeningTime < this.parent.parent.closing){
          this.parent.parent.opening = newOpeningTime;
        } else {
          // TODO: Notify invalid
        }
      } else {
        var newClosingTime = this.i * 30 + 690;
        if(newClosingTime > this.parent.parent.opening){
          this.parent.parent.closing = newClosingTime;
        } else {
          // TODO: Notify invalid
        }
      }
      this.parent.parent.update()
   }
