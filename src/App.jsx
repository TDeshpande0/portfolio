import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Plane } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens + all component CSS live here so the file is portable */
/* ------------------------------------------------------------------ */
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,500&family=Space+Mono:wght@400;700&family=Work+Sans:wght@400;500;600&display=swap");

.tp {
  --kraft:#FFF6E3; --kraft-deep:#FFE49A; --ink:#123B36;
  --navy:#00A6A0; --navy-deep:#054C48; --airmail:#FF5A4E;
  --gold:#FFC53D; --paper:#FFFDF6; --mint:#2FA968; --lav:#FF5D8F;
  --muted:#5A7B73;
  background:var(--kraft); color:var(--ink);
  font-family:'Work Sans',sans-serif; line-height:1.6;
  overflow-x:hidden;
}
.tp *{box-sizing:border-box;margin:0;padding:0;}
.tp h1,.tp h2,.tp h3{font-family:'Fraunces',serif;}
.tp button{font-family:inherit;border:none;background:none;cursor:pointer;color:inherit;}

.tp nav{display:flex;justify-content:space-between;align-items:center;padding:20px 40px;border-bottom:3px solid var(--ink);}
.tp nav .mark{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:2px;}
.tp nav .links{display:flex;gap:28px;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:1px;}
.tp nav .links a,.tp nav .back{color:var(--ink);text-decoration:none;border-bottom:1px solid transparent;display:flex;align-items:center;gap:6px;font-family:'Space Mono',monospace;font-size:12px;}
.tp nav .links a:hover{border-bottom-color:var(--airmail);color:var(--airmail);}
.tp nav .back{border-bottom:1px solid var(--ink);}

.tp .ticker{background:var(--ink);overflow:hidden;white-space:nowrap;border-bottom:3px solid var(--ink);}
.tp .ticker div{display:inline-block;padding:9px 0;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:3px;color:var(--kraft);animation:tp-scroll 22s linear infinite;}
.tp .ticker span{margin:0 28px;color:var(--gold);}
@keyframes tp-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

.tp .hero{position:relative;padding:100px 40px 170px;overflow:hidden;min-height:620px;}
/* ---- beach scene ---- */
.tp .beach{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block;}
.tp .bloom{position:absolute;z-index:5;filter:drop-shadow(0 6px 10px rgba(60,30,40,.28));}
/* legibility scrim behind the copy */
.tp .scrim{position:absolute;inset:0;z-index:4;pointer-events:none;
  background:linear-gradient(100deg,rgba(255,251,242,.94) 0%,rgba(255,251,242,.86) 32%,rgba(255,251,242,.5) 52%,rgba(255,251,242,0) 76%);}
.tp .hero-inner{position:relative;z-index:6;max-width:1000px;margin:0 auto;}
.tp .eyebrow{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:4px;color:var(--airmail);margin-bottom:8px;}
.tp .hero h1{font-weight:700;font-size:clamp(52px,9vw,116px);line-height:.88;letter-spacing:-.02em;max-width:900px;}
.tp .hero h1 .it{font-style:italic;font-weight:500;color:var(--navy);}
.tp .hero .sub{margin-top:26px;max-width:40ch;font-size:18px;color:#274F47;font-weight:500;}

.tp section{padding:64px 40px;max-width:1000px;margin:0 auto;}
.tp .rule{border-top:3px solid var(--ink);max-width:1000px;margin:0 auto;}
.tp .section-label{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:4px;color:var(--gold);margin-bottom:24px;text-transform:uppercase;}

/* passport */
.tp .passport{background:var(--paper);position:relative;border:1px solid rgba(0,0,0,.15);border-radius:3px;overflow:hidden;
  box-shadow:0 24px 50px -26px rgba(0,0,0,.55);
  background-image:repeating-radial-gradient(circle at 0 0,transparent 0,transparent 13px,rgba(0,0,0,.028) 13px,rgba(0,0,0,.028) 14px),
    repeating-linear-gradient(115deg,transparent,transparent 26px,rgba(0,0,0,.02) 26px,rgba(0,0,0,.02) 27px);
  background-size:120px 120px,auto;}
.tp .passport::after{content:'';position:absolute;top:0;left:-40%;width:55%;height:100%;pointer-events:none;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.18),transparent);transform:skewX(-18deg);}
.tp .perf{position:absolute;right:0;top:0;bottom:0;width:22px;z-index:2;opacity:.6;
  background:repeating-linear-gradient(0deg,var(--airmail) 0 3px,transparent 3px 7px);
  -webkit-mask:radial-gradient(circle 2.4px at 11px 5px,transparent 2.4px,#000 2.5px) 0 0/22px 10px repeat;
  mask:radial-gradient(circle 2.4px at 11px 5px,transparent 2.4px,#000 2.5px) 0 0/22px 10px repeat;}
.tp .pp-head{display:flex;justify-content:space-between;align-items:center;padding:16px 30px;border-bottom:1.5px solid rgba(0,0,0,.13);position:relative;z-index:1;gap:12px;flex-wrap:wrap;}
.tp .pp-head .country{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:3px;color:var(--navy);}
.tp .pp-head .doctype{display:flex;align-items:center;gap:10px;}
.tp .pp-head .title{font-family:'Fraunces',serif;font-weight:700;font-size:15px;letter-spacing:2px;}
.tp .pp-head .docno{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:1px;color:var(--airmail);}
.tp .pp-body{display:grid;grid-template-columns:1.3fr 1fr;position:relative;z-index:1;}
.tp .pp-data{padding:26px 30px 30px;}
.tp .kicker{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;color:var(--gold);margin-bottom:14px;}
.tp .field{display:grid;grid-template-columns:120px 1fr;gap:8px;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.06);}
.tp .field .k{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:1px;color:var(--muted);align-self:center;text-transform:uppercase;}
.tp .field .v{font-family:'Fraunces',serif;font-size:16px;font-weight:600;}
.tp .sigrow{display:flex;align-items:flex-end;justify-content:space-between;margin-top:16px;gap:16px;}
.tp .sig{font-family:'Fraunces',serif;font-style:italic;font-size:19px;color:var(--navy);border-bottom:1.5px solid var(--ink);padding-bottom:4px;}
.tp .tiny{font-family:'Space Mono',monospace;font-size:8px;letter-spacing:1px;color:var(--muted);margin-top:4px;}
.tp .mrz{grid-column:1/-1;border-top:1.5px solid rgba(0,0,0,.13);padding:16px 30px 22px;position:relative;z-index:1;
  font-family:'Space Mono',monospace;font-size:13px;letter-spacing:2.5px;line-height:1.85;word-break:break-all;background:rgba(0,0,0,.025);}
.tp .photo-side{padding:26px 34px 24px 30px;display:flex;flex-direction:column;align-items:center;position:relative;border-left:1px solid rgba(0,0,0,.09);}
.tp .idphoto{background:var(--paper);border:1px solid rgba(0,0,0,.12);padding:9px 9px 22px;transform:rotate(-2.5deg);position:relative;z-index:1;
  box-shadow:0 14px 30px -16px rgba(0,0,0,.4);}
.tp .idphoto .frame{width:150px;height:118px;background:var(--navy-deep);margin-bottom:6px;position:relative;overflow:hidden;}
.tp .idphoto .frame:last-of-type{margin-bottom:0;}
.tp .idphoto .frame::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.03) 3px,rgba(255,255,255,.03) 4px);}
.tp .idphoto .frame span{position:absolute;bottom:5px;right:7px;font-family:'Space Mono',monospace;color:var(--kraft-deep);font-size:9px;}
.tp .idphoto .cap{text-align:center;font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:1px;margin-top:8px;}
.tp .corner{position:absolute;width:22px;height:22px;border-style:solid;border-color:var(--gold);z-index:2;opacity:.85;}
.tp .approved{position:absolute;top:14px;right:10px;width:80px;height:80px;border:2.5px solid var(--airmail);border-radius:50%;
  display:flex;align-items:center;justify-content:center;transform:rotate(-16deg);color:var(--airmail);
  font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-align:center;opacity:.9;z-index:3;}

