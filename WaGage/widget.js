WAF.define('WaGage', ['waf-core/widget'], function(widget) {

    var WaGage = widget.create('WaGage', {


        init: function() {

            this.node.innerHTML = '';
            var waGage = new JustGage({
                id: this.id,
                value: this.value(),
                min: this.min(),
                max: this.max(),
                title: this.title(),
                showMinMax: true,
                label : "%",
                levelColorsGradient: true
            });

            this.title.onChange(function() {
                var title = waGage.txtTitle[0];
                title.textContent = this.title();
            });

            this.value.onChange(function() {
                var newValue = this.value();
                var myMin = this.min();
                var myMax = this.max();
                var calculatedValue = 0;
                if (newValue >= myMin && newValue <= myMax) {
                    newValue -= myMin;
                    calculatedValue = Math.round(100 * newValue / (myMax - myMin));
                    waGage.refresh(calculatedValue);
                }

            });

            this.min.onChange(function() {
                var min = waGage.txtMin[0];
                if((this.min() + "") == "" )
                	min.textContent = 0;
                else
                	min.textContent = this.min();
                var newValue = this.value();
                var myMin = this.min();
                var myMax = this.max();
                var calculatedValue = 0;
                if (newValue >= myMin && newValue <= myMax) {
                    newValue -= myMin;
                    calculatedValue = Math.round(100 * newValue / (myMax - myMin));
                    waGage.refresh(calculatedValue);
                }
            });

            this.max.onChange(function() {

                var max = waGage.txtMax[0];
                if((this.max() + "") == "" )
                	max.textContent = 100;
                else
                	max.textContent = this.max();
                var newValue = this.value();
                var myMin = this.min();
                var myMax = this.max();
                var calculatedValue = 0;
                if (newValue >= myMin && newValue <= myMax) {
                    newValue -= myMin;
                    calculatedValue = Math.round(100 * newValue / (myMax - myMin));
                    waGage.refresh(calculatedValue);
                }
            });

            this.showMinMax.onChange(function() {
            	debugger;
            	var emptymin = this.min() + "";
            	var emptymax = this.max() + "";
            	if(emptymin == "NaN")
            		{
            			var min = waGage.txtMin[0];
             		    min.textContent = 0;
            		}
            	if(emptymax == "NaN")
            		{
            			var max = waGage.txtMax[0];
             		    max.textContent = 100;
            		}
                if (!this.showMinMax()) {
                    var min = waGage.txtMin[0];
                    min.style.visibility = "hidden";

                    var max = waGage.txtMax[0];
                    max.style.visibility = "hidden";
                }
                else {
                    var min = waGage.txtMin[0];
                    min.style.visibility = "visible";
                    
                    var max = waGage.txtMax[0];
                    max.style.visibility = "visible";
                }
            });

            var $node = $(this.node);
            if (!window.Designer) {
                $node.on('click', function(event) {
                    var myMin = this.min();
                    var myMax = this.max();
                    
                    var x = event.offsetX === undefined ? event.originalEvent.layerX : event.offsetX;
                    var y = event.offsetY === undefined ? event.originalEvent.layerY : event.offsetY;
                    
                    if (y >= 95 && y <= 255) {
                        var r1 = 100;
                        var r2 = 160;
                        var cos1 = (x - r2 - 40) / r1;
                        var cos2 = (x - r2 - 40) / r2;
                        if (cos1 < 0) cos1 *= -1;
                        if (cos2 < 0) cos2 *= -1;
                        var y1;
                        if (cos1 >= 1) y1 = 0;
                        else y1 = r1 * (Math.sqrt(1 - Math.pow(cos1, 2)));
                        var y2;
                        if (cos2 >= 1) y2 = 0;
                        else y2 = r2 * (Math.sqrt(1 - Math.pow(cos2, 2)));
                        if (255 - y >= y1 && 255 - y <= y2) {
                            var r = Math.sqrt(Math.pow(x - 40 - r2, 2) + Math.pow(255 - y, 2));
                            var angle = Math.atan((255 - y) / (x - 40 - r2));
                            var ratio = 100 * (angle) / (1.565 * 2);
                            if (ratio < 0) ratio *= -1;
                            if (x >= r2 + 40) ratio = 100 - ratio;
                            //var ratio = (event.offsetX) / $node.width() * 100;
                            ratio = myMin + ratio * (myMax - myMin) / 100;
                            this.value(Math.round(ratio));
                           // waGage.txtValue[0].textContent += " %";
                            
                        }
                    }
                }.bind(this));
            }
        },




        //        /* Create a property */
        value: widget.property({
            type: 'number',
            defaultValue: 20
        }),
        min: widget.property({
            type: 'number',
            defaultValue: 0
            //bindable: false
        }),
        max: widget.property({
            type: 'number',
            defaultValue: 100
            //bindable: false
        }),
        showMinMax: widget.property({
            type: 'boolean'
            //bindable: false
        }),
        title: widget.property({
            type: 'string',
            defaultValue: "myTitle"
        })

    });

    return WaGage;

});
