# HelpDesk Pro - Frontend

## 📋 Description

Frontend de la plateforme HelpDesk Pro développé avec Next.js 15 et HeroUI. Cette application offre une interface moderne et performante pour la gestion de tickets de support et la présentation des services IT de l'entreprise.

## 🚀 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **HeroUI** - Librairie de composants UI moderne
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations
- **Lucide React** - Icônes

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Git

### Étapes d'installation

1. Cloner le repository

```bash
git clone [url-du-repo]
cd helpdesk-frontend
```

2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

3. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du projet

```
src/
├── app/                    # Pages et layouts Next.js
│   ├── (public)/          # Pages publiques
│   ├── (auth)/            # Pages d'authentification
│   └── dashboard/         # Dashboard utilisateur
├── components/            # Composants réutilisables
│   ├── layout/           # Header, Footer, Sidebar
│   ├── features/         # Composants métier
│   └── ui/              # Composants UI personnalisés
├── lib/                  # Utilitaires et configuration
└── styles/              # Styles globaux
```

## 🎨 Personnalisation

### Couleurs

Les couleurs peuvent être modifiées dans `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#0070F3',
    foreground: '#FFFFFF',
  },
  // ...
}
```

### Composants HeroUI

Pour ajouter de nouveaux composants HeroUI:

```bash
npm install @heroui/[nom-du-composant]
```

## 📱 Pages principales

### Zone publique

- `/` - Page d'accueil
- `/services` - Liste des services
- `/contact` - Page de contact
- `/login` - Connexion
- `/register` - Inscription

### Zone privée (Dashboard)

- `/dashboard` - Vue d'ensemble
- `/dashboard/tickets` - Gestion des tickets
- `/dashboard/tickets/new` - Créer un ticket
- `/dashboard/profile` - Profil utilisateur
- `/dashboard/stats` - Statistiques

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer la production
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🚦 État du projet

### ✅ Complété

- Configuration HeroUI et layouts
- Header et Footer responsive
- Page d'accueil avec toutes les sections
- Page services avec filtres
- Page contact avec formulaire
- Layouts pour auth et dashboard

### 📝 À faire

- Pages d'authentification (login/register)
- Dashboard et ses sous-pages
- Intégration API
- Gestion d'état global
- Tests unitaires

## 🔐 Variables d'environnement

Créer un fichier `.env.local` avec:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=HelpDesk Pro
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème:

- Email: dev@helpdeskpro.com
- Documentation: [docs.helpdeskpro.com](https://docs.helpdeskpro.com)

## 📄 Licence

Ce projet est sous licence propriétaire. Tous droits réservés.
