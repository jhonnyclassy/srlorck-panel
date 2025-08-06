"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, User, Settings, LogOut, Crown, Zap, Star, Award, History, MessageCircle, Sparkles, Shield } from 'lucide-react'
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const products = [
  {
    id: 1,
    name: "Netflix",
    description: "Streaming épico de series y películas",
    price: 50,
    duration: "30 días",
    category: "Streaming",
    logo: "🎬",
    color: "from-red-500 to-red-700",
    special: false
  },
  {
    id: 2,
    name: "Crunchyroll Anual",
    description: "Anime sin límites por un año completo",
    price: 70,
    duration: "365 días",
    category: "Anime",
    logo: "🍜",
    color: "from-orange-500 to-orange-700",
    special: false
  },
  {
    id: 3,
    name: "Crunchyroll Mensual",
    description: "Anime premium mensual",
    price: 15,
    duration: "30 días",
    category: "Anime",
    logo: "🍜",
    color: "from-orange-400 to-orange-600",
    special: false
  },
  {
    id: 4,
    name: "Disney+",
    description: "El reino mágico de Disney",
    price: 30,
    duration: "30 días",
    category: "Streaming",
    logo: "🏰",
    color: "from-blue-500 to-blue-700",
    special: false
  },
  {
    id: 5,
    name: "VIX",
    description: "Entretenimiento latino completo",
    price: 20,
    duration: "30 días",
    category: "Streaming",
    logo: "📺",
    color: "from-purple-500 to-purple-700",
    special: false
  },
  {
    id: 6,
    name: "Paramount",
    description: "Películas y series premium",
    price: 30,
    duration: "30 días",
    category: "Streaming",
    logo: "⭐",
    color: "from-indigo-500 to-indigo-700",
    special: false
  },
  {
    id: 7,
    name: "Max",
    description: "Lo mejor del entretenimiento",
    price: 25,
    duration: "30 días",
    category: "Streaming",
    logo: "💎",
    color: "from-pink-500 to-pink-700",
    special: true
  },
  {
    id: 8,
    name: "Canva",
    description: "Diseño profesional por 6 meses",
    price: 50,
    duration: "180 días",
    category: "Herramientas",
    logo: "🎨",
    color: "from-cyan-500 to-cyan-700",
    special: false
  },
  {
    id: 9,
    name: "Seguidores Redes",
    description: "FB, IG, TikTok - Boost social",
    price: 25,
    duration: "Permanente",
    category: "Social",
    logo: "📱",
    color: "from-green-500 to-green-700",
    special: false
  },
  {
    id: 10,
    name: "Recargas Telcel",
    description: "Recarga $200 por solo $160",
    price: 160,
    duration: "Inmediato",
    category: "Telefonía",
    logo: "📞",
    color: "from-yellow-500 to-yellow-700",
    special: false
  }
]

