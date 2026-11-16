// Builds the page from the files in the content/ folder.
// You normally do not need to edit this file to change the site's text.

// ---------- Small helpers ----------

// Creates an element: el("p", "class-name", "text")
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

// Accepts one string or a list of strings and returns a list of <p> elements.
function paragraphs(value) {
  if (!value) return [];
  var list = Array.isArray(value) ? value : [value];
  return list
    .filter(function (text) { return text; })
    .map(function (text) { return el("p", "", text); });
}

function bulletList(points) {
  if (!points || points.length === 0) return null;
  var ul = el("ul", "points");
  points.forEach(function (point) { ul.appendChild(el("li", "", point)); });
  return ul;
}

function appendAll(parent, children) {
  children.forEach(function (child) { if (child) parent.appendChild(child); });
  return parent;
}

function externalLink(label, url, className) {
  var a = el("a", className || "", label);
  a.href = url;
  if (url.indexOf("mailto:") !== 0) {
    a.target = "_blank";
    a.rel = "noopener";
  }
  return a;
}

function byId(id) { return document.getElementById(id); }

// ---------- Sections ----------

function renderSite() {
  var site = content.site || {};
  if (site.tabTitle) document.title = site.tabTitle;
  byId("nav-name").textContent = site.name || "";
  byId("footer-text").textContent = site.footer || "";
}

function renderBio() {
  var bio = content.bio;
  if (!bio) return;
  var text = byId("bio-text");
  text.appendChild(el("p", "hero-greeting", bio.greeting));
  text.appendChild(el("h1", "", bio.name));
  text.appendChild(el("p", "hero-tagline", bio.tagline));
  appendAll(text, paragraphs(bio.paragraphs));

  if (bio.image) {
    var img = el("img");
    img.src = bio.image;
    img.alt = bio.imageAlt || "";
    byId("bio-picture").appendChild(img);
  }
}

function renderTechnologies() {
  var tech = content.technologies;
  if (!tech) return;
  var root = byId("technologies-content");
  appendAll(root, paragraphs(tech.intro));
  var grid = el("div", "tech-grid");
  (tech.groups || []).forEach(function (group) {
    var box = el("div", "tech-group");
    box.appendChild(el("h3", "", group.title));
    var tags = el("ul", "tags");
    (group.items || []).forEach(function (item) { tags.appendChild(el("li", "", item)); });
    box.appendChild(tags);
    grid.appendChild(box);
  });
  root.appendChild(grid);
}

function renderExperience() {
  var root = byId("experience-content");
  (content.experience || []).forEach(function (job) {
    var item = el("article", "timeline-item");
    item.appendChild(el("p", "meta", [job.dates, job.location].filter(Boolean).join(" · ")));
    var title = el("h3", "", job.role);
    if (job.company) {
      title.appendChild(document.createTextNode(" "));
      title.appendChild(el("span", "at", "at " + job.company));
    }
    item.appendChild(title);
    appendAll(item, paragraphs(job.description));
    appendAll(item, [bulletList(job.points)]);
    root.appendChild(item);
  });
}

function renderProjects() {
  var root = byId("projects-content");
  (content.projects || []).forEach(function (project) {
    var card = el("article", "card");
    if (project.image) {
      var img = el("img", "card-image");
      img.src = project.image;
      img.alt = project.title + " picture";
      img.loading = "lazy";
      card.appendChild(img);
    }
    var body = el("div", "card-body");
    if (project.dates) body.appendChild(el("p", "meta", project.dates));
    body.appendChild(el("h3", "", project.title));
    appendAll(body, paragraphs(project.description));
    appendAll(body, [bulletList(project.points)]);
    if (project.links && project.links.length > 0) {
      var links = el("div", "card-links");
      project.links.forEach(function (link) {
        links.appendChild(externalLink(link.label + " ↗", link.url, "button-link"));
      });
      body.appendChild(links);
    }
    card.appendChild(body);
    root.appendChild(card);
  });
}

// Used for both Education and Awards: title, issuer, optional date and description.
function renderEntries(rootId, entries) {
  var root = byId(rootId);
  (entries || []).forEach(function (entry) {
    var item = el("article", "entry");
    var meta = [entry.dates || entry.date, entry.location].filter(Boolean).join(" · ");
    if (meta) item.appendChild(el("p", "meta", meta));
    item.appendChild(el("h3", "", entry.title));
    if (entry.issuer) item.appendChild(el("p", "issuer", entry.issuer));
    appendAll(item, paragraphs(entry.description));
    if (entry.link) {
      var p = el("p");
      p.appendChild(externalLink("Website ↗", entry.link, "text-link"));
      item.appendChild(p);
    }
    root.appendChild(item);
  });
}

function renderHobbies() {
  var root = byId("hobbies-content");
  (content.hobbies || []).forEach(function (hobby) {
    var block = el("article", "hobby");
    block.appendChild(el("h3", "", hobby.title));
    var text = el("div", "prose");
    appendAll(text, paragraphs(hobby.paragraphs));
    block.appendChild(text);

    var carousel = el("div");
    block.appendChild(carousel);
    root.appendChild(block);

    var images = (hobby.images || []).map(function (image) {
      // An image can be written as { file, alt } or just as "file-name.jpg".
      var file = typeof image === "string" ? image : image.file;
      var alt = typeof image === "string" ? hobby.title + " photo" : image.alt;
      return { src: (hobby.folder || "") + file, alt: alt };
    });
    createCarousel(carousel, images);
  });
}

function renderFuture() {
  var future = content.future;
  if (!future) return;
  appendAll(byId("future-content"), paragraphs(future.paragraphs));
}

var CONTACT_ICONS = {
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-1.9 3.76-1.9 4.02 0 4.76 2.5 4.76 5.75V21h-4v-5.1c0-1.22-.02-2.78-1.8-2.78-1.8 0-2.08 1.32-2.08 2.69V21h-4z"/></svg>'
};

function renderContact() {
  var contact = content.contact;
  if (!contact) return;
  byId("contact-intro").textContent = contact.intro || "";
  var root = byId("contact-links");
  (contact.links || []).forEach(function (link) {
    var a = externalLink("", link.url, "contact-link");
    a.setAttribute("aria-label", link.label);
    a.title = link.label;
    a.innerHTML = CONTACT_ICONS[link.icon] || "";
    a.appendChild(el("span", "", link.label));
    root.appendChild(a);
  });
}

// ---------- Light / dark mode ----------

function setupThemeToggle() {
  byId("theme-toggle").addEventListener("click", function () {
    var root = document.documentElement;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

// ---------- Highlight the current section in the nav bar ----------

function setupActiveNav() {
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  function update() {
    var marker = window.scrollY + window.innerHeight * 0.3;
    var current = 0;
    sections.forEach(function (section, index) {
      if (section && section.offsetTop <= marker) current = index;
    });
    // At the very bottom of the page the last section is the current one.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    links.forEach(function (link, index) {
      link.classList.toggle("is-current", index === current);
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

// ---------- Start ----------

renderSite();
renderBio();
renderTechnologies();
renderExperience();
renderProjects();
renderEntries("education-content", content.education);
renderEntries("awards-content", content.awards);
renderHobbies();
renderFuture();
renderContact();
setupThemeToggle();
setupActiveNav();
