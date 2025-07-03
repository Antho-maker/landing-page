# Zazoo Landing Page - Version Statique

Ce projet contient la landing page statique de Zazoo, optimisée pour GitHub Pages.

## 🚀 Déploiement GitHub Pages

### 1. Configuration du dépôt
```bash
git add .
git commit -m "Conversion en site statique pour GitHub Pages"
git push origin main
```

### 2. Activation GitHub Pages
1. Allez dans **Settings** de votre dépôt GitHub
2. Naviguez vers **Pages** dans le menu latéral
3. Sélectionnez **Deploy from a branch**
4. Choisissez **main** comme branche source
5. Sélectionnez **/ (root)** comme dossier
6. Cliquez sur **Save**

### 3. Accès au site
Votre site sera disponible à l'adresse :
```
https://[votre-username].github.io/[nom-du-repo]
```

## 📁 Structure du projet

```
/
├── index.html              # Page principale (statique)
├── assets/                 # Ressources statiques
│   ├── css/               # Feuilles de style
│   ├── js/                # Scripts JavaScript
│   ├── images/            # Images (PNG, JPG)
│   ├── videos/            # Animations MP4
│   └── fonts/             # Polices personnalisées
├── backup-ghost/          # Sauvegarde des fichiers serveur
│   ├── server.js          # Serveur Node.js original
│   ├── *.hbs              # Templates Handlebars
│   └── package.json       # Dépendances Node.js
└── README.md              # Ce fichier

```

## 🔧 Conversion effectuée

✅ **Actions réalisées :**
- Fusion des templates `default-landing.hbs` + `landing2.hbs` → `index.html`
- Sauvegarde des fichiers serveur dans `backup-ghost/`
- Conservation des assets dans leur structure originale
- Suppression des dépendances côté serveur

✅ **Compatibilité GitHub Pages :**
- Site entièrement statique (HTML/CSS/JS)
- Images optimisées (~60 MB)
- Animations MP4 légères (~30 MB)
- Aucune dépendance serveur

## 🛠️ Développement local

Pour tester localement :
```bash
# Serveur simple avec Python
python3 -m http.server 8000

# Ou avec Node.js (si installé)
npx serve .

# Accès : http://localhost:8000
```

## 📱 Fonctionnalités

- ✅ Responsive design
- ✅ Animations CSS/JS avec GSAP
- ✅ Vidéos MP4 en boucle (scrolly stories)
- ✅ Boutons App Store/Play Store
- ✅ Google Fonts
- ✅ Favicon personnalisé
- ✅ FAQ interactive
- ✅ Slider de témoignages

## 🔄 Retour au serveur Node.js

Pour revenir à la version serveur :
```bash
# Restaurer les fichiers
cp backup-ghost/* .

# Installer les dépendances
npm install

# Lancer le serveur
npm start
```

---

**Note :** La version statique est identique à la version serveur niveau visuel et fonctionnel. 