"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trash2, CreditCard, Wallet } from 'lucide-react'
import { useRouter } from "next/navigation"

const cartItems = [
  {
    id: 1,
    name: "Netflix Premium",
    description: "Streaming de películas y series en 4K",
    price: 15.99,
    duration: "1 mes",
    category: "Streaming"
  },
  {
    id: 2,
    name: "Spotify Premium",
    description: "Música sin límites y sin anuncios",
    price: 9.99,
    duration: "1 mes",
    category: "Música"
  }
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [balance] = useState(150.75)
  const router = useRouter()

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  const handleCheckout = () => {
    // Simulamos compra exitosa
    alert("¡Compra realizada con éxito!")
    setItems([])
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-xl font-bold text-white">Carrito de Compras</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Productos Seleccionados</CardTitle>
                <CardDescription className="text-gray-400">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
                </CardDescription>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">Tu carrito está vacío</p>
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      Explorar Servicios
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {item.category}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                          <p className="text-gray-400 text-sm">{item.duration}</p>
                        </div>
                        <div className="flex items-center space-x-4 ml-4">
                          <div className="text-right">
                            <p className="text-white font-bold text-lg">${item.price}</p>
                            <p className="text-gray-400 text-sm">USD</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Descuento</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-gray-700 pt-2">
                      <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4 text-green-400" />
                        <span className="text-white text-sm">Saldo disponible</span>
                      </div>
                      <span className="text-green-400 font-medium">${balance.toFixed(2)}</span>
                    </div>
                  </div>

                  {balance >= getTotal() ? (
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Completar Compra
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-red-400 text-sm text-center">
                        Saldo insuficiente. Necesitas ${(getTotal() - balance).toFixed(2)} más.
                      </p>
                      <Button
                        onClick={() => router.push("/balance")}
                        variant="outline"
                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10"
                      >
                        Recargar Saldo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
