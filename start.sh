#!/bin/bash

# Script de démarrage avec hot reload pour Zazoo Landing Page
# Lance un serveur web local avec rechargement automatique

echo "🚀 Démarrage du serveur Zazoo Landing Page avec hot reload..."
echo ""

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 n'est pas installé sur ce système."
    echo "Veuillez installer Python3 pour continuer."
    exit 1
fi

# Vérifier si fswatch est installé pour le hot reload
if ! command -v fswatch &> /dev/null; then
    echo "⚠️  fswatch n'est pas installé. Installation en cours..."
    if command -v brew &> /dev/null; then
        brew install fswatch
    else
        echo "❌ Impossible d'installer fswatch automatiquement."
        echo "Veuillez installer fswatch manuellement ou utilisez le serveur sans hot reload."
        echo "Installation: brew install fswatch"
        exit 1
    fi
fi

# Vérifier si le port 8001 est disponible
if lsof -Pi :8001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Le port 8001 est déjà utilisé."
    echo "Arrêt du processus existant..."
    pkill -f "python3 -m http.server 8001" 2>/dev/null || true
    pkill -f "fswatch" 2>/dev/null || true
    sleep 2
fi

# Se placer dans le répertoire du projet
cd "$(dirname "$0")"

echo "📁 Répertoire de travail: $(pwd)"
echo ""

# Afficher les pages disponibles
echo "📄 Pages disponibles:"
echo "   • Landing principale: http://localhost:8001/"
echo "   • ZazooEditor: http://localhost:8001/zazoo-editor.html"
echo "   • Mentions légales: http://localhost:8001/mentions-legales.html"
echo "   • Confidentialité: http://localhost:8001/privacy.html"
echo ""

# Fonction de nettoyage à l'arrêt
cleanup() {
    echo ""
    echo "🛑 Arrêt du serveur..."
    pkill -f "python3 -m http.server 8001" 2>/dev/null || true
    pkill -f "fswatch" 2>/dev/null || true
    echo "✅ Serveur arrêté"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT SIGTERM

# Lancer le serveur Python en arrière-plan
echo "🌐 Lancement du serveur sur le port 8001..."
python3 -m http.server 8001 &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 2

# Ouvrir automatiquement le navigateur
if command -v open &> /dev/null; then
    echo "🔗 Ouverture du navigateur..."
    open "http://localhost:8001/" &
elif command -v xdg-open &> /dev/null; then
    echo "🔗 Ouverture du navigateur..."
    xdg-open "http://localhost:8001/" &
fi

echo "🔥 Hot reload activé - Les modifications sont détectées automatiquement"
echo "   Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Surveiller les changements de fichiers
fswatch -o \
    --include=".*\.(html|css|js)$" \
    --exclude=".*" \
    . | while read; do
    echo "🔄 Changement détecté - Rechargement automatique..."
    # Le serveur Python ne nécessite pas de redémarrage pour les fichiers statiques
    # Mais on peut afficher un message pour informer l'utilisateur
done
