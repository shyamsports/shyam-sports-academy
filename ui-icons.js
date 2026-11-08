/* Shyam Sports Academy — semantic icon system
   Visual-only enhancement. Does not alter Firebase or academy workflows. */
(() => {
  "use strict";
  const pageIcons = {
    overview: ["layout-dashboard", "blue"],
    coaches: ["user-round-cog", "green"],
    students: ["graduation-cap", "blue"],
    sports: ["trophy", "orange"],
    locations: ["map-pin", "orange"],
    batches: ["layers", "blue"],
    schedule: ["calendar-days", "blue"],
    groups: ["messages-square", "green"],
    templates: ["message-square-text", "blue"],
    attendance: ["clipboard-check", "green"],
    gps: ["map-pinned", "orange"],
    excel: ["file-spreadsheet", "green"],
    reports: ["chart-no-axes-combined", "blue"],
    corrections: ["clipboard-pen-line", "red"],
    settings: ["settings", "slate"]
  };
  const sportIcons = {
    "skating": ["person-standing", "blue"],
    "badminton": ["trophy", "green"],
    "chess": ["brain", "blue"],
    "rubik's cube": ["blocks", "orange"],
    "robotics": ["bot", "blue"]
  };
  const statIcons = {
    "total coaches": ["users", "green"],
    "approved coaches": ["user-round-check", "green"],
    "pending approvals": ["clock-3", "orange"],
    "rejected accounts": ["user-round-x", "red"],
    "removed coaches": ["user-round-minus", "slate"],
    "total students": ["graduation-cap", "blue"],
    "active batches": ["layers", "blue"],
    "today's gps events": ["map-pin", "orange"]
  };
  function iconMarkup(name) {
    return '<i data-lucide="' + name + '" aria-hidden="true"></i>';
  }
  function paint(element, name, tone) {
    if (!element) return;
    element.dataset.iconTone = tone || "blue";
    element.innerHTML = iconMarkup(name);
  }
  function init() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const match = (link.getAttribute("onclick") || "").match(/showPage\('([^']+)'/);
      const config = match && pageIcons[match[1]];
      const holder = link.querySelector(".nav-icon");
      if (config && holder) paint(holder, config[0], config[1]);
    });
    document.querySelectorAll(".stat-card").forEach((card) => {
      const label = (card.querySelector(".stat-label")?.textContent || "").trim().toLowerCase();
      const config = statIcons[label];
      const holder = card.querySelector(".stat-icon");
      if (config && holder) paint(holder, config[0], config[1]);
    });
    document.querySelectorAll(".quick").forEach((button) => {
      const match = (button.getAttribute("onclick") || "").match(/showPage\('([^']+)'/);
      const config = match && pageIcons[match[1]];
      const holder = button.querySelector("span");
      if (config && holder) paint(holder, config[0], config[1]);
    });
    document.querySelectorAll(".sport-card").forEach((card) => {
      const key = (card.querySelector("h3")?.textContent || "").trim().toLowerCase();
      const config = sportIcons[key];
      const holder = card.querySelector(".sport-icon");
      if (config && holder) paint(holder, config[0], config[1]);
    });
    document.querySelectorAll(".nav-item[data-section]").forEach((button) => {
      const section = button.dataset.section;
      const names = {home:["house","blue"],attendance:["clipboard-check","green"],messages:["messages-square","orange"],summary:["chart-no-axes-combined","blue"]};
      const config = names[section];
      const holder = button.querySelector("span");
      if (config && holder) paint(holder, config[0], config[1]);
    });
    const headingRules = [
      ["dashboard overview", "layout-dashboard", "blue"],
      ["coach management", "user-round-cog", "green"],
      ["student management", "graduation-cap", "blue"],
      ["sports management", "trophy", "orange"],
      ["location management", "map-pin", "orange"],
      ["batch", "layers", "blue"],
      ["schedule", "calendar-days", "blue"],
      ["attendance", "clipboard-check", "green"],
      ["gps", "map-pinned", "orange"],
      ["reports", "chart-no-axes-combined", "blue"],
      ["correction", "clipboard-pen-line", "red"],
      ["settings", "settings", "slate"],
      ["parent group messages", "messages-square", "orange"],
      ["daily work summary", "chart-no-axes-combined", "blue"],
      ["whatsapp group", "messages-square", "green"],
      ["message template", "message-square-text", "blue"],
      ["excel management", "file-spreadsheet", "green"],
      ["sports management", "trophy", "orange"],
      ["gps monitoring", "map-pinned", "orange"],
      ["dashboard overview", "layout-dashboard", "blue"],
      ["student attendance", "clipboard-check", "green"],
      ["class progress", "chart-no-axes-combined", "blue"],
      ["my assigned batches", "layers", "blue"]
    ];
    document.querySelectorAll(".page-heading h1,.section-heading h3").forEach((heading) => {
      if (heading.querySelector("[data-lucide]")) return;
      const label = (heading.textContent || "").trim().toLowerCase();
      const rule = headingRules.find((item) => label.includes(item[0]));
      if (!rule) return;
      const mark = document.createElement("span");
      mark.className = "section-heading-icon";
      paint(mark, rule[1], rule[2]);
      heading.prepend(mark);
    });
    document.querySelectorAll(".sport-name").forEach((heading) => {
      if (heading.querySelector("[data-lucide]")) return;
      const label = (heading.textContent || "").trim().toLowerCase();
      const config = Object.entries(sportIcons).find(([key]) => label.includes(key));
      if (!config) return;
      const mark = document.createElement("span");
      mark.className = "section-heading-icon";
      paint(mark, config[1][0], config[1][1]);
      heading.prepend(mark);
    });
    document.querySelectorAll(".login-card h1").forEach((heading) => {
      if (heading.querySelector("[data-lucide]")) return;
      const label = heading.textContent.toLowerCase();
      const mark = document.createElement("span");
      mark.className = "form-heading-icon";
      paint(mark, label.includes("admin") ? "shield-check" : label.includes("registration") ? "user-round-plus" : "user-round", label.includes("registration") ? "green" : "blue");
      heading.prepend(mark);
    });
    document.querySelectorAll(".contact-actions a,.contact-grid a").forEach((link) => {
      if (link.querySelector("[data-lucide]")) return;
      const href = (link.getAttribute("href") || "").toLowerCase();
      const name = href.startsWith("tel:") ? "phone" : href.startsWith("sms:") ? "message-square" : "message-circle";
      const mark = document.createElement("span");
      mark.className = "contact-icon";
      paint(mark, name, href.startsWith("tel:") ? "green" : "blue");
      link.prepend(mark);
    });
    document.querySelectorAll(".portal-card").forEach((card) => {
      const heading = card.querySelector("h3");
      if (!heading || heading.querySelector("[data-lucide]")) return;
      const label = heading.textContent.toLowerCase();
      const name = label.includes("admin") ? "shield-check" : "user-round";
      const tone = label.includes("admin") ? "blue" : "green";
      const mark = document.createElement("span");
      mark.className = "portal-heading-icon";
      paint(mark, name, tone);
      heading.prepend(mark);
    });
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({attrs:{"stroke-width":2.1}});
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