const achievements = [
  { id: 1, name: "Jinete Novato", points: 50, icon: "🐲", unlocked: false },
  { id: 2, name: "Domador Experto", points: 200, icon: "🔥", unlocked: false },
  { id: 3, name: "Maestro de Dragones", points: 500, icon: "👑", unlocked: false }
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [balance, setBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseFloat(localStorage.getItem('balance') || '150')
    }
    return 150
  })
  const [points, setPoints] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('points') || '0')
    }
    return 0
  })
  const [userAchievements, setUserAchievements] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('achievements') || '[]')
    }
    return []
  })
  const [addBalanceAmount, setAddBalanceAmount] = useState("")
  const [showNotification, setShowNotification] = useState("")
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('balance', balance.toString())
    localStorage.setItem('points', points.toString())
    localStorage.setItem('achievements', JSON.stringify(userAchievements))
  }, [balance, points, userAchievements])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const buyProduct = (product: typeof products[0]) => {
    if (balance >= product.price) {
      setBalance(prev => prev - product.price)
      setPoints(prev => prev + Math.floor(product.price / 5))
      
      const purchase = {
        id: Date.now(),
        product: product.name,
        price: product.price,
        date: new Date().toLocaleDateString(),
        duration: product.duration
      }
      const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]')
      history.unshift(purchase)
      localStorage.setItem('purchaseHistory', JSON.stringify(history))
      
      showEpicNotification(`¡Has domesticado ${product.name}! 🐉`)
      checkAchievements()
    } else {
      showEpicNotification("¡Necesitas más oro para esta conquista! 💰")
    }
  }

  const addBalance = () => {
    const amount = parseFloat(addBalanceAmount)
    if (amount > 0) {
      setBalance(prev => prev + amount)
      setAddBalanceAmount("")
      showEpicNotification(`¡${amount} oro agregado a tu tesoro! ✨`)
    }
  }

  const checkAchievements = () => {
    achievements.forEach(achievement => {
      if (points >= achievement.points && !userAchievements.includes(achievement.id)) {
        setUserAchievements(prev => [...prev, achievement.id])
        showEpicNotification(`¡Logro desbloqueado: ${achievement.name}! ${achievement.icon}`)
      }
    })
  }

  const showEpicNotification = (message: string) => {
    setShowNotification(message)
    setTimeout(() => setShowNotification(""), 4000)
  }

  const getProgressToNextLevel = () => {
    const nextAchievement = achievements.find(a => points < a.points)
    if (!nextAchievement) return 100
    return (points / nextAchievement.points) * 100
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
      {/* Epic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-emerald-900"></div>
      
      {/* Aurora Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
      </div>

      {/* Floating Runes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-lg text-blue-400 opacity-40 animate-float-rune"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            {['ᚱ', 'ᚢ', 'ᚾ', 'ᛖ', 'ᛋ', 'ᛏ'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      {/* Epic Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-bounce-in border-2 border-yellow-300 medieval-notification">
          <p className="font-bold text-lg flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            {showNotification}
          </p>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-b-2 border-yellow-500/50 sticky top-0 z-40 medieval-header">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-3 rounded-lg animate-pulse-glow dragon-emblem">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 medieval-font">
                  SrLorck - LORCKPLAY
                </h1>
                <p className="text-blue-300 text-sm">Reino de Servicios Digitales</p>
              </div>
            </div>

            {/* Energy Bar (Balance) */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-gradient-to-r from-slate-700/80 to-slate-800/80 p-4 rounded-lg border-2 border-green-500/50 medieval-energy-bar">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <span className="text-white font-bold text-lg">Oro: ${balance.toFixed(2)}</span>
                </div>
                <div className="w-40 h-3 bg-slate-600 rounded-full overflow-hidden border border-green-400/50">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-green-500 animate-energy-flow"
                    style={{ width: `${Math.min((balance / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white shadow-lg medieval-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Oro
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50 medieval-dialog">
                  <DialogHeader>
                    <DialogTitle className="text-yellow-300 medieval-font">⚡ Añadir Oro al Tesoro ⚡</DialogTitle>
                    <DialogDescription className="text-blue-300">
                      Incrementa tu oro para más conquistas épicas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Cantidad de oro"
                      value={addBalanceAmount}
                      onChange={(e) => setAddBalanceAmount(e.target.value)}
                      className="bg-slate-700 border-2 border-yellow-500/30 text-white h-12 medieval-input"
                    />
                    <Button onClick={addBalance} className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 h-12 medieval-button">
                      ✨ Añadir Oro Mágico ✨
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 border border-blue-500/30">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-2 border-blue-500/50">
                <DropdownMenuItem onClick={() => router.push("/history")} className="text-white hover:bg-slate-700">
                  <History className="mr-2 h-4 w-4" />
                  Pergamino de Conquistas
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-slate-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem onClick={() => router.push("/")} className="text-white hover:bg-slate-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir del Reino
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Balance & Search */}
          <div className="md:hidden mt-4 space-y-3">
            <div className="bg-gradient-to-r from-slate-700/80 to-slate-800/80 p-3 rounded-lg border-2 border-green-500/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-bold">Oro: ${balance.toFixed(2)}</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50">
                    <DialogHeader>
                      <DialogTitle className="text-yellow-300">Añadir Oro</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="number"
                        placeholder="Cantidad"
                        value={addBalanceAmount}
                        onChange={(e) => setAddBalanceAmount(e.target.value)}
                        className="bg-slate-700 border-yellow-500/30 text-white"
                      />
                      <Button onClick={addBalance} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600">
                        Añadir Oro
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-yellow-400 animate-energy-flow"
                  style={{ width: `${Math.min((balance / 200) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <Input
                placeholder="Buscar dragones épicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-2 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-yellow-400 medieval-input"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Progress & Achievements */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <Card className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-2 border-blue-500/50 mb-6 medieval-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-yellow-300 medieval-font">⚔️ Progreso del Jinete ⚔️</h3>
                <p className="text-blue-300 text-lg">XP: {points} puntos</p>
              </div>
              <div className="flex space-x-2">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-full border-2 ${
                      userAchievements.includes(achievement.id)
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 animate-pulse-glow'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                    title={achievement.name}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={getProgressToNextLevel()} 
                className="h-4 bg-slate-700 border border-blue-500/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600 opacity-30 animate-energy-flow rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:block mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <Input
              placeholder="Buscar dragones épicos para domar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-slate-700/50 border-2 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-yellow-400 h-14 text-lg medieval-input"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 ${
                product.special ? 'border-yellow-500/70 animate-pulse-glow' : 'border-blue-500/50'
              } hover:scale-105 transition-all duration-300 group medieval-product-card`}
            >
              <CardHeader className="pb-4">
                <div className={`aspect-video bg-gradient-to-br ${product.color} rounded-lg mb-4 overflow-hidden flex items-center justify-center relative border-2 border-yellow-500/30`}>
                  <span className="text-6xl">{product.logo}</span>
                  <div className="absolute top-2 right-2">
                    <span className="text-2xl animate-bounce">🐲</span>
                  </div>
                  {product.special && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded text-xs font-bold animate-pulse">
                      ⚡ ÉPICO ⚡
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                      <p className="text-white text-xs font-bold">{product.category}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-white text-xl group-hover:text-yellow-300 transition-colors medieval-font">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-2 text-sm">
                    {product.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">4.8</span>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {product.duration}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-yellow-400">${product.price}</span>
                    <span className="text-slate-400 text-sm ml-1">oro</span>
                  </div>
                </div>
                <Button
                  onClick={() => buyProduct(product)}
                  disabled={balance < product.price}
                  className={`w-full font-bold text-lg h-14 ${
                    balance >= product.price
                      ? `bg-gradient-to-r ${product.color} hover:scale-105 transform transition-all duration-300 medieval-button border-2 border-yellow-500/30`
                      : 'bg-slate-600 cursor-not-allowed border-2 border-slate-500'
                  }`}
                >
                  {balance >= product.price ? (
                    <span className="flex items-center">
                      🐉 Domar
                      <Shield className="h-4 w-4 ml-2" />
                    </span>
                  ) : (
                    <>🔒 Oro insuficiente</>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐉</div>
            <p className="text-slate-400 text-xl">No se encontraron dragones que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 shadow-2xl animate-bounce-slow border-2 border-green-400"
          onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      </div>

      {/* Guarantee Section */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Card className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-2 border-green-500/50 medieval-parchment">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-yellow-400 mr-3" />
              <h3 className="text-2xl font-bold text-yellow-300 medieval-font">🛡️ Garantía del Reino 🛡️</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-lg">
              <p className="text-green-300 font-bold">✅ Garantía de 30 días</p>
              <p className="text-blue-300 font-bold">🛡️ Soporte 24/7 - Respuesta en 72 horas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