/* luggage tags */
.tp .tags{display:flex;flex-wrap:wrap;gap:34px 30px;padding-top:20px;align-items:flex-start;}
.tp .tag-unit{position:relative;padding-top:26px;}
.tp .tag-unit .string{position:absolute;top:-2px;left:50%;transform:translateX(-50%);overflow:visible;z-index:0;}
.tp .tag{width:96px;min-height:200px;background:var(--paper);border:1px solid rgba(0,0,0,.13);border-radius:6px;position:relative;
  box-shadow:3px 8px 14px -6px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.6);
  padding:34px 10px 14px;display:flex;flex-direction:column;align-items:center;z-index:1;}
.tp .tag .flash{position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 26px 26px 0;border-color:transparent;border-radius:0 6px 0 0;}
.tp .tag .hole{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:12px;height:12px;border-radius:50%;background:var(--kraft);border:2px solid var(--ink);z-index:2;}
.tp .tag .code{font-family:'Fraunces',serif;font-size:26px;font-weight:700;line-height:1;}
.tp .tag .dest{font-family:'Space Mono',monospace;font-size:8px;letter-spacing:1.5px;color:var(--muted);margin-top:3px;text-align:center;text-transform:uppercase;}
.tp .tag .divider{width:100%;border-top:1px dashed rgba(0,0,0,.15);margin:10px 0 8px;}
.tp .tag .name{font-weight:500;font-size:13px;text-align:center;}
.tp .tag .sub{font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);letter-spacing:1px;margin-top:2px;}
.tp .tag .bar{width:70%;height:20px;margin-top:auto;padding-top:12px;background-clip:content-box;
  background:repeating-linear-gradient(90deg,var(--ink) 0 1.5px,transparent 1.5px 3px,var(--ink) 3px 3.5px,transparent 3.5px 5.5px,var(--ink) 5.5px 6px,transparent 6px 8px);}
.tp .tag .serial{font-family:'Space Mono',monospace;font-size:7px;color:var(--muted);letter-spacing:1px;margin-top:4px;}

/* work / boarding passes */
.tp .dark{background:var(--navy-deep);padding:74px 40px;}
.tp .dark .inner{max-width:1000px;margin:0 auto;}
.tp .dark h2{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:36px;color:var(--paper);margin-bottom:40px;max-width:20ch;}
.tp .bpasses{display:flex;flex-direction:column;gap:24px;}
.tp .bpass{display:grid;grid-template-columns:1fr 150px;position:relative;border-radius:6px;cursor:pointer;}
.tp .bpass:focus-visible{outline:2px solid var(--gold);outline-offset:4px;}
.tp .bpass .notch{position:absolute;width:22px;height:22px;background:var(--navy-deep);border-radius:50%;right:150px;margin-right:-11px;z-index:3;transition:opacity .2s;}
.tp .bpass .notch.top{top:-11px;} .tp .bpass .notch.bot{bottom:-11px;}
.tp .bpass .seam{position:absolute;right:150px;top:0;bottom:0;border-left:2px dashed rgba(0,0,0,.2);z-index:2;transition:opacity .2s;}
.tp .bpass .main{background:var(--paper);border-radius:6px 0 0 6px;padding:24px 30px;box-shadow:0 20px 40px -26px rgba(0,0,0,.6);
  transition:transform .45s cubic-bezier(.4,0,.2,1),opacity .4s;}
.tp .bpass .stub{background:var(--kraft-deep);border-radius:0 6px 6px 0;padding:20px 18px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;
  box-shadow:0 20px 40px -26px rgba(0,0,0,.6);transition:transform .45s cubic-bezier(.4,0,.2,1),opacity .4s;}
