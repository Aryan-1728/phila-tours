import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

class SmoothScroll{
    constructor(){
        this.headerlinks = $(".smooth-scroll a");
        this.enableSmoothScroll()
    }

    enableSmoothScroll(){
        this.headerlinks.smoothScroll()
    }
}

export default SmoothScroll;