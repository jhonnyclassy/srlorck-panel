"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, DollarSign, Package, TrendingUp, Settings, LogOut, Crown, Shield } from 'lucide-react'
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const stats = [
  { title: "Jinetes Activos", value: "1,234", icon: Users, color: "text-blue-400" },
  { title: "Oro del Reino", value: "$12,345", icon: DollarSign, color: "text-yellow-400" },
  { title: "Dragones", value: "24", icon: Package, color: "text-green-400" },
  { title: "Crecimiento", value: "+15%", icon: TrendingUp, color: "text-purple-400" }
]

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Jinete Épico", email: "jinete@lorck.com", balance: 150, points: 75 },
    { id: 2, name: "Domador Pro", email: "domador@lorck.com", balance: 200, points: 150 }
  ])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newBalance, setNewBalance] = useState("")
  const [newPoints, setNewPoints] = useState("")
  const router = useRouter()

  const updateUserBalance = (userId: number, newBalance: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, balance: newBalance } : user
    ))
  }

  const updateUserPoints = (userId: number, newPoints: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, points: newPoints } : user
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/medieval-bg.jpg')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-b-2 border-yellow-500/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 p-3 rounded-lg animate-pulse-glow">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 medieval-font">
                  Trono del Administrador
                </h1>
                <p className="text-blue-300">SrLorck - LORCKPLAY</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-slate-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-white hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir del Trono
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-blue-500/50 medieval-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Management */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-blue-500/50 medieval-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-400" />
                  Gestión de Jinetes
                </CardTitle>
                <CardDescription className="text-blue-300">
                  Administra el oro y puntos de los jinetes del reino
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-lg border border-blue-500/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{user.name}</h3>
                    <p className="text-slate-400">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge className="bg-yellow-500/20 text-yellow-300">
                        Oro: ${user.balance}
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-300">
                        Puntos: {user.points}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user)
                          setNewBalance(user.balance.toString())
                          setNewPoints(user.points.toString())
                        }}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-blue-500/50">
                      <DialogHeader>
                        <DialogTitle className="text-white">Editar Jinete: {selectedUser?.name}</DialogTitle>
                        <DialogDescription className="text-blue-300">
                          Modifica el oro y puntos del jinete
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="balance" className="text-slate-300">Oro</Label>
                          <Input
                            id="balance"
                            type="number"
                            value={newBalance}
                            onChange={(e) => setNewBalance(e.target.value)}
                            className="bg-slate-700/50 border-blue-500/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="points" className="text-slate-300">Puntos</Label>
                          <Input
                            id="points"
                            type="number"
                            value={newPoints}
                            onChange={(e) => setNewPoints(e.target.value)}
                            className="bg-slate-700/50 border-blue-500/30 text-white"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              if (selectedUser) {
                                updateUserBalance(selectedUser.id, parseFloat(newBalance))
                                updateUserPoints(selectedUser.id, parseInt(newPoints))
                              }
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                          >
                            Actualizar Oro
                          </Button>
                          <Button
                            onClick={() => {
                              if (selectedUser) {
                                updateUserPoints(selectedUser.id, parseInt(newPoints))
                              }
                            }}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          >
                            Actualizar Puntos
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