.tp .bpass:hover .main{transform:translate(-4px,2px) rotate(-1deg);}
.tp .bpass:hover .stub{transform:translate(8px,-2px) rotate(2deg);}
.tp .bpass.tearing .main{transform:translate(-90px,55px) rotate(-12deg);opacity:0;}
.tp .bpass.tearing .stub{transform:translate(120px,-65px) rotate(16deg);opacity:0;}
.tp .bpass.tearing .seam,.tp .bpass.tearing .notch{opacity:0;}
.tp .bpass .cat{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--gold);margin-bottom:10px;}
.tp .bpass .route{display:flex;align-items:center;gap:14px;font-family:'Fraunces',serif;font-size:24px;font-weight:600;margin-bottom:6px;}
.tp .bpass .blurb{font-size:13.5px;color:var(--muted);max-width:44ch;}
.tp .bpass .go{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--navy);}
.tp .bpass .barcode{width:100%;height:34px;
  background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 3px,var(--ink) 3px 5px,transparent 5px 8px,var(--ink) 8px 9px,transparent 9px 11px);}

/* contact */
.tp .contact{background:var(--paper);display:grid;grid-template-columns:1fr 1fr;box-shadow:0 20px 40px -24px rgba(0,0,0,.45);}
.tp .contact .lines{padding:36px 40px;}
.tp .contact .lines .l{border-bottom:1px solid rgba(0,0,0,.15);height:30px;}
.tp .contact .stampblock{border-left:1px dashed rgba(0,0,0,.2);padding:36px 40px;display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;gap:24px;}
.tp .bigstamp{width:70px;height:82px;border:2.5px solid var(--airmail);display:flex;align-items:center;justify-content:center;transform:rotate(-9deg);
  font-family:'Space Mono',monospace;font-size:11px;color:var(--airmail);text-align:center;
  -webkit-mask:radial-gradient(circle 4px at 5px 5px,transparent 4px,#000 4.1px) -5px -5px/14px 14px repeat;
  mask:radial-gradient(circle 4px at 5px 5px,transparent 4px,#000 4.1px) -5px -5px/14px 14px repeat;}
.tp .cta{font-family:'Fraunces',serif;font-style:italic;font-size:20px;color:var(--ink);text-decoration:none;border-bottom:2px solid var(--airmail);}

.tp footer{text-align:center;padding:34px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:1px;color:var(--muted);background:var(--kraft-deep);}

/* flight overlay */
.tp .fly{position:fixed;inset:0;background:var(--navy-deep);z-index:9999;display:flex;align-items:center;justify-content:center;animation:tp-fade .25s ease forwards;}
@keyframes tp-fade{from{opacity:0}to{opacity:1}}
.tp .fly .track{position:absolute;left:0;right:0;top:50%;height:2px;opacity:.5;background:repeating-linear-gradient(90deg,var(--gold) 0 10px,transparent 10px 20px);}
.tp .fly .plane{position:absolute;top:50%;width:70px;height:70px;animation:tp-flyacross 2.8s cubic-bezier(.45,0,.4,1) forwards;}
@keyframes tp-flyacross{
  0%{left:-100px;transform:translateY(-50%) rotate(0deg) scale(.85);}
  50%{transform:translateY(-110px) rotate(-6deg) scale(1.05);}
  100%{left:105%;transform:translateY(-170px) rotate(-3deg) scale(1.2);}
}
.tp .fly .label{position:absolute;bottom:60px;font-family:'Space Mono',monospace;color:var(--kraft);letter-spacing:3px;font-size:12px;
  opacity:0;animation:tp-fadein .4s ease .5s forwards;}
@keyframes tp-fadein{to{opacity:1}}

/* case study */
.tp .cs-hero{padding:64px 40px 48px;}
.tp .cs-hero h1{font-size:clamp(38px,6vw,64px);font-weight:700;line-height:1.02;max-width:16ch;}
.tp .cs-hero .tagline{font-family:'Fraunces',serif;font-style:italic;font-size:20px;color:var(--navy-deep);margin-top:10px;}
.tp .ovpass{margin-top:36px;background:var(--paper);border:1px solid rgba(0,0,0,.1);border-radius:8px;overflow:hidden;
  display:grid;grid-template-columns:1fr 190px;box-shadow:0 20px 40px -26px rgba(0,0,0,.35);}
.tp .ovpass .meta{padding:26px 30px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px 24px;}
.tp .ovpass .k{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:1.5px;color:var(--muted);text-transform:uppercase;}
.tp .ovpass .v{font-family:'Fraunces',serif;font-weight:600;font-size:16px;margin-top:3px;}
.tp .ovpass .stub{background:var(--kraft-deep);border-left:2px dashed rgba(0,0,0,.2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px;
  font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--navy-deep);text-align:center;}
.tp .routebar{background:var(--navy-deep);padding:30px 40px;}
.tp .routeline{max-width:1000px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;position:relative;list-style:none;}
.tp .routeline::before{content:'';position:absolute;left:20px;right:20px;top:17px;height:2px;z-index:0;
  background:repeating-linear-gradient(90deg,var(--gold) 0 8px,transparent 8px 14px);}
.tp .stop{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:8px;}
.tp .stop .dot{width:34px;height:34px;border-radius:50%;background:var(--paper);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;
  font-family:'Space Mono',monospace;font-weight:700;font-size:12px;color:var(--navy-deep);}
.tp .stop span{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--kraft);}
.tp .cs-label{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:4px;color:var(--airmail);margin-bottom:8px;text-transform:uppercase;}
.tp .cs-head{font-size:32px;font-weight:600;margin-bottom:30px;max-width:22ch;}
.tp .card{background:var(--paper);border:1px solid rgba(0,0,0,.08);border-radius:10px;padding:24px 26px;box-shadow:0 14px 28px -22px rgba(0,0,0,.3);}
.tp .card h4{font-size:15px;font-weight:600;margin-bottom:10px;font-family:'Work Sans',sans-serif;}
.tp .card ul{padding-left:18px;color:var(--muted);font-size:14px;}
.tp .card li{margin-bottom:5px;}
.tp .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.tp table.comp{width:100%;border-collapse:collapse;background:var(--paper);border-radius:10px;overflow:hidden;box-shadow:0 14px 28px -22px rgba(0,0,0,.3);}
.tp table.comp th,.tp table.comp td{padding:12px 14px;border-bottom:1px solid rgba(15,59,53,.07);font-size:13px;}
.tp table.comp th{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--navy-deep);background:var(--kraft-deep);text-transform:uppercase;text-align:center;}
.tp table.comp th:first-child,.tp table.comp td:first-child{text-align:left;}
.tp table.comp td:not(:first-child){text-align:center;}
.tp .dotm{display:inline-block;width:9px;height:9px;border-radius:50%;}
.tp .legend{display:flex;gap:16px;font-family:'Space Mono',monospace;font-size:10px;color:var(--muted);margin-top:10px;}
.tp .legend span{display:flex;align-items:center;gap:6px;}
.tp figure{overflow:hidden;border-radius:10px;border:1px solid rgba(0,0,0,.1);box-shadow:0 16px 32px -24px rgba(0,0,0,.4);background:var(--paper);}
.tp figure.dark{background:#0E1F30;}
.tp figcaption{background:var(--navy-deep);color:var(--gold);padding:8px 16px;font-family:'Space Mono',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;}
.tp .ph{display:flex;align-items:center;justify-content:center;min-height:150px;padding:24px;text-align:center;
  font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--muted);border:1px dashed rgba(0,0,0,.15);margin:14px;border-radius:6px;}
.tp figure.dark .ph{color:var(--kraft-deep);border-color:rgba(255,255,255,.2);}
.tp .quote{background:var(--navy-deep);color:var(--paper);border-radius:10px;padding:30px 34px;font-size:16px;line-height:1.7;}

@media(max-width:820px){
  .tp .hero{min-height:520px;padding:64px 20px 130px;}
  .tp .scrim{background:linear-gradient(180deg,rgba(255,251,242,.95) 0%,rgba(255,251,242,.88) 46%,rgba(255,251,242,.3) 72%,rgba(255,251,242,0) 90%);}
  .tp .pp-body{grid-template-columns:1fr;}
  .tp .photo-side{border-left:none;border-top:1px solid rgba(0,0,0,.09);}
  .tp .bpass{grid-template-columns:1fr;}
  .tp .bpass .notch,.tp .bpass .seam{display:none;}
  .tp .bpass .main{border-radius:6px 6px 0 0;}
  .tp .bpass .stub{border-radius:0 0 6px 6px;flex-direction:row;align-items:center;}
  .tp .contact,.tp .grid2,.tp .ovpass{grid-template-columns:1fr;}
  .tp .contact .stampblock{border-left:none;border-top:1px dashed rgba(0,0,0,.2);align-items:flex-start;}
  .tp .ovpass .stub{border-left:none;border-top:2px dashed rgba(0,0,0,.2);flex-direction:row;}
  .tp .hero,.tp section,.tp .dark,.tp .cs-hero{padding-left:20px;padding-right:20px;}
}
@media(prefers-reduced-motion:reduce){
  .tp *,.tp *::before,.tp *::after{animation-duration:.01ms !important;transition-duration:.01ms !important;}
}
`;

/* ------------------------------- data ------------------------------- */
const DESTINATIONS = ["Costa Rica", "Czech Republic", "India", "Puerto Rico", "New York", "California"];

const PASSPORT_FIELDS = [
  ["Surname", "Deshpande"],
  ["Given names", "Tanvi"],
  ["Nationality", "Product design"],
  ["Date of issue", "2026"],
  ["Place of birth", "Your city"],
  ["Authority", "Open to work"],
];

const TAGS = [
  { code: "FIG", dest: "figma", name: "Figma", flash: "#FF5A4E", serial: "BAG\u20110001", tilt: -2.5 },
  { code: "WEB", dest: "webflow", name: "Webflow", flash: "#2FA968", serial: "BAG\u20110002", tilt: 2.5 },
  { code: "MOT", dest: "motion design", name: "Motion", flash: "#FFC53D", serial: "BAG\u20110003", tilt: -2.5 },
  { code: "BRD", dest: "branding", name: "Branding", flash: "#FF5D8F", serial: "BAG\u20110004", tilt: 2.5 },
  { code: "TYP", dest: "typography", name: "Type", flash: "#00A6A0", serial: "BAG\u20110005", tilt: -2.5 },
];

const PROJECTS = [
  { category: "branding", from: "ORBIT", to: "LAUNCH", blurb: "A full identity system for a satellite logistics startup — wordmark, motion, and a launch site.", route: null },
  { category: "product · accessibility", from: "DELTA", to: "BOOKED", blurb: "Redesigned Delta's flight-booking flow for speed and accessibility — research, IA, and a full hi-fi prototype.", route: "delta" },
  { category: "motion", from: "FOLD", to: "FLIP", blurb: "A personal series exploring flip and fold transitions inspired by paper ephemera.", route: null },
];

const META = [
  ["Role", "UX / UI Designer"], ["Duration", "8 weeks"], ["Tools", "Figma, Sketch"],
  ["Target", "Frequent flyers"], ["Platform", "Web & mobile"], ["Team", "Solo project"],
];

const PHASES = ["Empathize", "Define", "Ideate", "Prototype", "Test"];

const COMPARISON = [
  ["Navigation clarity", "mid", "yes", "yes", "mid"],
  ["Accessibility features", "no", "mid", "yes", "no"],
  ["Booking efficiency", "mid", "yes", "mid", "mid"],
  ["Visual design", "mid", "yes", "yes", "no"],
  ["Mobile experience", "no", "mid", "yes", "no"],
];
const DOT = { yes: "#2FA968", mid: "#FFC53D", no: "#FF5A4E" };

/* ---------------------------- primitives ---------------------------- */
function Lily({ uid = "l1", style, className }) {
  const petals = [0, 60, 120, 180, 240, 300];
  const freckles = [
    [-7, -30], [6, -34], [-11, -42], [9, -46], [-4, -52],
    [12, -56], [-14, -60], [3, -64], [-8, -72], [10, -74],
  ];
  return (
    <svg viewBox="0 0 240 240" style={style} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-p`} cx="50%" cy="92%" r="82%">
          <stop offset="0%" stopColor="#DFE08C" />
          <stop offset="12%" stopColor="#E4C39E" />
          <stop offset="30%" stopColor="#D9799F" />
          <stop offset="62%" stopColor="#E296B4" />
          <stop offset="88%" stopColor="#F2C7D7" />
          <stop offset="100%" stopColor="#F7DCE4" />
        </radialGradient>
        <radialGradient id={`${uid}-c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9CE5E" />
          <stop offset="100%" stopColor="#DCE08F" />
        </radialGradient>
      </defs>
      <g transform="translate(120,120)">
        {petals.map((deg, pi) => (
          <g key={deg} transform={`rotate(${deg})`}>
            {/* broad petal with a recurved, slightly curled tip */}
            <path
              d="M0,0
                 C-16,-18 -30,-40 -30,-64
                 C-30,-84 -20,-100 -8,-106
                 C-2,-109 2,-109 8,-106
                 C20,-100 30,-84 30,-64
                 C30,-40 16,-18 0,0 Z"
              fill={`url(#${uid}-p)`}
              stroke="#5B3243"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* midrib */}
            <path d="M0,-6 C1,-40 1,-72 0,-100" stroke="#8E4468" strokeWidth="1.5" fill="none" opacity="0.8" />
            {/* side veins */}
            {[-20, -13, -6.5, 6.5, 13, 20].map((off, i) => (
              <path
                key={i}
                d={`M${off * 0.1},-8 C${off * 0.62},-34 ${off * 0.92},-60 ${off * 0.74},-92`}
                stroke="#A5557A"
                strokeWidth="1"
                fill="none"
                opacity="0.62"
              />
            ))}
            {/* speckles */}
            {pi % 2 === 0 &&
              freckles.map(([fx, fy], i) => (
                <circle key={i} cx={fx * 0.8} cy={fy} r="1.5" fill="#A83E63" opacity="0.5" />
              ))}
          </g>
        ))}

        {/* six stamens with heavy anthers */}
        {[-52, -30, -8, 14, 36, 58].map((deg, i) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d={`M0,-2 C${4 + i * 0.8},-20 ${7 + i * 1.2},-38 ${6 + i},-54`}
              stroke="#7A4356"
              strokeWidth="1.7"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx={6 + i}
              cy={-58}
              rx="3.4"
              ry="7"
              fill="#7C2A2C"
              transform={`rotate(${18 + i * 5} ${6 + i} -58)`}
            />
          </g>
        ))}

        {/* pistil */}
        <path d="M0,-2 C2,-24 3,-46 2,-66" stroke="#7A4356" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="2" cy="-70" rx="4.4" ry="5.6" fill="#E5B93F" />

        {/* green-gold throat */}
        <circle r="13" fill={`url(#${uid}-c)`} />
        <circle r="5.5" fill="#B4B84C" />
      </g>
    </svg>
  );
}

