WAF.define('SignaturePad', ['waf-core/widget'], function(widget) {

    var mySignaturePad = widget.create('SignaturePad', {

        init: function() {

            var $node = $(this.node);
            this.node.innerHTML = "";
            this.node.innerHTML = '<canvas></canvas>';
            $node.find("canvas").attr('id', 'canvas_' + this.node.id);
            $node.find("canvas").attr('width', this.node.clientWidth);
            $node.find("canvas").attr('height', this.node.clientHeight);

            if (!window.Designer) {
                var that = this;
                this.signaturePad = new SignaturePad($node.find('canvas')[0], {

                    minWidth: this.minWidth(),
                    maxWidth: this.maxWidth(),
                    penColor: this.penColor(),
                    dotSize: this.dotSize(),
                    backgroundColor: this.backgroundColor(),
                    velocityFilterWeight: this.velocityFilterWeight(),
                    onBegin: function() {
                        that.fire('begin');
                    },
                    onEnd: function() {
                        that.fire('end');
                    }
                });
            }
            
        },

        dotSize: widget.property({
            type: 'number',
            defaultValue: 0.2,
            bindable: false
        }),
        minWidth: widget.property({
            type: 'number',
            defaultValue: 0.5,
            bindable: false
        }),
        maxWidth: widget.property({
            type: 'number',
            defaultValue: 2.5,
            bindable: false
        }),
        backgroundColor: widget.property({
            type: 'string',
            defaultValue: "#fff",
            bindable: false
        }),
        penColor: widget.property({
            type: 'string',
            defaultValue: 'black',
            bindable: false
        }),
        velocityFilterWeight: widget.property({
            type: 'number',
            defaultValue: 0.7,
            bindable: false
        }),
        clear: function() {
            this.signaturePad.clear();
        },
        isEmpty: function() {
            return this.signaturePad.isEmpty();
        },
        toDataURL : function(){
            this.signaturePad.toDataURL();
        }
    });
    return mySignaturePad;

});
