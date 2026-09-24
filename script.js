// 1. TA BASE DE DONNÉES DE CADEAUX
// Dans recipients, utilise : "tres-proche", "proche", "connaissance", "lointain"
const GIFTS = [
  {
    id: 1,
    title: "Livre de recettes gourmandes",
    price: 24,
    description: "Un joli livre relié avec des idées saines et réconfortantes.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    link: "https://www.placedeslibraires.fr",
    recipients: ["tres-proche", "proche", "connaissance"]
  },
  {
    id: 2,
    title: "Coffret de thés d'exception",
    price: 35,
    description: "Sélection de thés parfumés en jolies boîtes métalliques.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    link: "https://www.palaisdesthes.com",
    recipients: ["tres-proche", "proche"]
  },
  {
    id: 3,
    title: "Montre vintage argentée",
    price: 89,
    description: "Cadran minimaliste, style intemporel avec bracelet en maille milanaise.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    link: "#",
    recipients: ["tres-proche"]
  },
  {
    id: 4,
    title: "Chaussettes douces en laine",
    price: 18,
    description: "Coloris écru, parfaites pour les soirées d'hiver au chaud.",
    image: "https://images.unsplash.com/photo-1582965372486-666324b1a457?auto=format&fit=crop&w=600&q=80",
    link: "#",
    recipients: ["tres-proche", "proche", "connaissance", "lointain"]
  }
];

let currentRecipient = "all";
let currentBudget = "all";

// 2. CORRESPONDANCE AVEC TES BOUTONS DE BUDGET
function matchBudget(price, budgetFilter) {
  if (budgetFilter === "all") return true;
  if (budgetFilter === "low") return price < 25;                  // J'ai pas de thunes sorry (< 25 €)
  if (budgetFilter === "mid") return price >= 25 && price <= 60;  // À l'aise financièrement (25 - 60 €)
  if (budgetFilter === "high") return price > 60;                 // Quand on aime on ne compte pas (> 60 €)
  return true;
}

// 3. AFFICHAGE DES CARTES
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
    container.innerHTML = `
