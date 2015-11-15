dropdown
 alternative(each='{alternative, i in this.opts.data}' onclick='{this.select}') { alternative }
 script.
   // probably should have opted for the native select element 
   this.select = function(){
      if(this.parent.opts.data[0] === 'Midnight'){
        this.parent.parent.opening = this.i * 30;
      } else {
        this.parent.parent.closing = this.i * 30 + 690;
      }
      this.parent.parent.update()
   }
