WAF.define('WaClock', ['waf-core/widget'], function(widget) {

    var WaClock = widget.create('WaClock', {
        init: function() {

            this.node.innerHTML = '<div id="clock_analog" class="clock_container"><div class="lbl"></div><div class="clockHolder"><div class="rotatingWrapper"><img class="hour" src="/images/clock_hour.png" /></div><div class="rotatingWrapper"><img class="min" src="/images/clock_min.png" /></div><div class="rotatingWrapper"><img class="sec" src="/images/clock_sec.png" /></div><img class="clock" src="/images/clock_face.png" /> </div><div class="digital"> <span class="hr"></span><span class="minute"></span> <span class="period"></span> </div></div>';

            var $node = $(this.node);
            $node.find("#clock_analog").attr("id", "clock_analog" + this.node.id);

            var title = $node.find(".lbl");
            title.text(this.title());

            var wc = $node.find("#clock_analog" + this.node.id).jClocksGMT({
                offset: this.offset(),
                hour24: this.hour24(),
                digital: this.digital(),
                analog: this.analog()
            });

            this.title.onChange(function() {
                var title = $node.find(".lbl");
                title.text(this.title());
            });

        },
        offset: widget.property({
            type: 'string',
            defaultValue: '0',
            bindable: false
        }),
        hour24: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        digital: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        analog: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        title: widget.property({
            type: 'string',
            defaultValue: "Greenwich GMT"
        })

    });

    return WaClock;

});