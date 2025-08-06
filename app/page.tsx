"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, Sword, Sparkles } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOpening, setIsOpening] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsOpening(true)
      setTimeout(() => {
        if (email === "admin@lorck.com") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      }, 2500)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
      {/* Epic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-emerald-900"></div>
      
      {/* Mountain Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-900 to-transparent">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0,300 L0,200 Q200,100 400,150 Q600,50 800,120 Q1000,80 1200,140 L1200,300 Z" 
                fill="url(#mountainGradient)" opacity="0.8"/>
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Aurora Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>

      {/* Floating Runes */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl text-blue-400 opacity-60 animate-float-rune"
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

      {/* Cave Door Effect */}
      {isOpening && (
        <div className="fixed inset-0 z-50 cave-doors">
          <div className="cave-door cave-door-left bg-gradient-to-r from-slate-900 to-slate-800"></div>
          <div className="cave-door cave-door-right bg-gradient-to-l from-slate-900 to-slate-800"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white animate-fade-in-up">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-yellow-400 animate-spin-slow" />
              <p className="text-2xl font-bold medieval-font">Abriendo Portal Mágico...</p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Epic Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-6 rounded-full shadow-2xl animate-pulse-glow dragon-emblem">
                  <Shield className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full animate-bounce-slow">
                  <Sword className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce">🐉</div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 mb-2 medieval-font animate-title-glow">
              SrLorck
            </h1>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-green-500 mb-6 medieval-font">
              LORCKPLAY
            </h2>
            
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-yellow-500/50 rounded-lg p-4 mb-6 medieval-border">
              <p className="text-yellow-300 text-lg font-semibold animate-text-glow">
                "Bienvenido, joven jinete."
              </p>
              <p className="text-blue-300 text-base">
                "Tu misión comienza aquí"
              </p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-blue-500/50 backdrop-blur-sm shadow-2xl medieval-card">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-yellow-300 font-bold text-lg flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Usuario Guerrero
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700/70 border-2 border-blue-500/40 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 h-14 text-lg medieval-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-yellow-300 font-bold text-lg flex items-center">
                    <Sword className="h-4 w-4 mr-2" />
                    Clave Secreta
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/70 border-2 border-blue-500/40 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 h-14 text-lg pr-14 medieval-input"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-4 text-yellow-400 hover:text-yellow-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 medieval-button"
                  disabled={isOpening}
                >
                  {isOpening ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Invocando Portal...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      🐉 Entrar al Reino Mágico
                      <Sparkles className="h-5 w-5 ml-2" />
                    </span>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center bg-slate-700/30 rounded-lg p-4 border border-blue-500/30">
                <p className="text-yellow-300 font-bold mb-2">⚔️ Credenciales de Prueba ⚔️</p>
                <div className="text-sm text-slate-300 space-y-1">
                  <p><strong>Usuario:</strong> user@demo.com</p>
                  <p><strong>Admin:</strong> admin@lorck.com</p>
                  <p><strong>Contraseña:</strong> cualquiera</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
