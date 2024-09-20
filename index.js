import{a as g,N as h}from"./assets/vendor-CejCsbAT.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const i="493c6d740f024fcc02750f44c1518471",c="https://api.themoviedb.org/3";async function y(o){const r=`${c}/movie/${o}/videos?api_key=${i}&language=en-US`;try{const e=(await g.get(r)).data.results.find(t=>t.site==="YouTube"&&t.type==="Trailer");return e?`https://www.youtube.com/embed/${e.key}?autoplay=1`:null}catch(n){return n.response&&n.response.status===404||console.error("A apărut o eroare la obținerea trailerului."),null}}async function w(o="",r=1){let n="";o?n=`${c}/search/movie?api_key=${i}&language=en-US&query=${encodeURIComponent(o)}&page=${r}`:n=`${c}/trending/all/day?language=en-US&api_key=${i}&page=${r}`;try{const s=await g.get(n),e=await Promise.all(s.data.results.map(async t=>{try{const a=await y(t.id);return{...t,trailerUrl:a}}catch{return{...t,trailerUrl:null}}}));return{...s.data,results:e}}catch(s){throw h.Notify.failure("Oops! Something went wrong! Try reloading the page!"),s}}async function b(){const r=await y(550);console.log("Trailer URL:",r)}async function v(){const n=await w("Inception",1);console.log("Movies:",n)}b();v();let f=localStorage.getItem("nightMode");const l=document.querySelector("#checkbox"),m=()=>{document.body.classList.add("nightmode"),localStorage.setItem("nightMode","enabled")},M=()=>{document.body.classList.remove("nightmode"),localStorage.setItem("nightMode","disabled")};f==="enabled"&&(l.checked=!0,m());l.addEventListener("change",()=>{f=localStorage.getItem("nightMode"),l.checked?m():M()});const d=document.getElementById("myFooterModal"),E=document.getElementById("openFooterModal"),L=document.querySelector(".close-button-member");function I(){d.style.display="block",window.addEventListener("keydown",p)}function u(){d.style.display="none",window.removeEventListener("keydown",p)}function p(o){o.key==="Escape"&&u()}E.addEventListener("click",I);L.addEventListener("click",u);window.addEventListener("click",function(o){o.target===d&&u()});const S=()=>{const o=document.getElementById("year"),r=new Date().getFullYear();o.textContent=r};window.addEventListener("load",async()=>{try{S()}catch(o){console.alert("Eroare la încărcarea filmelor populare:",o)}});
//# sourceMappingURL=index.js.map
