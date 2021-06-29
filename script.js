
if ((document.querySelector("body").offsetHeight - document.documentElement.scrollTop < Math.max(document.documentElement.clientHeight, window.innerHeight || 0))) {
}
var sections = document.querySelectorAll("section");

document.addEventListener("scroll", (e) => {
    if(document.documentElement.scrollTop > 200) {
        sections.forEach((s) => {
            s.style.height = "100vh";
            s.style.overflow = "scroll";
        });
    }else if(document.documentElement.scrollTop < 100){
        sections.forEach((s) => {
            s.style.height = "auto";
            s.style.overflow = "hidden";
        })
    }

})
