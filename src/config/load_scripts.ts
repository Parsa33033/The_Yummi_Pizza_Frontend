
const scriptSrcList = [
    "assets/js/jquery.min.js",
    "assets/js/jquery-migrate-3.0.1.min.js",
    "assets/js/popper.min.js",
    "assets/js/bootstrap.min.js",
    "assets/js/jquery.easing.1.3.js",
    "assets/js/jquery.waypoints.min.js",
    "assets/js/jquery.stellar.min.js",
    "assets/js/owl.carousel.min.js",
    "assets/js/jquery.magnific-popup.min.js",
    "assets/js/aos.js",
    "assets/js/jquery.animateNumber.min.js",
    "assets/js/bootstrap-datepicker.js",
    "https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js",
    "assets/js/jquery.timepicker.min.js",
    "assets/js/scrollax.min.js",
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false",
    "assets/js/google-map.js",
    "assets/js/main.js"
]

export const loadScripts = () => {
    for (var i of scriptSrcList) {
        const script = document.createElement("script");
        script.src = "./" + i;
        script.async = false;
        document.body.appendChild(script);
    }
}