"use client";
import { useState } from "react";

const LEADS = [
  { n: "Fatima A.", src: "Bayut", s: "HOT", t: "2 BR · Al Nahda", c: [["in", "Hi, I'm interested in ref. 8737-GwHbTd"], ["out", "Hello! When would you like to move in?"], ["in", "Immediately"], ["sys", "HOT lead · assigned to Shifa"]] },
  { n: "Omar K.", src: "Dubizzle", s: "WARM", t: "Studio · Deira", c: [["in", "Is the studio still available?"], ["out", "Yes. What is your monthly budget?"], ["in", "Within 1 month, around 3,500"], ["sys", "WARM lead · follow-up in 2 hours"]] },
  { n: "Priya N.", src: "uaa.ae", s: "COLD", t: "Shop · Karama", c: [["in", "Just browsing for now"], ["out", "No problem. I can send you new listings each week."], ["sys", "COLD lead · added to weekly nurture"]] },
  { n: "Missed call", src: "Bayut", s: "HOT", t: "Villa · Mirdif", c: [["sys", "Missed call at 02:14"], ["out", "Sorry we missed your call about the villa. Can I help here on WhatsApp?"], ["in", "Yes, can I view it tomorrow?"], ["sys", "HOT lead · viewing requested"]] },
];

const PROJECTS = [
  { name: "UAA Rental Operating System", cat: "ai", shot: "crm", mode: "Independent", where: "Dubai", d: "AI chatbot on WhatsApp, lead CRM and missed-call recovery for Bayut, Dubizzle and website enquiries. Scores each lead and assigns an agent.", t: ["Node.js", "n8n", "WhatsApp Cloud API", "MySQL"] },
  { name: "uaa.ae", cat: "re", shot: "site", mode: "Independent", where: "Dubai", d: "Listings, building pages and enquiry forms for 74 units across 10 buildings, with an admin panel that feeds the CRM.", t: ["Next.js", "Laravel", "Filament"], url: "https://uaa.ae" },
  { name: "Property & accounts ERP", cat: "re", shot: "inventory", mode: "UI demo", where: "Real estate", d: "SaaS-style property management: units, tenants, rent collection and an accounting view designed to connect to Oracle.", t: ["Next.js", "Node.js", "MongoDB", "Oracle"] },
  { name: "Inventory & invoicing", cat: "ops", shot: "inventory", mode: "In-house", where: "Dubai", d: "Products, stock, invoicing, returns and transaction tracking used daily by an operations team.", t: ["Yii", "PHP", "MySQL"] },
  { name: "iPure Herbs", cat: "shop", shot: "store", mode: "Own project", where: "UAE", d: "Headless herbal supplements store with instant search, buy-now-pay-later and international shipping.", t: ["Next.js", "Laravel", "Redis", "Stripe"], url: "https://ipureherbs.org" },
  { name: "AnzGlow", cat: "shop", shot: "store", mode: "My work", where: "UAE", d: "Beauty storefront with bag and checkout, PDF invoices, order emails and orders sent to WhatsApp.", t: ["JavaScript", "Vercel Functions"], url: "https://anzglow.vercel.app/" },
  { name: "Baniyas Oasis Electronics", cat: "shop", shot: "store", mode: "My work", where: "UAE", d: "Electronics store launched solo in 6 days, with Stripe payments and Noon marketplace listings.", t: ["WordPress", "WooCommerce", "Noon"], url: "https://baniyasoasiselectronics.com/" },
  { name: "Let's Organic", cat: "shop", shot: "store", mode: "E-commerce", where: "Online store", d: "Online grocery storefront.", t: ["E-commerce"], url: "https://www.letsorganic.com" },
  { name: "Caravel Qatar", cat: "intl", shot: "store", mode: "Independent", where: "Qatar", d: "Catalog management and storefront development on a large Magento 2 platform.", t: ["Magento 2", "PHP"], url: "https://caravel.qa" },
  { name: "Acer", cat: "intl", shot: "store", mode: "Team work", where: "International", d: "Custom modules, API integrations, upgrades and performance tuning on a high-traffic Magento 2 store.", t: ["Magento 2", "PHP", "MySQL"], url: "https://acer.com" },
  { name: "Proxima", cat: "intl", shot: "site", mode: "Team work", where: "Australia · Indonesia", d: "Real-estate platform powering 64+ agent sites, with mobile-app APIs, chatbot and commission reporting.", t: ["PHP", "REST APIs"], url: "https://www.proxima.com.au/" },
];

const FILTERS = [["all", "All"], ["ai", "AI & automation"], ["re", "Real estate"], ["shop", "E-commerce"], ["intl", "International"], ["ops", "Inventory"]];

function Shot({ v }) {
  if (v === "crm") return (<div className="s"><div className="row"><div className="k">Leads<b>248</b></div><div className="k">HOT<b>41</b></div><div className="k">Reply<b>9s</b></div></div><div className="bars">{[40, 62, 50, 80, 66, 92, 74].map((h, i) => <i key={i} style={{ height: h + "%" }} />)}</div></div>);
  if (v === "inventory") return (<div className="s"><div className="row"><div className="k">Units<b>74</b></div><div className="k">Stock<b>1,240</b></div></div>{[90, 70, 80, 55].map((w, i) => <div key={i} className="row"><div className="ln d" style={{ width: "22%" }} /><div className="ln" style={{ width: w + "%" }} /></div>)}</div>);
  if (v === "site") return (<div className="s"><div className="ln d" style={{ width: "50%", height: 14 }} /><div className="ln" style={{ width: "80%" }} /><div className="row" style={{ flex: 1 }}><div className="tile">Unit</div><div className="tile">Unit</div><div className="tile">Unit</div></div></div>);
  return (<div className="s"><div className="ln d" style={{ width: "40%" }} /><div className="row" style={{ flex: 1 }}><div className="tile">Product</div><div className="tile">Product</div><div className="tile">Product</div></div></div>);
}