function HibiscusFlower({ uid = "h1", style, className }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 220 220" style={style} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-p`} cx="50%" cy="92%" r="86%">
          <stop offset="0%" stopColor="#C9483E" />
          <stop offset="14%" stopColor="#EC8874" />
          <stop offset="46%" stopColor="#F7B39A" />
          <stop offset="100%" stopColor="#FDEBCF" />
        </radialGradient>
      </defs>
      <g transform="translate(110,116)">
        {petals.map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d="M0,0 C-26,-8 -47,-28 -47,-54 C-47,-78 -24,-92 -4,-83 C-1,-81 1,-81 4,-83 C24,-92 47,-78 47,-54 C47,-28 26,-8 0,0 Z"
              fill={`url(#${uid}-p)`}
              stroke="#C0503F"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {[-26, -13, 0, 13, 26].map((off, i) => (
              <path
                key={i}
                d={`M${off * 0.14},-8 C${off * 0.6},-30 ${off * 0.86},-50 ${off * 0.8},-70`}
                stroke="#D9705C"
                strokeWidth="0.9"
                fill="none"
                opacity="0.7"
              />
            ))}
          </g>
        ))}
        {/* deep throat */}
        <circle r="15" fill="#C0453B" opacity="0.92" />
        <circle r="7" fill="#9E332C" />
        {/* style column with anthers */}
        <path d="M0,-4 C6,-26 14,-46 22,-62" stroke="#D2564A" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        {[[18, -66], [24, -70], [28, -62], [22, -58], [30, -68]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="#E2685A" />
        ))}
        {[[8, -30], [11, -37], [14, -44], [17, -51], [10, -33], [13, -41]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.9" fill="#F0C64B" />
        ))}
      </g>
    </svg>
  );
}

