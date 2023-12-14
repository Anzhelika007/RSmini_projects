const sliderLine = document.querySelector('.slider__content');
const prevBtn = document.querySelector('.slider__arrow-left');
const nextBtn = document.querySelector('.slider__arrow-right');
const dots = document.querySelectorAll('.slider__dots-btn');
const sliderImages = document.querySelectorAll('.slider__content-img');

let position = 0;
let dotIndex = 0;

let isActive = true;

/* coords */
let  posStart = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;

/* func */ 
const nextSlide = () => {
    const widthSlide = sliderLine.clientWidth;
    console.log(sliderLine.clientWidth)
    if (position < ((dots.length - 1) * widthSlide)){
        position += widthSlide;
        dotIndex ++;
    } else {
        position = 0; 
        dotIndex = 0;  
    }
    sliderLine.style.left = -position + 'px';
    activeDot(dotIndex);
}
const prevSlide = () => {
    const widthSlide = sliderLine.clientWidth;
    if (position > 0){
        position -= widthSlide;
        dotIndex --;
    } else {
        position = (dots.length - 1) * widthSlide; 
        dotIndex = (dots.length - 1);
    }
    sliderLine.style.left = -position + 'px';
    activeDot(dotIndex);
}
const activeDot = (index)=>{
    for(let dot of dots){
        dot.classList.remove('active');
    }
    dots[index].classList.add('active');
}
/* listeners */
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index)=>{
    const widthSlide = sliderLine.clientWidth;
    dot.addEventListener('click', () =>{
        position = widthSlide * index;
        sliderLine.style.left = -position + 'px';
        dotIndex = index;
    })
    activeDot(dotIndex);
})

/* auto */

let interval = setInterval(() => {
    if(isActive){
        nextSlide();
    }
    
}, 7000)


// 
// const addEventMouseSlide = () => {
//     sliderImages.forEach(slide =>{
//         slide.addEventListener("mouseover", (event) => {
//         isActive = false;
//         console.log('stop')
//         const before = getComputedStyle(dots[dotIndex], "::before");
//         before.style.animationPlayState = 'paused';
//         console.log('yes');
//         })
//     })
// }
/*===========================================================================*/
/* event mouse */
// sliderLine.addEventListener('mouseenter', (e) => {
//     const posStart = 0;
//     if (e.pageX || e.pageY){
// 		posStart = e.pageX;
// 		console.log(posStart)
//     isActive = true;

//     console.log(posStart);
//     }
// })

// sliderLine.addEventListener('mouseleave', () => {
//     isActive = false;
//     console.log('2'); 
// });

// /* touch */
// sliderLine.addEventListener('touchstart', () => {
//     isActive = true; 
//     swiperStart();
//     console.log('3');
// });