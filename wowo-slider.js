jQuery.noConflict();
let wowoSlider = {
     width: 500,
     height: 260,
     el: '#wowo-slider',
     index: 0,
     lenght: 0,
     conduct: 500,
     animate: 2000,
     loop: 0,
     loopType: 'next',
     init: function(options={}){
         this.width = options.width || this.width;
         this.height = options.height || this.height;
         this.el = options.el || this.el;
         this.index = options.index || this.index;
         this.conduct = options.conduct || this.conduct;
         this.animate = options.animate || this.animate;
         this.loop = options.loop === true ? 1 : this.loop;
         this.loopType = options.loopType || this.loopType;
         let self = this;
         jQuery(function () {
             self.initStat();
             self.initDom();
             self.initAttr();
             self.interval();
             self.initEvent();
         })
         return self;
     },
     initEvent: function(){
         let self = this;
         jQuery(this.el).on('click', '.wowo-slider-prev', function(){self.prev();})
         jQuery(this.el).on('click', '.wowo-slider-next', function(){self.next();})
         jQuery(this.el).hover(function(){self._loop(0);}, function(){self._loop(1);})
     },
     initDom(){
         let itemHtml = jQuery(this.el).children('.wowo-slider').children('.wowo-slider-item').eq(-1).prop('outerHTML');
         jQuery(this.el).children('.wowo-slider').prepend(itemHtml);
         jQuery(this.el).prepend('<div class="wowo-slider-next"> < </div><div class="wowo-slider-prev"> > </div>');
         this._Index(this._Index()+1);
         this._Lenght(this._Lenght()+1);
     },
     initStat: function(){
         this._Index(this.index);
         this._Lenght(jQuery(this.el).children('.wowo-slider').children('.wowo-slider-item').length);
         this._loop(this.loop);
     },
     initAttr: function(){
         let leftWidth = this._Index() * this.width;
         jQuery(this.el).attr({style: 'width:'+this.width+'px;height:'+this.height+'px;overflow:hidden;position: relative;'});
         jQuery(this.el).children('.wowo-slider').attr({style: 'width:'+(this.width*this._Lenght())+'px;height:'+this.height+'px;left: -'+leftWidth+'px;'});
         jQuery(this.el).children('.wowo-slider').children('.wowo-slider-item').attr({style: 'width:'+this.width+'px;height:'+this.height+'px;overflow:hidden;'});
     },
     next: function(index = false){
         var _index = index === false ? this._Index()+1 : Number(index);
         let self = this;
         jQuery(this.el).children('.wowo-slider').animate({left: "-"+(_index * this.width)+"px"}, this.conduct, function(){
             if (_index === self._Lenght()-1 || _index > self._Lenght()-1){
                 jQuery(self.el).children('.wowo-slider').animate({left: "0px"}, 0);
                 self._Index(0);
             }else{
                self._Index(_index);
             }
         });
     },
     prev: function(index = false){
         var _index = index === false ? this._Index()-1 : Number(index);
         let self = this;
         jQuery(this.el).children('.wowo-slider').animate({left: "-"+(_index * this.width)+"px"}, this.conduct, function(){
             if (_index === 0 || _index < 0){
                 jQuery(self.el).children('.wowo-slider').animate({left: "-"+((self._Lenght()-1)*self.width)+"px"}, 0);
                 self._Index(self._Lenght()-1);
             }else{
                self._Index(_index);
             }
         });
     },
     interval: function(){
         let self = this;
         window.setInterval(function(){
             if (self._loop() && self.loopType === 'next' && self.loop){
                 self.next();
             } else if (self._loop() && self.loopType === 'prev' && self.loop){
                 self.prev();
             }
         }, self.animate);
     },
     _Index: function(_index = false){
         if (_index === false){
             return Number(jQuery(this.el).attr('wowo_slider_index')) || this.index;
         }else{
             return jQuery(this.el).attr({wowo_slider_index: _index});
         }
     },
     _Lenght: function(_lenght = false) {
         if (_lenght === false){
             return Number(jQuery(this.el).attr('wowo_slider_lenght')) || this.lenght;
         }else{
             return jQuery(this.el).attr({wowo_slider_lenght: _lenght});
         }
     },
     _loop: function(_loop = false){
         if (_loop === false){
             return Number(jQuery(this.el).attr('wowo_slider_loop'));
         }else{
             return jQuery(this.el).attr({wowo_slider_loop: _loop});
         }
     }
 }