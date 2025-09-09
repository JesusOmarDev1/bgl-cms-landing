import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ChartSuspenseWrapper } from '../Charts/ChartSuspense'
import { unstable_cache } from 'next/cache'

// Lazy load the optimized chart components
const OptimizedPieChart = React.lazy(() => import('../Charts/OptimizedPieChart'))
const OptimizedBarChart = React.lazy(() => import('../Charts/OptimizedBarChart'))
const OptimizedAreaChart = React.lazy(() => import('../Charts/OptimizedAreaChart'))

interface DashboardStats {
  posts: number
  pages: number
  media: number
  categories: number
  users: number
  products?: number
  brands?: number
  models?: number
}

interface PostsByCategory {
  category: string
  count: number
  fill: string
}

interface MonthlyStats {
  month: string
  posts: number
  pages: number
}

// Cached function for basic statistics
const getCachedBasicStats = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const [posts, pages, media, categories, users] = await Promise.all([
      payload.find({ collection: 'posts', limit: 0 }),
      payload.find({ collection: 'pages', limit: 0 }),
      payload.find({ collection: 'media', limit: 0 }),
      payload.find({ collection: 'categories', limit: 0 }),
      payload.find({ collection: 'users', limit: 0 }),
    ])

    return { posts, pages, media, categories, users }
  },
  ['dashboard-basic-stats'],
  {
    revalidate: 300, // 5 minutes
    tags: ['dashboard', 'stats'],
  },
)

// Cached function for posts with categories
const getCachedPostsWithCategories = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    return await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 100,
      select: {
        categories: true,
        publishedAt: true,
      },
    })
  },
  ['dashboard-posts-categories'],
  {
    revalidate: 600, // 10 minutes
    tags: ['dashboard', 'posts', 'categories'],
  },
)

// Cached function for monthly statistics
const getCachedMonthlyStats = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const monthlyStats: MonthlyStats[] = []
    const now = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      const monthName = date.toLocaleDateString('es-ES', { month: 'long' })
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)

      const [monthPosts, monthPages] = await Promise.all([
        payload.find({
          collection: 'posts',
          where: {
            createdAt: {
              greater_than_equal: date.toISOString(),
              less_than: nextMonth.toISOString(),
            },
          },
          limit: 0,
        }),
        payload.find({
          collection: 'pages',
          where: {
            createdAt: {
              greater_than_equal: date.toISOString(),
              less_than: nextMonth.toISOString(),
            },
          },
          limit: 0,
        }),
      ])

      monthlyStats.push({
        month: capitalizedMonth,
        posts: monthPosts.totalDocs,
        pages: monthPages.totalDocs,
      })
    }

    return monthlyStats
  },
  ['dashboard-monthly-stats'],
  {
    revalidate: 3600, // 1 hour
    tags: ['dashboard', 'monthly-stats'],
  },
)

// Cached function for recent activity
const getCachedRecentActivity = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentPosts = await payload.find({
      collection: 'posts',
      where: {
        createdAt: {
          greater_than_equal: thirtyDaysAgo.toISOString(),
        },
      },
      limit: 10,
      sort: '-createdAt',
      select: {
        title: true,
        createdAt: true,
      },
    })

    return recentPosts.docs.map((post: any, index: number) => ({
      date: post.createdAt,
      desktop: Math.floor(Math.random() * 300) + 100,
      mobile: Math.floor(Math.random() * 200) + 50,
    }))
  },
  ['dashboard-recent-activity'],
  {
    revalidate: 900, // 15 minutes
    tags: ['dashboard', 'recent-activity'],
  },
)

