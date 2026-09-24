const GIFTS = [
  {
    id: 1,
    title: "Livre de recettes gourmandes",
    price: 24,
    description: "Un joli livre relié avec des idées saines et réconfortantes.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    link: "https://www.placedeslibraires.fr",
    recipients: ["famille", "amis"]
  },
  {
    id: 2,
    title: "Coffret de thés d'exception",
    price: 35,
    description: "Sélection de thés verts et noirs parfumés en jolies boîtes.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    link: "https://www.palaisdesthes.com",
    recipients: ["famille", "amis"]
  },
  {
    id: 3,
    title: "Montre vintage argentée",
    price: 89,
    description: "Cadran minimaliste, style intemporel avec bracelet en maille milanaise.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    link: "#",
    recipients: ["copain"]
  },
  {
    id: 4,
    title: "Chaussettes douces en laine",
    price: 18,
    description: "Coloris écru, parfaites pour les soirées d'hiver au chaud.",
    image: "https://images.unsplash.com/photo-1582965372486-666324b1a457?auto=format&fit=crop&w=600&q=80",
    link: "#",
    recipients: ["famille", "amis", "copain"]
  }
];

let currentRecipient = "all";
let currentBudget = "all";

function matchBudget(price, budgetFilter) {
  if (budgetFilter === "all") return true;
  if (budgetFilter === "under25") return price < 25;
  if (budgetFilter === "25to60") return price >= 25 && price <= 60;
  if (budgetFilter === "over60") return price > 60;
  return true;
}

function renderGifts() {
  const container = document.getElementById("gifts-grid");
  const countEl = document.getElementById("results-count");

  const filtered = GIFTS.filter(gift => {
    const matchRecip = currentRecipient === "all" || gift.recipients.includes(currentRecipient);
    const matchBudg = matchBudget(gift.price, currentBudget);
    return matchRecip && matchBudg;
  });

  countEl.textContent = `\({filtered.length} idée\){filtered.length > 1 ? "s" : ""} trouvée${filtered.length > 1 ? "s" : ""}`;

  if (filtered.length === 0) {
    container.innerHTML = `✨ Aucune idée ne correspond à ces critères pour l'instant !

`;
return;
}

container.innerHTML = filtered.map(gift => `

${gift.title}
${gift.price} €

${gift.description}

${gift.recipients.map(r => #${r}).join('')}

Voir l'article ↗

`).join("");
}

function setupFilters() {
const recipientBtns = document.querySelectorAll("#filter-recipient .filter-btn");
recipientBtns.forEach(btn => {
btn.addEventListener("click", () => {
recipientBtns.forEach(b => b.classList.remove("active"));
btn.classList.add("active");
currentRecipient = btn.dataset.recipient;
renderGifts();
});
});

const budgetBtns = document.querySelectorAll("#filter-budget .filter-btn");
budgetBtns.forEach(btn => {
btn.addEventListener("click", () => {
budgetBtns.forEach(b => b.classList.remove("active"));
btn.classList.add("active");
currentBudget = btn.dataset.budget;
renderGifts();
});
});
}

document.addEventListener("DOMContentLoaded", () => {
setupFilters();
renderGifts();
})
