"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Wallet, CreditCard, DollarSign, TrendingUp } from 'lucide-react'
import { useRouter } from "next/navigation"

const rechargeOptions = [
  { amount: 10, bonus: 0 },
  { amount: 25, bonus: 2 },
  { amount: 50, bonus: 5 },
  { amount: 100, bonus: 15 }
]

const transactions = [
  { id: 1, type: "recharge", amount: 50, date: "2024-01-15", description: "Recarga de saldo" },
  { id: 2, type: "purchase", amount: -15.99, date: "2024-01-14", description: "Netflix Premium" },
  { id: 3, type: "purchase", amount: -9.99, date: "2024-01-13", description: "Spotify Premium" },
  { id: 4, type: "recharge", amount: 25, date: "2024-01-10", description: "Recarga de saldo" }
]

export default function BalancePage() {
  const [balance, setBalance] = useState(150.75)
  const [customAmount, setCustomAmount] = useState("")
  const router = useRouter()

  const handleRecharge = (amount: number) => {
    setBalance(prev => prev + amount)
    alert(`¡Recarga exitosa! Se agregaron $${amount} a tu saldo.`)
  }

  const handleCustomRecharge = () => {
    const amount = parseFloat(customAmount)
    if (amount > 0) {
      handleRecharge(amount)
      setCustomAmount("")
    }
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
            <h1 className="text-xl font-bold text-white">Gestión de Saldo</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  Saldo Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">${balance.toFixed(2)}</p>
                  <p className="text-purple-300">USD disponibles</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Recharge */}
            <Card className="bg-gray-800/50 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Recarga Rápida</CardTitle>
                <CardDescription className="text-gray-400">
                  Selecciona un monto para recargar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {rechargeOptions.map((option) => (
                  <Button
                    key={option.amount}
                    onClick={() => handleRecharge(option.amount + option.bonus)}
                    variant="outline"
                    className="w-full justify-between border-gray-600 text-white hover:bg-gray-700"
                  >
                    <span>${option.amount}</span>
                    {option.bonus > 0 && (
                      <span className="text-green-400 text-sm">
                        +${option.bonus} bonus
                      </span>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recharge Form & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custom Recharge */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Recarga Personalizada
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Ingresa el monto que deseas recargar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-gray-300">Monto (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        min="1"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCustomRecharge}
                    disabled={!customAmount || parseFloat(customAmount) <= 0}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Recargar Saldo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Historial de Transacciones
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Últimas transacciones realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'recharge' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {transaction.type === 'recharge' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <DollarSign className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.description}</p>
                          <p className="text-gray-400 text-sm">{transaction.date}</p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