async function getDashboardData(): Promise<{
  stats: DashboardStats
  postsByCategory: PostsByCategory[]
  monthlyStats: MonthlyStats[]
  recentActivity: any[]
}> {
  try {
    // Use cached functions
    const [basicStats, postsWithCategories, monthlyStats, recentActivity] = await Promise.all([
      getCachedBasicStats(),
      getCachedPostsWithCategories(),
      getCachedMonthlyStats(),
      getCachedRecentActivity(),
    ])

    const { posts, pages, media, categories, users } = basicStats

    // Try to fetch products, brands, models if they exist (not cached as they're optional)
    const payload = await getPayload({ config: configPromise })
    let products, brands, models
    try {
      products = await payload.find({ collection: 'products', limit: 0 })
      brands = await payload.find({ collection: 'brands', limit: 0 })
      models = await payload.find({ collection: 'models', limit: 0 })
    } catch (error) {
      // Collections might not exist, that's okay
    }

    const stats: DashboardStats = {
      posts: posts.totalDocs,
      pages: pages.totalDocs,
      media: media.totalDocs,
      categories: categories.totalDocs,
      users: users.totalDocs,
      products: products?.totalDocs || 0,
      brands: brands?.totalDocs || 0,
      models: models?.totalDocs || 0,
    }

    // Process posts by category
    const categoryCount: { [key: string]: number } = {}
    postsWithCategories.docs.forEach((post: any) => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((category: any) => {
          const categoryName = typeof category === 'object' ? category.title : 'Sin categoría'
          categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1
        })
      } else {
        categoryCount['Sin categoría'] = (categoryCount['Sin categoría'] || 0) + 1
      }
    })

    const colors = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ]

    const postsByCategory: PostsByCategory[] = Object.entries(categoryCount)
      .map(([category, count], index) => ({
        category,
        count,
        fill: colors[index % colors.length],
      }))
      .slice(0, 5) // Top 5 categories

    return {
      stats,
      postsByCategory,
      monthlyStats,
      recentActivity,
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)

    // Return fallback data
    return {
      stats: {
        posts: 0,
        pages: 0,
        media: 0,
        categories: 0,
        users: 0,
        products: 0,
        brands: 0,
        models: 0,
      },
      postsByCategory: [{ category: 'Sin datos', count: 1, fill: 'hsl(var(--chart-1))' }],
      monthlyStats: [
        { month: 'Enero', posts: 0, pages: 0 },
        { month: 'Febrero', posts: 0, pages: 0 },
        { month: 'Marzo', posts: 0, pages: 0 },
        { month: 'Abril', posts: 0, pages: 0 },
        { month: 'Mayo', posts: 0, pages: 0 },
        { month: 'Junio', posts: 0, pages: 0 },
      ],
      recentActivity: [],
    }
  }
}

const RealDataDashboard: React.FC = async () => {
  const { stats, postsByCategory, monthlyStats, recentActivity } = await getDashboardData()

  // Calculate growth percentages
  const totalContent = stats.posts + stats.pages
  const growthPercentage =
    monthlyStats.length > 1
      ? ((monthlyStats[monthlyStats.length - 1].posts +
          monthlyStats[monthlyStats.length - 1].pages -
          (monthlyStats[monthlyStats.length - 2].posts +
            monthlyStats[monthlyStats.length - 2].pages)) /
          Math.max(
            1,
            monthlyStats[monthlyStats.length - 2].posts +
              monthlyStats[monthlyStats.length - 2].pages,
          )) *
        100
      : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>Resumen</h2>

      {/* Statistics Cards */}
      <div
        className="statsGrid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          className="statCard"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {stats.posts}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Publicaciones</p>
        </div>

        <div
          className="statCard"
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {stats.pages}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Páginas</p>
        </div>

        <div
          className="statCard"
          style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {stats.media}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Archivos Media</p>
        </div>

        <div
          className="statCard"
          style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {stats.categories}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Categorías</p>
        </div>

        <div
          className="statCard"
          style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {stats.users}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Usuarios</p>
        </div>
      </div>

      <div className="chartsGrid">
        <ChartSuspenseWrapper height="400px">
          <OptimizedPieChart
            data={postsByCategory.map((item) => ({
              browser: item.category,
              visitors: item.count,
              fill: item.fill,
            }))}
            title="Distribución por Categorías"
            subtitle={`Total de ${stats.posts} publicaciones`}
            trendText={`${postsByCategory.length} categorías activas`}
            descriptionText="Distribución de contenido por categoría"
          />
        </ChartSuspenseWrapper>

        <ChartSuspenseWrapper height="400px">
          <OptimizedBarChart
            data={monthlyStats.map((item) => ({
              month: item.month,
              desktop: item.posts,
              mobile: item.pages,
            }))}
            title="Contenido Mensual"
            subtitle="Publicaciones vs Páginas - Últimos 6 meses"
            trendText={`${growthPercentage > 0 ? 'Crecimiento' : 'Decrecimiento'} del ${Math.abs(growthPercentage).toFixed(1)}% este mes`}
            descriptionText="Evolución de la creación de contenido"
          />
        </ChartSuspenseWrapper>
      </div>

      {recentActivity.length > 0 && (
        <ChartSuspenseWrapper height="400px">
          <OptimizedAreaChart
            data={recentActivity}
            title="Actividad Reciente"
            subtitle="Últimos 30 días de actividad"
            showTimeRange={true}
          />
        </ChartSuspenseWrapper>
      )}
    </div>
  )
}

export default RealDataDashboard
