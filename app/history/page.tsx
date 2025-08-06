"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Scroll, Calendar, DollarSign, Clock } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const router = useRouter()

  useEffect(() => {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]')
    setHistory(purchaseHistory)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/medieval-bg.jpg')] bg-cover bg-center opacity-10"></div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-b-2 border-blue-500/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Reino
            </Button>
            <div className="flex items-center space-x-2">
              <Scroll className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white medieval-font">Pergamino de Conquistas</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-blue-500/50 medieval-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Scroll className="h-5 w-5 mr-2 text-blue-400" />
              Historial de Dragones Domesticados
            </CardTitle>
            <CardDescription className="text-blue-300">
              Registro de todas tus conquistas épicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-12">
                <Scroll className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg mb-4">El pergamino está vacío</p>
                <p className="text-slate-500">Aún no has domesticado ningún dragón</p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  Comenzar Aventura
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((purchase: any, index) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full">
                        <span className="text-2xl">🐲</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{purchase.product}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{purchase.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{purchase.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-400 font-bold text-lg">
                        <DollarSign className="h-4 w-4" />
                        <span>{purchase.price}</span>
                      </div>
                      <p className="text-slate-400 text-sm">oro gastado</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
