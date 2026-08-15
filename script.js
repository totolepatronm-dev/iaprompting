// Afficher/masquer les champs "Autre" pour les sélecteurs
function toggleCustomInput(selectId, targetGroupId) {
  const select = document.getElementById(selectId);
  const targetGroup = document.getElementById(targetGroupId);
  
  if (select.value === 'Autre') {
    targetGroup.classList.remove('hidden');
    targetGroup.querySelector('input').focus();
  } else {
    targetGroup.classList.add('hidden');
  }
}

// Afficher/masquer les champs "Autre" pour les cases à cocher
function toggleCheckboxCustomInput(checkboxId, targetGroupId) {
  const checkbox = document.getElementById(checkboxId);
  const targetGroup = document.getElementById(targetGroupId);
  
  if (checkbox.checked) {
    targetGroup.classList.remove('hidden');
    targetGroup.querySelector('input').focus();
  } else {
    targetGroup.classList.add('hidden');
  }
}

// Génération du Prompt
document.getElementById('generateBtn').addEventListener('click', () => {

  // 1. Format
  let category = document.getElementById('category').value;
  if (category === 'Autre') category = document.getElementById('customCategory').value || 'Format Web Sur-Mesure';

  // 2. Activité
  let activity = document.getElementById('activity').value;
  if (activity === 'Autre') activity = document.getElementById('customActivity').value || 'Activité spécifique';

  // 3. Style Visuel
  let style = document.getElementById('style').value;
  if (style === 'Autre') style = document.getElementById('customStyle').value || 'Style personnalisé';

  // 4. Couleurs
  let colors = document.getElementById('colorTheme').value;
  if (colors === 'Autre') colors = document.getElementById('customColor').value || 'Palette sur-mesure';

  // 5. Réseaux Sociaux (NOUVEAU)
  const ytUrl = document.getElementById('youtubeUrl').value.trim();
  const tiktokUrl = document.getElementById('tiktokUrl').value.trim();
  const instaUrl = document.getElementById('instagramUrl').value.trim();

  let socialDetails = [];
  if (ytUrl) socialDetails.push(`YouTube (${ytUrl}) : Inclure un lecteur vidéo intégré (iFrame / Feed) esthétique`);
  if (tiktokUrl) socialDetails.push(`TikTok (${tiktokUrl}) : Inclure une section feed vidéo / cartes interactives TikTok`);
  if (instaUrl) socialDetails.push(`Instagram (${instaUrl}) : Inclure un carrousel / galerie d'images style Instagram avec badges direct link`);

  const socialText = socialDetails.length > 0 
    ? socialDetails.join(' | ') 
    : 'Aucune URL fournie, mais prévoir un footer avec liens sociaux stylisés (YouTube, TikTok, Instagram).';

  // 6. Effets Visuels
  let effects = [];
  document.querySelectorAll('.effect:checked').forEach(cb => {
    if (cb.value !== 'Autre') effects.push(cb.value);
  });
  if (document.getElementById('effectOtherCheck').checked) {
    const customEff = document.getElementById('customEffect').value;
    if (customEff) effects.push(customEff);
  }
  const effectsText = effects.length > 0 ? effects.join(', ') : 'Animations fluides CSS standard';

  // 7. Fonctionnalités / Modules
  let features = [];
  document.querySelectorAll('.feature:checked').forEach(cb => {
    if (cb.value !== 'Autre') features.push(cb.value);
  });
  if (document.getElementById('featureOtherCheck').checked) {
    const customFeat = document.getElementById('customFeature').value;
    if (customFeat) features.push(customFeat);
  }
  const featuresText = features.length > 0 ? features.join(', ') : 'Formulaire de contact dynamique';

  // 8. Objectif
  const goal = document.getElementById('goal').value || 'Mettre en valeur les services et convertir les visiteurs';

  // Contrôle
  if (!category || !activity || !style) {
    alert('Merci de remplir au moins la catégorie, le secteur et le style visuel !');
    return;
  }

  // Prompt Complet Optimisé
  const finalPrompt = `Agis comme un Développeur Web Fullstack Senior & Lead Designer UI/UX.

Génère le code complet, moderne, élégant et 100% responsive pour le projet web suivant :

📌 FORMAT DE SITE : ${category}
🎯 SECTEUR D'ACTIVITÉ : ${activity}
🎨 STYLE VISUEL & UX : ${style}
🎨 PALETTE DE COULEURS : ${colors}
📱 INTÉGRATION RÉSEAUX SOCIAUX & MÉDIAS : ${socialText}
✨ EFFETS VISUELS & ANIMATIONS : ${effectsText}
⚡ MODULES & FONCTIONNALITÉS : ${featuresText}
🚀 OBJECTIF & CALL-TO-ACTION : ${goal}

---

📋 CONTRAT TECHNIQUE EXIGEANT :
1. Structure en 3 Fichiers DISTINCTS : index.html, style.css et script.js.
2. HTML5 Sémantique : Structure propre avec <header>, <main>, <section>, <footer> et balises SEO OpenGraph.
3. Intégration Médias Réseaux : Intègre des cartes médias modernes avec accès direct et pré-visualisation dynamique pour les réseaux spécifiés.
4. CSS3 Ultra-Moderne : CSS Variables, Flexbox/Grid, Glassmorphism, effets au survol, animations fluides et Responsive Mobile-First.
5. JavaScript Vanille : Interaction fluide, filtres/animations dynamiques et gestion d'événements sans dépendances lourdes.
6. Typographie & Contrastes : Utilise des polices Google Fonts lisibles et adaptées au style visuel choisi.`;

  // Affichage
  const promptOutput = document.getElementById('promptOutput');
  promptOutput.value = finalPrompt;

  // Calcul du nombre de mots
  const wordCount = finalPrompt.trim().split(/\s+/).length;
  document.getElementById('wordCount').innerText = `${wordCount} mots`;

  const resultContainer = document.getElementById('resultContainer');
  resultContainer.classList.remove('hidden');
  resultContainer.scrollIntoView({ behavior: 'smooth' });
});

// Copier dans le presse-papier
document.getElementById('copyBtn').addEventListener('click', () => {
  const output = document.getElementById('promptOutput');
  output.select();
  navigator.clipboard.writeText(output.value);

  const copyBtn = document.getElementById('copyBtn');
  copyBtn.innerHTML = `<i data-lucide="check"></i> Copié !`;
  copyBtn.style.background = '#25f4ee';
  copyBtn.style.color = '#000';

  setTimeout(() => {
    copyBtn.innerHTML = `<i data-lucide="copy"></i> Copier le Prompt`;
    copyBtn.style.background = '#25f4ee';
    copyBtn.style.color = '#000';
    lucide.createIcons();
  }, 2000);
});

// Recharger les icônes lors du reset du formulaire
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('resultContainer').classList.add('hidden');
  document.querySelectorAll('.sub-input').forEach(el => el.classList.add('hidden'));
});
