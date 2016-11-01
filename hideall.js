/* global Module */

/* Magic Mirror
 * Module: hideall
 *
 * By Abhinaba Basu http://bonggeek.com
 * MIT Licensed.
 */

Module.register("hideall",{

	// Default module config.
	defaults: {
        idleInterval: 10000
	},

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.hidden = false;
        this.lastMovement = new Date();

        // Schedule update timer.
        var self = this;
        setInterval(function() {
            if(!self.hidden)
            {
                var curr = new Date();
                var elapsed = (curr.getTime() - self.lastMovement.getTime());
                if(elapsed > 20000)
                {
                    MM.getModules().exceptModule(self).enumerate(function(module) {
                        module.hide(2000, function() {
                            //Module hidden.
                        });
                    });

                    self.hidden = true;
                }
            }
        }, this.config.idleInterval);
    },
    
    notificationReceived: function(notification, payload, sender) {
        if(notification === "USER_PRESENCE" && payload === true) {
            this.lastMovement = new Date();
            if(this.hidden)
            {
                MM.getModules().exceptModule(this).enumerate(function(module) {
                    module.show(4000, function() {
                        //Module shown.
                    });
                });
                this.hidden = false;
            }
        }
    },
});
