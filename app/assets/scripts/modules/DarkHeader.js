import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class DarkHeader{
    constructor(){
        this.siteHeader = $(".header");
        this.headerTriggerElement = $(".large-hero__title");
        this.headerLogo = $(".header__logo");
        this.createWayPoints();
    }

    createWayPoints(){
        let that = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction){
                if(direction === "down"){
                    that.siteHeader.addClass("header__dark")
                    that.headerLogo.addClass("header__logo-small");
                }else if(direction === "up"){
                    that.siteHeader.removeClass("header__dark")
                    that.headerLogo.removeClass("header__logo-small");
                }
            },
            offset: "0%"
        });
    }
}

export default DarkHeader;