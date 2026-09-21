# Proxi Dombasle — site vitrine

Site one-page statique (HTML/CSS/JS, sans dépendances), recréé à l'identique du site existant `proxy-super-dombasle.fr`.

## Structure

```
index.html                          page principale
css/style.css                       feuille de style
js/script.js                        interactions (menu, horaires, galerie, cookies)
legal/mentions-legales.html
legal/politique-confidentialite.html
legal/gestion-cookies.html
legal/legal.css
favicon.svg
robots.txt
sitemap.xml
```

## Déploiement

Ce site est 100% statique : il peut être déployé tel quel sur n'importe quel hébergement (OVH, Netlify, Vercel, GitHub Pages...). Il suffit d'uploader l'ensemble du dossier à la racine du domaine.

## À faire avant mise en ligne

1. **Images de la galerie** : les images pointent actuellement vers les fichiers hébergés sur l'ancien site (`proxy-super-dombasle.fr/wp-content/uploads/...`). Pour plus de fiabilité à long terme, téléchargez ces images et hébergez-les vous-même dans un dossier `images/` du nouveau site, puis mettez à jour les balises `<img>` et `<a>` correspondantes dans `index.html`.
2. **Mentions légales** : complétez le numéro SIREN/SIRET, la forme juridique et l'hébergeur dans `legal/mentions-legales.html` (marqué `legal-note`).
3. **Domaine / canonical** : les balises `canonical` et Open Graph pointent vers `https://www.proxi-dombasle.fr/` — à ajuster si le nom de domaine final diffère.

## Fonctionnalités incluses

- Navigation fixe avec ancre vers chaque section, menu hamburger sur mobile
- Statut « ouvert / fermé » calculé automatiquement selon l'heure réelle et les horaires renseignés
- Galerie avec visionneuse (lightbox) navigable au clavier
- Section contact centrée sur l'appel téléphonique (numéro visible et cliquable partout sur le site), sans formulaire
- Bandeau de consentement cookies (accepter / refuser)
- Bouton d'appel fixe en bas d'écran sur mobile
- Données structurées `GroceryStore` (schema.org) pour le SEO local
- `robots.txt` et `sitemap.xml`
