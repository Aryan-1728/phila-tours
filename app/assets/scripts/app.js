import "../styles/style.css";
import $ from 'jquery';
import "lazysizes";
import MobileHeader from "./modules/MobileHeader";
import RevealOnScroll from "./modules/RevealOnScroll";
import SmoothScroll from "./modules/SmoothScroll";
import DarkHeader from "./modules/DarkHeader";
import ActiveLinks from "./modules/ActiveLinks";

const mobileHeader = new MobileHeader();
new RevealOnScroll($(".feature-item"), "70%");
new RevealOnScroll($(".testimonial"), "70%");
new SmoothScroll();
new DarkHeader();
new ActiveLinks();