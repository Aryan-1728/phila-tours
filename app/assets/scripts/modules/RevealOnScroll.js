import $ from 'jquery';
import waypoints from "waypoints/lib/noframework.waypoints";

class RevealOnScroll{
    constructor(elements,offset = "40%"){
        this.itemsToReveal = elements;
        this.offsetPercentages = offset;
        this.hideInitially()
        this.createWaypoints()
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item")
    }

    createWaypoints(){
        let that = this;
        this.itemsToReveal.each(function(){
            let currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function(){
                    $(currentItem).addClass("reveal-item__is-visible");
                },
                offset: that.offsetPercentages
            });
        });
    }
}

export default RevealOnScroll;