function PlaneMark({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <g transform="rotate(90 50 50)">
        <path
          d="M50 8 L58 40 L88 55 L88 62 L58 54 L54 82 L66 90 L66 95 L50 91 L34 95 L34 90 L46 82 L42 54 L12 62 L12 55 L42 40 Z"
          fill="#FFC53D" stroke="#FFFDF6" strokeWidth="1.5" strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function BeachScene() {
  return (
    <svg
      className="beach"
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9BCD0" />
          <stop offset="30%" stopColor="#F3A9C9" />
          <stop offset="58%" stopColor="#CBA6DC" />
          <stop offset="82%" stopColor="#AAA9DE" />
          <stop offset="100%" stopColor="#9EB5E0" />
        </linearGradient>
        <linearGradient id="tp-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5EA1D7" />
          <stop offset="45%" stopColor="#4E96D2" />
          <stop offset="100%" stopColor="#84C1E2" />
        </linearGradient>
        <radialGradient id="tp-moon">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="72%" stopColor="#FFF6E0" />
          <stop offset="100%" stopColor="#FFF0D2" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect width="1200" height="300" fill="url(#tp-sky)" />
      <circle cx="900" cy="82" r="66" fill="#FFF3DE" opacity="0.26" />
      <circle cx="900" cy="82" r="29" fill="url(#tp-moon)" />

      <path d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0" transform="translate(150,132) scale(1)" stroke="#3D3752" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.72" />
      <path d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0" transform="translate(212,158) scale(0.85)" stroke="#3D3752" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.66" />
      <path d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0" transform="translate(742,112) scale(0.9)" stroke="#3D3752" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.66" />
      <path d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0" transform="translate(806,140) scale(0.72)" stroke="#3D3752" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* sea */}
      <rect y="300" width="1200" height="260" fill="url(#tp-sea)" />
      <path d="M-60,326 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.140" strokeLinecap="round" />
      <path d="M10,356 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.165" strokeLinecap="round" />
      <path d="M80,390 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.190" strokeLinecap="round" />
      <path d="M150,428 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.215" strokeLinecap="round" />
      <path d="M220,470 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.240" strokeLinecap="round" />
      <path d="M290,516 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.265" strokeLinecap="round" />
      {/* moon reflection */}
      <path d="M876 300 L928 300 L946 560 L858 560 Z" fill="#FFF3DE" opacity="0.13" />

      {/* headland + palms */}
      <path d="M296 300 C332 272 400 256 492 256 C580 256 652 274 688 300 Z" fill="#151E2E" />
      <g transform="translate(486,196) scale(1,1)">
        <path d="M0,0 C7,32 10,66 5,104" stroke="#151E2E" strokeWidth="8" fill="none" strokeLinecap="round" />
        <g fill="#151E2E">
          <path d="M0,2 C-34,-16 -64,-9 -82,11 C-60,-7 -30,-7 0,2 Z" />
          <path d="M0,2 C-26,-34 -11,-60 7,-73 C-2,-51 -8,-26 0,2 Z" />
          <path d="M0,2 C28,-30 58,-32 78,-20 C54,-28 24,-14 0,2 Z" />
          <path d="M0,2 C34,-8 62,12 72,32 C54,12 28,3 0,2 Z" />
          <path d="M0,2 C-17,12 -40,30 -50,52 C-36,26 -16,10 0,2 Z" />
        </g>
      </g>
      <g transform="translate(566,224) scale(0.74,0.74)">
        <path d="M0,0 C7,32 10,66 5,104" stroke="#151E2E" strokeWidth="8" fill="none" strokeLinecap="round" />
        <g fill="#151E2E">
          <path d="M0,2 C-34,-16 -64,-9 -82,11 C-60,-7 -30,-7 0,2 Z" />
          <path d="M0,2 C-26,-34 -11,-60 7,-73 C-2,-51 -8,-26 0,2 Z" />
          <path d="M0,2 C28,-30 58,-32 78,-20 C54,-28 24,-14 0,2 Z" />
          <path d="M0,2 C34,-8 62,12 72,32 C54,12 28,3 0,2 Z" />
          <path d="M0,2 C-17,12 -40,30 -50,52 C-36,26 -16,10 0,2 Z" />
        </g>
      </g>

      {/* shoreline sweeping in from the left */}
      <path
        d="M0 316 C104 350 182 410 230 486 C250 518 259 540 264 560 L0 560 Z"
        fill="#F2D6A0"
      />
      <path
        d="M0 316 C104 350 182 410 230 486 C250 518 259 540 264 560"
        stroke="#FFFFFF"
        strokeWidth="9"
        fill="none"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path
        d="M16 336 C116 370 192 424 238 498 C256 528 266 546 271 560"
        stroke="#FFFFFF"
        strokeWidth="4"
        fill="none"
        opacity="0.45"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LuggageTag({ code, dest, name, flash, serial, tilt }) {
  return (
    <div className="tag-unit" style={{ transform: `rotate(${tilt}deg)` }}>
      <svg className="string" width="70" height="20" viewBox="0 0 70 20" aria-hidden="true">
        <path d="M10 20 C 10 2, 60 2, 60 20" stroke="#123B36" strokeWidth="1.5" fill="none" />
      </svg>
      <div className="tag">
        <span className="flash" style={{ borderRightColor: flash }} />
        <span className="hole" />
        <div className="code">{code}</div>
        <div className="dest">{dest}</div>
        <div className="divider" />
        <div className="name">{name}</div>
        <div className="sub">skill · carry-on</div>
        <div className="bar" />
        <div className="serial">{serial}</div>
        <HibiscusFlower
          uid={`tag-${code}`}
          style={{ position: "absolute", bottom: 4, right: -10, width: 34, height: 34, transform: "rotate(12deg)" }}
        />
      </div>
    </div>
  );
}

function BoardingPass({ category, from, to, blurb, onOpen }) {
  const [torn, setTorn] = useState(false);

  const activate = () => {
    if (torn) return;
    setTorn(true);
    window.setTimeout(() => {
      if (onOpen) onOpen();
      else setTorn(false);
    }, 420);
  };

  return (
    <div
      className={`bpass${torn ? " tearing" : ""}`}
      role="button" tabIndex={0}
      aria-label={`View case study: ${from} to ${to}`}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
      }}
    >
      <span className="notch top" />
      <span className="notch bot" />
      <span className="seam" />
      <div className="main">
        <div className="cat">{category}</div>
        <div className="route">
          {from}
          <ArrowRight size={16} color="#FF5A4E" aria-hidden="true" />
          {to}
        </div>
        <p className="blurb">{blurb}</p>
      </div>
      <div className="stub">
        <span className="go">view case →</span>
        <div className="barcode" />
      </div>
    </div>
  );
}

function PassportPage() {
  const corners = [
    { top: 26, left: 22, borderWidth: "2px 0 0 2px" },
    { top: 26, right: 22, borderWidth: "2px 2px 0 0" },
    { bottom: 44, left: 22, borderWidth: "0 0 2px 2px" },
    { bottom: 44, right: 22, borderWidth: "0 2px 2px 0" },
  ];
  return (
    <div className="passport">
      <span className="perf" />
      <div className="pp-head">
        <div className="country">DESIGN REPUBLIC</div>
        <div className="doctype">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <g fill="none" stroke="#FFC53D" strokeWidth="1.3">
              <path d="M13 4 C9 8,9 16,13 21" /><path d="M13 4 C17 8,17 16,13 21" />
              <path d="M9 6 L11 7 M8 9 L10.5 9.5 M7.5 12 L10 12.5 M8 15 L10.5 14.5 M9 18 L11 17" />
              <path d="M17 6 L15 7 M18 9 L15.5 9.5 M18.5 12 L16 12.5 M18 15 L15.5 14.5 M17 18 L15 17" />
            </g>
          </svg>
          <div className="title">PASSPORT</div>
        </div>
        <div className="docno">NO. DR—0000001</div>
      </div>

      <div className="pp-body">
        <div className="pp-data">
          <div className="kicker">type P · code DES · design</div>
          {PASSPORT_FIELDS.map(([k, v]) => (
            <div className="field" key={k}>
              <div className="k">{k}</div>
              <div className="v">{v}</div>
            </div>
          ))}
          <div className="sigrow">
            <div>
              <div className="sig">Tanvi Deshpande</div>
              <div className="tiny">holder’s signature</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
                <rect width="22" height="16" rx="2" fill="#FFC53D" />
                <g fill="none" stroke="#7A5A12" strokeWidth="1">
                  <path d="M11 4 a4 4 0 0 1 0 8" /><path d="M11 6 a2 2 0 0 1 0 4" />
                </g>
              </svg>
              <div className="tiny" style={{ marginTop: 0 }}>e‑passport</div>
            </div>
          </div>
        </div>

        <div className="photo-side">
          <div className="approved">designer<br />approved</div>
          {corners.map((c, i) => <span className="corner" key={i} style={c} />)}
          <div className="idphoto">
            {["01", "02", "03"].map((n) => (
              <div className="frame" key={n}><span>{n}</span></div>
            ))}
            <div className="cap">photobooth co. · official photo</div>
          </div>
        </div>

        <div className="mrz">
          P&lt;DESIGNERXX&lt;&lt;TANVI&lt;DESHPANDE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          DR0000001DES0001019X0000000&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- pages ------------------------------ */
function Home({ go }) {
  const row = [...DESTINATIONS, ...DESTINATIONS];
  return (
    <>
      <nav>
        <div className="mark">NO. 000—DESIGNER</div>
        <div className="links">
          <a href="#about">about</a><a href="#work">work</a><a href="#contact">contact</a>
        </div>
      </nav>

      <div className="ticker">
        <div>
          {row.map((d, i) => (
            <span key={i} style={{ margin: 0 }}>
              <span>✈</span>{d}
            </span>
          ))}
        </div>
      </div>

      <header className="hero">
        <BeachScene />

        <Lily uid="heroB" className="bloom" style={{ bottom: 96, left: 36, width: 168, height: 168 }} />
        <HibiscusFlower uid="heroA" className="bloom" style={{ bottom: 52, left: 12, width: 104, height: 104 }} />
        <HibiscusFlower uid="heroC" className="bloom" style={{ bottom: 68, left: 168, width: 74, height: 74, opacity: 0.96 }} />
        <div className="scrim" />

        <div className="hero-inner">
          <div className="eyebrow">aspiring product designer</div>
          <h1>Tanvi<br />Deshpande</h1>
          <p className="sub">
            I keep every boarding pass, every photo strip, every stamp in my
            passport. My desk drawer never stood a chance, and neither did this
            website.
          </p>
        </div>
      </header>

      <div className="rule" />

      <section id="about">
        <div className="section-label">bio · data page</div>
        <PassportPage />
      </section>

      <section>
        <div className="section-label">cargo · skills</div>
        <div className="tags">
          {TAGS.map((t) => <LuggageTag key={t.code} {...t} />)}
        </div>
      </section>

      <div className="dark" id="work">
        <div className="inner">
          <div className="section-label">boarding passes · work</div>
          <h2>Every project, a route flown.</h2>
          <div className="bpasses">
            {PROJECTS.map((p) => (
              <BoardingPass
                key={p.from} {...p}
                onOpen={p.route ? () => go(p.route) : null}
              />
            ))}
          </div>
        </div>
      </div>

      <section id="contact">
        <div className="section-label">send a postcard</div>
        <div className="contact">
          <div className="lines">
            {[0, 1, 2, 3].map((i) => <div className="l" key={i} />)}
          </div>
          <div className="stampblock">
            <div className="bigstamp">AIR<br />MAIL</div>
            <a className="cta" href="mailto:hello@you.com">say hello →</a>
          </div>
        </div>
      </section>

      <footer>issued for portfolio use only · not valid for travel</footer>
    </>
  );
}

function Figure({ tab, note, dark }) {
  return (
    <figure className={dark ? "dark" : ""}>
      <figcaption>{tab}</figcaption>
      <div className="ph">{note}</div>
    </figure>
  );
}

function DeltaCaseStudy({ go }) {
  return (
    <>
      <nav>
        <div className="mark">CASE STUDY · 01</div>
        <button className="back" onClick={() => go("home")}>
          <ArrowLeft size={14} aria-hidden="true" /> back to work
        </button>
      </nav>

      <header className="cs-hero">
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="cs-label">product design · airline booking</div>
          <h1>Delta Airlines Re‑Design</h1>
          <div className="tagline">Making travel faster.</div>

          <div className="ovpass">
            <div className="meta">
              {META.map(([k, v]) => (
                <div key={k}>
                  <div className="k">{k}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
            <div className="stub">
              <Plane size={22} color="#054C48" aria-hidden="true" />
              <div>overview<br />boarding pass</div>
            </div>
          </div>
        </div>
      </header>

      <div className="routebar">
        <ol className="routeline">
          {PHASES.map((p, i) => (
            <li className="stop" key={p}>
              <span className="dot">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>

      <section>
        <div className="cs-label">overview</div>
        <p style={{ maxWidth: "70ch", color: "var(--muted)", fontSize: 15 }}>
          Delta’s online booking experience overwhelms first-time flyers — long forms,
          confusing seat selection, and buried accessibility options. This project rebuilds
          the flight-booking flow into something faster, clearer, and genuinely usable for
          every kind of traveler.
        </p>
      </section>

      <section>
        <div className="cs-label">01 · empathize</div>
        <h2 className="cs-head">Understanding the traveler.</h2>

        <div className="grid2" style={{ marginBottom: 30 }}>
          <div className="card">
            <h4>Research goals</h4>
            <ul>
              <li>Identify pain points across the booking journey</li>
              <li>Understand how accessibility needs go unmet</li>
              <li>Benchmark against major competitor airlines</li>
            </ul>
          </div>
          <div className="card">
            <h4>Methodologies</h4>
            <ul>
              <li>Competitive analysis of four major carriers</li>
              <li>User surveys and interviews</li>
              <li>Affinity mapping &amp; persona development</li>
            </ul>
          </div>
        </div>

        <h4 style={{ marginBottom: 14, fontSize: 15, fontWeight: 600 }}>Competitive analysis</h4>
        <table className="comp">
          <thead>
            <tr>{["Criteria", "Delta", "Emirates", "Qatar", "United"].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {COMPARISON.map(([c, ...marks]) => (
              <tr key={c}>
                <td>{c}</td>
                {marks.map((m, i) => (
                  <td key={i}><span className="dotm" style={{ background: DOT[m] }} title={m} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="legend">
          <span><i className="dotm" style={{ background: DOT.yes }} />strong</span>
          <span><i className="dotm" style={{ background: DOT.mid }} />partial</span>
          <span><i className="dotm" style={{ background: DOT.no }} />weak</span>
        </div>

        <h4 style={{ margin: "34px 0 14px", fontSize: 15, fontWeight: 600 }}>User personas</h4>
        <div className="grid2">
          <Figure tab="passport · persona 01" note="Aisha — the environmentally conscious professional" />
          <Figure tab="passport · persona 02" note="David — the retired assisted traveler" />
        </div>
      </section>

      <section>
        <div className="cs-label">02 · define</div>
        <h2 className="cs-head">Turning research into a problem.</h2>
        <div className="quote" style={{ marginBottom: 30 }}>
          The flight booking experience is hindered by hidden fees, inefficient processes,
          and poor accessibility, leading to user frustration and mistrust. Travelers
          needing special assistance face significant barriers.
        </div>
        <div className="grid2">
          <div className="card">
            <h4>User needs</h4>
            <ul>
              <li>Clear, upfront pricing without hidden fees</li>
              <li>Fast, self-serve accessibility requests</li>
              <li>A seat map that’s readable on any device</li>
            </ul>
          </div>
          <div className="card">
            <h4>User goals</h4>
            <ul>
              <li>Book a flight without confusing navigation</li>
              <li>Understand every fee before paying</li>
              <li>Trust that accessibility needs will be met</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="cs-label">03 · ideate</div>
        <h2 className="cs-head">Structuring the new flow.</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Figure tab="site map" note="Information architecture" />
          <Figure tab="user flow · legend included" note="User flow diagram" />
          <Figure tab="low-fidelity key screens" note="Low-fidelity wireframes" dark />
        </div>
      </section>

      <section>
        <div className="cs-label">04 · prototype</div>
        <h2 className="cs-head">Building the system.</h2>
        <div className="grid2" style={{ marginBottom: 20 }}>
          <Figure tab="typography" note="PT Serif · Fira Sans specimen" />
          <Figure tab="buttons · tags · overlay" note="UI component library" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Figure tab="special assistance seating card" note="Special assistance card" />
          <Figure tab="promotional cards" note="Delta One · Delta Comfort+" />
          <Figure tab="high-fidelity key screens" note="Hi-fi screens — web &amp; mobile" dark />
        </div>
      </section>

      <section>
        <div className="cs-label">05 · test</div>
        <h2 className="cs-head">Validating with real travelers.</h2>
        <div className="card" style={{ marginBottom: 30 }}>
          <h4>Usability test plan</h4>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Participants completed tasks covering flight search, seat selection, special
            assistance requests, and the SAF option, with a focus on inclusivity and accessibility.
          </p>
        </div>
        <div className="grid2">
          <div className="card">
            <h4>Key observations</h4>
            <ul>
              <li>Participants completed booking noticeably faster</li>
              <li>Assistance options were found without help</li>
              <li>The fare breakdown toggle was occasionally missed</li>
            </ul>
          </div>
          <div className="card">
            <h4>Insights &amp; recommendations</h4>
            <ul>
              <li>Surface the fare breakdown by default</li>
              <li>Confirm assistance requests with clear microcopy</li>
              <li>Keep testing the seat map on smaller viewports</li>
            </ul>
          </div>
        </div>
      </section>

      <footer>
        <button onClick={() => go("home")} style={{ textDecoration: "underline" }}>
          back to all projects
        </button>
      </footer>
    </>
  );
}

/* -------------------------------- app ------------------------------- */
export default function App() {
  const [page, setPage] = useState("home");
  const [flying, setFlying] = useState(false);

  const go = (next) => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (next === "home" || reduce) {
      setPage(next);
      window.scrollTo(0, 0);
      return;
    }
    setFlying(true);
    window.setTimeout(() => {
      setPage(next);
      setFlying(false);
      window.scrollTo(0, 0);
    }, 2600);
  };

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div className="tp">
      <style>{CSS}</style>
      {page === "home" ? <Home go={go} /> : <DeltaCaseStudy go={go} />}
      {flying && (
        <div className="fly" role="status" aria-live="polite">
          <div className="track" />
          <PlaneMark className="plane" />
          <div className="label">NOW BOARDING · CASE STUDY</div>
        </div>
      )}
    </div>
  );
}