function Crm() {
  const [i, setI] = useState(0);
  const lead = LEADS[i];
  return (
    <div className="win"><div className="bar"><i /><i /><i /></div>
      <div className="body crm">
        <div className="list"><h4>New leads · click one</h4>
          {LEADS.map((l, k) => (<button key={l.n} className="lead" aria-pressed={k === i} onClick={() => setI(k)}><span>{l.n}<small>{l.src} · {l.t}</small></span><span className={`tag ${l.s}`}>{l.s}</span></button>))}
        </div>
        <div className="chat"><h4 style={{ padding: 0, border: 0 }}>WhatsApp chat with {lead.n}</h4>
          {lead.c.map(([w, m], k) => <div key={k} className={`m ${w === "in" ? "" : w === "out" ? "me" : "sys"}`}>{m}</div>)}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [f, setF] = useState("all");
  const list = PROJECTS.filter(p => f === "all" || p.cat === f);
  return (<>
    <nav><div className="wrap"><a className="logo" href="#top">Ancymol KK</a>
      <div className="links"><a href="#work">Work</a><a href="#stack">Stack</a><a href="#services">Services</a><a href="#contact">Contact</a></div>
      <a className="btn solid" href="https://wa.me/971561835793">WhatsApp me</a></div></nav>

    <header className="hero" id="top"><div className="wrap">
      <div>
        <h1>I build the systems that answer your leads and run your stores.</h1>
        <p className="lead">AI Automation Engineer and Full Stack Developer in Dubai. Lead CRMs, WhatsApp automation, e-commerce and inventory software for real estate and retail.</p>
        <div className="cta"><a className="btn solid" href="#work">See projects</a><a className="btn ghost" href="/Ancymol_KK_CV.pdf">Download CV</a></div>
        <div className="facts"><div><b>14</b><span>projects shipped</span></div><div><b>9</b><span>e-commerce stores</span></div><div><b>24/7</b><span>automated lead replies</span></div><div><b>4 yrs</b><span>India + UAE</span></div></div>
      </div>
      <Crm />
    </div></header>

    <section id="work"><div className="wrap">
      <div className="sh"><h2>Selected work</h2><p>Real estate CRMs, online stores and enterprise platforms, from solo builds to team projects.</p></div>
      <div className="filters">{FILTERS.map(([k, l]) => <button key={k} className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}</div>
      <div className="grid">{list.map(p => (
        <article className="card" key={p.name}><div className="shot"><Shot v={p.shot} /></div>
          <div className="info"><div className="meta"><span>{p.mode}</span><span>{p.where}</span></div><h3>{p.name}</h3><p>{p.d}</p>
            <div className="stack">{p.t.map(t => <span key={t}>{t}</span>)}</div>
            {p.url && <a className="v" href={p.url} target="_blank" rel="noreferrer">Visit site</a>}</div></article>))}</div>
    </div></section>

    <section className="alt" id="stack"><div className="wrap">
      <div className="sh"><h2>Where I'm strongest, and what else I use</h2><p>Deep in PHP and JavaScript, with working knowledge across the rest so I can connect any system.</p></div>
      <div className="skills">
        <div><h3>Expert</h3><p>PHP, Laravel, Magento 2, Node.js, Next.js, HTML, CSS, JavaScript, MongoDB, MySQL, REST APIs</p></div>
        <div><h3>Automation</h3><p>n8n, Twilio, WhatsApp Cloud API, webhooks, CRM pipelines, Bayut and Dubizzle lead capture</p></div>
        <div><h3>Working knowledge</h3><p>Python, .NET, Java, Oracle accounting and ERP integrations, Yii</p></div>
      </div></div></section>

    <section id="services"><div className="wrap">
      <div className="sh"><h2>What I can do for your business</h2></div>
      <div className="svc">
        <div><h3>Lead CRM and WhatsApp automation</h3><p>Capture, qualify, score and assign leads automatically.</p></div>
        <div><h3>E-commerce and marketplaces</h3><p>Online stores plus Noon and Amazon product listings.</p></div>
        <div><h3>Inventory and ERP</h3><p>Stock, invoicing and property management software.</p></div>
        <div><h3>Meta Ads</h3><p>Campaigns, audiences and tracking tied back to your CRM.</p></div>
      </div></div></section>

    <footer id="contact"><div className="wrap">
      <h2>Need a lead system or a store that sells?</h2><p>Immediate joiner with a UAE employment visa. I can walk you through any project live.</p>
      <div className="cta"><a className="btn solid" href="https://wa.me/971561835793">Message on WhatsApp</a><a className="btn" href="mailto:ancymol.softwaredev@gmail.com">ancymol.softwaredev@gmail.com</a></div>
      <small>© 2026 Ancymol KK · Dubai, UAE</small></div></footer>
  </>);
}
