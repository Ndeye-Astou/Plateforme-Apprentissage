import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isActive: true,
        isApproved: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            neighborhood: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, type, price, location, images } = await request.json()

    // TODO: Récupérer l'utilisateur authentifié
    // Pour l'instant, on utilise un utilisateur fictif
    const authorId = 'temp-user-id'

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        type,
        price: price ? parseFloat(price) : null,
        location,
        images: images ? JSON.stringify(images) : null,
        authorId,
        isApproved: true // Auto-approuvé pour le développement
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            neighborhood: true
          }
        }
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de l\'annonce:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}