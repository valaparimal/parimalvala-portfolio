
// const selectedItemContainer = document.querySelector(".selected_item_container");
// const selectedItemImgContainer = document.querySelector(".selected_item_img_container");
// const selectedItemTitle = document.querySelector(".selected_item_title");
// const selectedItemDescription = document.querySelector(".selected_item_description");

// const visiteBtn = document.querySelector("#visite_btn");
// const linkSection = document.querySelector("#link_section");

// //observation

// const observer = new IntersectionObserver((entries)=>{
//     entries.forEach((entry)=>{
//         if(entry.isIntersecting){
//             entry.target.classList.add("translate_50");
//             setTimeout(()=>{
//                 entry.target.parentElement.style.background="aliceblue";
//             },600);
//         }
//     });
// },{threshold: 0.1});


// document.querySelectorAll(".item_container").forEach((e)=>{
//     e.addEventListener("click",()=>{
//         selectedItemContainer.style.display="block";
//         selectedItemImgContainer.style.backgroundImage = e.querySelector(".item_img_container").style.backgroundImage;
//         selectedItemTitle.innerHTML = e.querySelector(".item_title").innerHTML;
//         selectedItemDescription.innerHTML = e.querySelector(".item_description").innerHTML;

//         //scroll
//         selectedItemContainer.scrollIntoView({behavior:"smooth",block:"center"});
//     });
// });

// document.querySelectorAll(".before_translate").forEach((e)=>{
//     observer.observe(e);
// });


// // visite

// visiteBtn.addEventListener("click",()=>{
//     setTimeout(()=>{
//         for(let i=0 ; i<10 ; i++){
//             setTimeout(()=>{
//                 if(i%2==0){
//                     linkSection.style.color="red";
//                 }else{
//                     linkSection.style.color="white";
//                 }
//             },(i+1)*300)
//         }
//     },500);
// })



/* preserved & improved interactivity
   - IntersectionObserver animations (kept)
   - Click on item → selected panel populated (kept)
   - Visit button flashing (kept)
   - Close button added for selected panel (non-destructive)
*/

const selectedItemContainer = document.querySelector(".selected_item_container");
const selectedItemImgContainer = document.querySelector(".selected_item_img_container");
const selectedItemTitle = document.querySelector(".selected_item_title");
const selectedItemDescription = document.querySelector(".selected_item_description");

const visiteBtn = document.querySelector("#visit_btn") || document.querySelector(".visit-fab");
const linkSection = document.querySelector("#link_section");

// Intersection observer for reveal animation
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("translate_50");
      // optional subtle background change to parent after animation
      setTimeout(()=>{
        if(entry.target.parentElement) entry.target.parentElement.style.background = "transparent";
      }, 600);
    }
  });
},{threshold: 0.12});

// const observer = new IntersectionObserver((entries)=>{
//     entries.forEach((entry)=>{
//         if(entry.isIntersecting){
//             entry.target.classList.add("translate_50");
//             setTimeout(()=>{
//                 entry.target.parentElement.style.background="aliceblue";
//             },600);
//         }
//     });
// },{threshold: 0.1});

// Observe all .before_translate elements
document.querySelectorAll(".before_translate").forEach((el)=>{
  observer.observe(el);
});

// click on project card to show selected panel
document.querySelectorAll(".item_container").forEach((card)=>{
  card.addEventListener("click", ()=>{
    // populate selected panel from clicked card
    const img = card.querySelector(".item_img_container");
    const title = card.querySelector(".item_title");
    const desc = card.querySelector(".item_description");

    if(img) selectedItemImgContainer.style.backgroundImage = getComputedStyle(img).backgroundImage || img.style.backgroundImage || '';
    if(title) selectedItemTitle.innerHTML = title.innerHTML || '';
    if(desc) selectedItemDescription.innerHTML = desc.innerHTML || '';

    // show panel
    selectedItemContainer.setAttribute("aria-hidden", "false");
    selectedItemContainer.scrollIntoView({behavior:"smooth", block:"center"});
  });
});

// Add close button handler (non-destructive)
const closeBtn = document.querySelector(".close-selected");
if(closeBtn){
  closeBtn.addEventListener("click", ()=>{
    selectedItemContainer.setAttribute("aria-hidden", "true");
    // small focus back to top of projects
    window.scrollTo({top: 0, behavior: "smooth"});
  });
}

// Add clicking outside to close (for touch / desktop convenience)
document.addEventListener("click", (evt)=>{
  const target = evt.target;
  if (!selectedItemContainer.contains(target) && selectedItemContainer.getAttribute("aria-hidden") === "false"){
    // avoid closing when clicking on a card (cards are inside info_main_container)
    const isCard = target.closest(".item_container");
    if(!isCard) selectedItemContainer.setAttribute("aria-hidden", "true");
  }
});

// visite button effect: flash the link_section text color
if(visiteBtn && linkSection){
  visiteBtn.addEventListener("click", ()=>{
    setTimeout(()=>{
      for(let i=0; i<10; i++){
        setTimeout(()=>{
          if(i % 2 === 0) linkSection.style.color = "red";
          else linkSection.style.color = "white";
        }, (i+1) * 300);
      }
    }, 500);
  });
}
