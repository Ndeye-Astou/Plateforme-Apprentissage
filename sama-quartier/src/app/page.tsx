import Link from 'next/link'
import { MessageSquare, Calendar, MapPin, Store, Users, Heart, Shield, Zap } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Annonces de Quartier',
      description: 'Vendez, donnez, échangez avec vos voisins en toute confiance'
    },
    {
      icon: Calendar,
      title: 'Événements Locaux',
      description: 'Organisez et participez aux événements de votre quartier'
    },
    {
      icon: MapPin,
      title: 'Carte Interactive',
      description: 'Découvrez ce qui se passe autour de vous'
    },
    {
      icon: Store,
      title: 'Commerces Locaux',
      description: 'Trouvez et soutenez les commerces de votre quartier'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Connectez-vous avec vos voisins et créez des liens'
    },
    {
      icon: Heart,
      title: 'Entraide',
      description: 'Demandez et offrez de l\'aide à votre communauté'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Plateforme sécurisée avec vérification des utilisateurs'
    },
    {
      icon: Zap,
      title: 'Rapide',
      description: 'Interface moderne et rapide, optimisée pour mobile'
    },
    {
      icon: Heart,
      title: '100% Sénégalais',
      description: 'Conçu par et pour les Sénégalais'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sama Quartier
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            La plateforme qui connecte les habitants d'un même quartier, immeuble ou ville au Sénégal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Rejoindre la communauté
            </Link>
            <Link
              href="/posts"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Découvrir les annonces
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour renforcer les liens sociaux et l'entraide dans votre quartier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Sama Quartier ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center p-8 bg-white rounded-lg shadow-md">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à rejoindre votre communauté ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant et commencez à découvrir tout ce que votre quartier a à offrir
          </p>
          <Link
            href="/auth/signup"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Sama Quartier</h3>
              <p className="text-gray-400">
                La plateforme de quartier 100% sénégalaise qui connecte les communautés locales.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/posts" className="hover:text-white">Annonces</Link></li>
                <li><Link href="/events" className="hover:text-white">Événements</Link></li>
                <li><Link href="/businesses" className="hover:text-white">Commerces</Link></li>
                <li><Link href="/map" className="hover:text-white">Carte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Aide</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Communauté</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">À propos</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sama Quartier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
