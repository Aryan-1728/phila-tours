import $ from 'jquery';
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class ActiveLinks{
    constructor(){
        this.lazyImages = $(".lazyload");
        this.pageSection = $(".page-section")
        this.headerLinks = $(".menu-list a")
        this.createWaypoints();
        this.refreshWayPoints();
    }

    refreshWayPoints(){
        this.lazyImages.on('load', function(){
            Waypoint.refreshAll();
        })
    }

    createWaypoints(){
        let that = this;
        
        this.pageSection.each(function(){
            let currentPageSection = this
            new Waypoint({
                element: currentPageSection,
                handler: function(direction){
                    if(direction === "down"){
                        let matchingLink = currentPageSection.getAttribute("data-matching-link")
                        that.headerLinks.removeClass("is-active")
                        $(matchingLink).addClass("is-active")
                    }
                },
                offset: "60%"
            })

            new Waypoint({
                element: currentPageSection,
                handler: function(direction){
                    if(direction === "up"){
                        let matchingLink = currentPageSection.getAttribute("data-matching-link")
                        that.headerLinks.removeClass("is-active")
                        $(matchingLink).addClass("is-active")
                    }
                },
                offset: "-60%"
            })
        })
    }
}

export default ActiveLinks;

