import{a as T,N as p,S as Y,P as J}from"./assets/vendor-BwJ6lRmC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const h="493c6d740f024fcc02750f44c1518471",v="https://api.themoviedb.org/3";async function H(e){const t=`${v}/movie/${e}/videos?api_key=${h}&language=en-US`;try{const r=(await T.get(t)).data.results.find(i=>i.site==="YouTube"&&i.type==="Trailer");return r?`https://www.youtube.com/embed/${r.key}?autoplay=1`:null}catch(o){return o.response&&o.response.status===404||console.error("A apărut o eroare la obținerea trailerului."),null}}async function S(e="",t=1){let o="";e?o=`${v}/search/movie?api_key=${h}&language=en-US&query=${encodeURIComponent(e)}&page=${t}`:o=`${v}/trending/all/day?language=en-US&api_key=${h}&page=${t}`;try{const n=await T.get(o),r=await Promise.all(n.data.results.map(async i=>{console.log("Fetching trailers for movie ID:",i.id);const s=await H(i.id);return{...i,trailerUrl:s}}));return{...n.data,results:r}}catch(n){throw console.error("Error fetching movies:",n.response?n.response.data:n),p.Notify.failure("Oops! Something went wrong! Try reloading the page!"),n}}async function K(){const t=await H(550);console.log("Trailer URL:",t)}async function G(){const o=await S("Inception",1);console.log("Movies:",o)}K();G();let N=localStorage.getItem("nightMode");const E=document.querySelector("#checkbox"),B=()=>{document.body.classList.add("nightmode"),localStorage.setItem("nightMode","enabled")},V=()=>{document.body.classList.remove("nightmode"),localStorage.setItem("nightMode","disabled")};N==="enabled"&&(E.checked=!0,B());E.addEventListener("change",()=>{N=localStorage.getItem("nightMode"),E.checked?B():V()});const g=e=>{try{const t=localStorage.getItem(e);return t?t.startsWith("{")||t.startsWith("[")?JSON.parse(t):t:null}catch(t){return console.error("Eroare la parsarea datelor din localStorage:",t),null}};function z(e){if(!e||!e.id){console.error("Datele filmului sunt invalide");return}const t={html:e.cardHtml,data:e,isInQueue:!0};localStorage.setItem(e.id.toString(),JSON.stringify(t))}function X(e){if(!e||!e.id){console.error("Datele filmului sunt invalide");return}const t={html:e.cardHtml,data:e,isWatched:!0};localStorage.setItem(e.id.toString(),JSON.stringify(t))}function O(e,t,o){const n=g(e);if(!n){console.error("Filmul nu a fost găsit în storage");return}n.isInQueue=t,n.isWatched=o,localStorage.setItem(e.toString(),JSON.stringify(n))}let b=[];async function Z(){const e=`${v}/genre/movie/list?api_key=${h}&language=en-US`;try{b=(await T.get(e)).data.genres}catch(t){console.error("Eroare la încărcarea genurilor: ",t)}}window.addEventListener("load",async()=>{await Z()});const F=(e,t)=>{if(!e||typeof e!="object"||!e.genre_ids){console.error("Datele filmului nu sunt complete sau sunt într-un format incorect.");return}const o=Array.isArray(e.genre_ids)&&e.genre_ids.length>0?e.genre_ids.map(a=>{var $;return(($=b.find(R=>R.id===a))==null?void 0:$.name)||"Unknown"}).filter(a=>a!=="Unknown").join(", "):"Unknown";let n=e.title||"Unknown Title";e.media_type&&(n=e.media_type==="movie"?e.original_title||e.title:e.original_name||e.name);const r=e.title||e.name;e.id;const i=!!g(e.id),s=`
    <div class="film-modal">
        <div class="film-modal-content">
         <span class="close-modal">&times;</span>
         <h2 class="film-modal-title">${r}</h2>
        ${e.trailerUrl?`<div class="film-modal-trailer">
               <iframe src="${e.trailerUrl}" frameborder="0" allowfullscreen></iframe>
             </div>`:`<div class="film-modal-poster">
               <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${r}">
             </div>`}
        <h3>Original title: ${n}</h3>
        <p class="film-modal-score"><span>Score: ${typeof e.vote_average=="number"?e.vote_average.toFixed(2):"N/A"}</span></p>
        <p class="modal-genre-paragraph"><b>Genre:</b> ${o}</p>
        <h4 class="film-modal-about">ABOUT</h4>
        <p>${e.overview}</p>
        <div class="film-modal-actions">
          <button id="addToWatchedBtn">ADD TO WATCHED</button>
          <button id="addToQueueBtn">${i?"REMOVE FROM QUEUE":"ADD TO QUEUE"}</button>
        </div>
      </div>
    </div>`;document.body.insertAdjacentHTML("beforeend",s);const l=document.querySelector(".film-modal"),f=document.querySelector("#addToQueueBtn"),d=document.querySelector("#addToWatchedBtn"),c=()=>{const a=g(e.id);a&&(f.textContent=a.isInQueue?"REMOVE FROM QUEUE":"ADD TO QUEUE",d.textContent=a.isWatched?"REMOVE FROM WATCHED":"ADD TO WATCHED")};c(),f.addEventListener("click",()=>{const a=g(e.id);a?(O(e.id,!a.isInQueue,a.isWatched),a.isInQueue&&U(e.id)):z({id:e.id,cardHtml:t,data:e}),c()}),d.addEventListener("click",()=>{const a=g(e.id);a?(O(e.id,a.isInQueue,!a.isWatched),a.isWatched&&U(e.id)):X({id:e.id,cardHtml:t,data:e}),c()}),new Y(".film-modal-content a",{overlay:!0,close:!0,showCounter:!0});function m(a){(a.target===l||a.target.classList.contains("close-modal"))&&(l.remove(),document.removeEventListener("click",m),document.removeEventListener("keydown",u))}function u(a){a.key==="Escape"&&(l.remove(),document.removeEventListener("keydown",u),document.removeEventListener("click",m))}l.addEventListener("click",m),document.addEventListener("keydown",u)};function U(e){console.log(`Încercăm să eliminăm cardul cu ID-ul: ${e}`);const t=document.querySelector(`.movie-wrapper__card[data-filmid="${e}"]`);t?(t.remove(),console.log(`Cardul cu ID-ul: ${e} a fost eliminat.`)):console.log(`Cardul cu ID-ul: ${e} nu a fost găsit.`)}async function q(e){const t=document.querySelector(".movie-wrapper"),o=await e;t.textContent="",!(!o||!o.results)&&o.results.forEach(n=>{const r=document.createElement("div");r.classList.add("movie-wrapper__card");let i=n.title||n.name||"Unknown Title";n.media_type==="tv"?i=n.name||n.original_name||"Unknown Title":n.media_type==="movie"&&(i=n.title||n.original_title||"Unknown Title");const s=n.genre_ids.map(c=>{const m=b.find(u=>u.id===c);return m?m.name:null}).filter(c=>c!==null).join(", ");s.includes("Unknown")&&(console.log("ID-uri genuri necunoscute:",n.genre_ids),console.log("Lista de genuri disponibile:",b));let l;n.media_type==="movie"?l=n.release_date?n.release_date.split("-")[0]:"Unknown Year":n.media_type==="tv"?l=n.first_air_date?n.first_air_date.split("-")[0]:"Unknown Year":l="Unknown Year";const f=typeof n.vote_average=="number"?n.vote_average.toFixed(2):"N/A",d=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"path/to/default/image.jpg";r.setAttribute("data-filmId",n.id.toString()),r.innerHTML=`
      <div class="movie-wrapper__card-img">
        <img src="${d}" alt="${i}">
      <span class="movie-wrapper__info-rating">${f}</span>
        </div>
      <div class="movie-wrapper__footer">
        <div class="movie-wrapper__title">${i}</div>
        <div class="movie-wrapper__info">
          <p class="movie-wrapper__info-genres">${s}</p>
          <span class="movie-wrapper__info-year"> | ${l}</span>
          
        </div>
      </div>`,t.append(r),r.addEventListener("click",()=>{const c=document.querySelector(".film-modal");c&&c.remove(),F(n,r.outerHTML)})})}const M=document.getElementById("myFooterModal"),D=document.getElementById("openFooterModal"),ee=document.querySelector(".close-button-member");function te(){M.style.display="block",window.addEventListener("keydown",A)}function I(){M.style.display="none",window.removeEventListener("keydown",A)}function A(e){e.key==="Escape"&&I()}D.addEventListener("click",te);ee.addEventListener("click",I);window.addEventListener("click",function(e){e.target===M&&I()});let L=document.getElementById("scrollToTopBtn");window.onscroll=function(){Q()};function Q(){document.body.scrollTop>20||document.documentElement.scrollTop>20?L.style.display="block":L.style.display="none"}L.addEventListener("click",P);function P(){window.scrollTo({top:0,behavior:"smooth"})}let w=!1;function x(e){const t=e.target.closest(".movie-wrapper__card");if(t){const o=t.getAttribute("data-filmid"),n=g(o);n&&n.data&&F(n.data.data,n.html)}}function C(e){e.preventDefault();const t=document.querySelector(".watched"),o=document.querySelector(".movie"),n=document.getElementById("pagination-container"),r=document.querySelector(".search-form"),i=document.querySelectorAll(".watched-queue-container"),s=document.querySelector(".library-container"),l=document.querySelectorAll(".site-nav-button"),f=document.querySelector(".site-nav-item.my-library-btn");t&&(t.innerHTML=""),o&&(o.innerHTML=""),n&&(n.style.display="none"),r&&(r.style.display="none"),f&&(f.style.display="none"),i.forEach(c=>c.style.display="flex"),l.forEach(c=>c.style.display="flex"),s.style.display="flex";const d=document.querySelector(".queue");if(d){d.innerHTML="",d.style.display="grid",o.style.display="none",t.style.display="none";for(let c=0;c<localStorage.length;c++){const m=localStorage.key(c),u=g(m);u&&u.isInQueue&&(d.innerHTML+=u.html)}w||(document.querySelector(".library-container").addEventListener("click",x),w=!0)}W(d)}function ne(e){e.preventDefault();const t=document.querySelector(".watched"),o=document.querySelector(".movie"),n=document.querySelector(".queue");if(o&&(o.innerHTML=""),n&&(n.innerHTML=""),t){o.style.display="none",t.innerHTML="",t.style.display="grid",n.style.display="none";for(let r=0;r<localStorage.length;r++){const i=localStorage.key(r),s=g(i);s&&s.isWatched&&(t.innerHTML+=s.html)}}w||(document.querySelector(".library-container").addEventListener("click",x),w=!0),W(t)}function oe(){const e=document.querySelector('a[data-request="library"]'),t=document.querySelector('a[data-request="queue"]'),o=document.querySelector('a[data-request="watched"]');e&&e.addEventListener("click",C),t&&t.addEventListener("click",C),o&&o.addEventListener("click",ne)}function W(e){let t=0,o=0;const n=document.querySelector("header");n&&(t=n.offsetHeight);const r=document.querySelector("footer");r&&(o=r.offsetHeight);const s=window.innerHeight-t-o;e&&(e.style.minHeight=`${s}px`)}const _={totalItems:500,itemsPerPage:1,visiblePages:5,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',disabledMoveButton:'<span class="btn-hidden tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>',moveButton:({type:e})=>{let t="";return e==="first"&&(t='<a href="#" class="tui-page-btn tui-first custom-class-first"><span class="tui-ico-first">«</span></a>'),e==="prev"&&(t='<a href="#" class="arrow tui-page-btn tui-prev custom-class-prev"><span class="material-icons-outlined">arrow_back</span></a>'),e==="next"&&(t='<a href="#" class="arrow tui-page-btn tui-next custom-class-next"><span class="material-icons-outlined">arrow_forward</span></a>'),e==="last"&&(t='<a href="#" class="tui-page-btn tui-last custom-class-last"><span class="tui-ico-last">»</span></a>'),t}}};let y="";const k=document.querySelector(".search-form"),re=document.querySelector(".submit-btn");re.addEventListener("click",()=>{k.dispatchEvent(new Event("submit"))});k.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.elements.searchQuery.value.trim();if(console.log("Search query:",t),!t){p.Notify.failure("Please enter a search term.");return}y=t;try{const o=await S(y);if(console.log("Movies data:",o),!o||!o.results||o.results.length===0){p.Notify.failure(`Sorry, we couldn't find any films matching "${y}".`);return}else p.Notify.success(`We found ${o.total_results} films matching "${y}".`);_.totalItems=o.total_pages,j(_.totalItems),q(o),k.elements.searchQuery.value=""}catch(o){console.error("Search result is not successful:",o),p.Notify.failure("An error occurred while fetching the movies.")}});async function j(){new J(document.getElementById("pagination-container"),_).on("afterMove",t);async function t(r){const i=Number(document.querySelector(".tui-ico-last").textContent),s=r.page;s>1&s<=i&&o(s);const l=await S(y,s);console.log(l),q(l),n()}function o(r){const i=document.querySelector(".custom-class-first"),s=document.querySelector(".custom-class-last"),l=Number(document.querySelector(".tui-ico-last").textContent);if(r<4){i.classList.add("btn-hidden");return}if(l-r<3){s.classList.add("btn-hidden");return}s.classList.remove("btn-hidden"),i.classList.remove("btn-hidden")}function n(){window.scrollTo({top:0,behavior:"smooth"})}}const ie=()=>{const e=document.getElementById("year"),t=new Date().getFullYear();e.textContent=t};window.addEventListener("load",async()=>{try{ie(),oe(),Q(),P();const e=await S();q(e),j(e)}catch(e){console.log("Eroare la încărcarea filmelor populare:",e)}});
//# sourceMappingURL=index.js.map
