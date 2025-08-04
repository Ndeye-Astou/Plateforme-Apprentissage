'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Search, Filter, Plus, MapPin, Clock, Eye, Tag } from 'lucide-react'
import { Post, PostCategory, PostType } from '@prisma/client'

interface PostWithAuthor extends Post {
  author: {
    id: string
    name: string
    avatar: string | null
    neighborhood: string | null
  }
}

export default function PostsPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [filteredPosts, setFilteredPosts] = useState<PostWithAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'ALL'>('ALL')
  const [selectedType, setSelectedType] = useState<PostType | 'ALL'>('ALL')

  const categories = [
    { value: 'ALL', label: 'Toutes catégories' },
    { value: 'ELECTRONICS', label: 'Électronique' },
    { value: 'CLOTHING', label: 'Vêtements' },
    { value: 'HOME_GARDEN', label: 'Maison & Jardin' },
    { value: 'VEHICLES', label: 'Véhicules' },
    { value: 'SERVICES', label: 'Services' },
    { value: 'FOOD', label: 'Alimentation' },
    { value: 'BOOKS', label: 'Livres' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'OTHER', label: 'Autres' }
  ]

  const types = [
    { value: 'ALL', label: 'Tous types' },
    { value: 'SELL', label: 'Vendre' },
    { value: 'GIVE', label: 'Donner' },
    { value: 'EXCHANGE', label: 'Échanger' },
    { value: 'WANTED', label: 'Recherché' }
  ]

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, selectedCategory, selectedType])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (selectedType !== 'ALL') {
      filtered = filtered.filter(post => post.type === selectedType)
    }

    setFilteredPosts(filtered)
  }

  const getTypeColor = (type: PostType) => {
    switch (type) {
      case 'SELL': return 'bg-blue-100 text-blue-800'
      case 'GIVE': return 'bg-green-100 text-green-800'
      case 'EXCHANGE': return 'bg-purple-100 text-purple-800'
      case 'WANTED': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: PostType) => {
    switch (type) {
      case 'SELL': return 'Vendre'
      case 'GIVE': return 'Donner'
      case 'EXCHANGE': return 'Échanger'
      case 'WANTED': return 'Recherché'
      default: return type
    }
  }

  const getCategoryLabel = (category: PostCategory) => {
    const cat = categories.find(c => c.value === category)
    return cat?.label || category
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Annonces du quartier</h1>
          <p className="text-gray-600">Découvrez les annonces de votre communauté</p>
        </div>
        {session && (
          <Link
            href="/posts/create"
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Publier une annonce</span>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PostCategory | 'ALL')}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as PostType | 'ALL')}
          >
            {types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Results count */}
          <div className="flex items-center text-gray-600">
            <Filter className="w-5 h-5 mr-2" />
            <span>{filteredPosts.length} annonce(s)</span>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune annonce trouvée
          </h3>
          <p className="text-gray-600 mb-6">
            Essayez de modifier vos critères de recherche
          </p>
          {session && (
            <Link
              href="/posts/create"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Publier la première annonce</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Post Image */}
              <div className="h-48 bg-gray-200 relative">
                {post.images && JSON.parse(post.images).length > 0 ? (
                  <img
                    src={JSON.parse(post.images)[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                    {getTypeLabel(post.type)}
                  </span>
                </div>
                {post.price && (
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-md">
                    <span className="text-sm font-bold text-gray-900">
                      {post.price.toLocaleString()} FCFA
                    </span>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.description}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{post.author.neighborhood || post.location || 'Non spécifié'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(post.createdAt.toString())}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {getCategoryLabel(post.category)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views} vues</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">
                        {post.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </span>
                  </div>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}