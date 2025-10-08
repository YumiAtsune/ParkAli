import React, { useState } from 'react';
import { Home, QrCode, History, Store, Menu, ChevronRight, Award, MapPin, Star, Zap, Check, Car, Gift, TrendingUp, Sparkles, CreditCard, ArrowRight, Circle } from 'lucide-react';

const ParkAli = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [pointsToUse, setPointsToUse] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const [user, setUser] = useState({
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    loyaltyPoints: 2450,
    totalSpent: 89.50,
    level: 'Gold',
    avatar: '👩‍💼',
    cardNumber: '•••• 9123'
  });

  const parkingZones = [
    { name: 'Zone Bleue', subtitle: 'Centre', price: 1.60, pointsPerHour: 32, icon: '🏛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Zone Verte', subtitle: 'Mairie', price: 1.20, pointsPerHour: 24, icon: '🌳', color: 'from-emerald-500 to-green-500' },
    { name: 'Zone Orange', subtitle: 'Périphérie', price: 0.80, pointsPerHour: 16, icon: '🅿️', color: 'from-orange-500 to-amber-500' }
  ];

  const merchants = [
    { id: 1, name: 'Café Central', category: 'Restauration', distance: '50m', pointsRatio: 1.0, rating: 4.8, logo: '☕', totalRedemptions: 145, color: 'from-amber-500 to-orange-600' },
    { id: 2, name: 'Librairie du Centre', category: 'Culture', distance: '120m', pointsRatio: 0.8, rating: 4.6, logo: '📚', totalRedemptions: 89, color: 'from-indigo-500 to-purple-600' },
    { id: 3, name: 'Pharmacie Moderne', category: 'Santé', distance: '200m', pointsRatio: 1.2, rating: 4.9, logo: '💊', totalRedemptions: 203, color: 'from-cyan-500 to-blue-600' },
    { id: 4, name: 'Boulangerie Artisanale', category: 'Alimentation', distance: '80m', pointsRatio: 1.1, rating: 4.7, logo: '🥖', totalRedemptions: 167, color: 'from-rose-500 to-pink-600' }
  ];

  const [parkingHistory, setParkingHistory] = useState([
    { id: 1, zone: 'Zone Bleue', duration: 120, amount: 3.20, pointsEarned: 64, date: '2025-10-07T14:30:00' },
    { id: 2, zone: 'Zone Verte', duration: 90, amount: 1.80, pointsEarned: 36, date: '2025-10-05T10:15:00' },
    { id: 3, zone: 'Zone Orange', duration: 60, amount: 0.80, pointsEarned: 16, date: '2025-10-03T16:45:00' }
  ]);

  const [redemptions, setRedemptions] = useState([
    { id: 1, merchantId: 1, merchantName: 'Café Central', pointsUsed: 500, discount: 5.00, date: '2025-10-06T12:30:00' },
    { id: 2, merchantId: 3, merchantName: 'Pharmacie Moderne', pointsUsed: 300, discount: 3.60, date: '2025-10-04T15:20:00' }
  ]);

  const showNotif = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const simulateParkingPayment = (zone, duration) => {
    const amount = (zone.price * duration / 60).toFixed(2);
    const pointsEarned = Math.floor(amount * 20);
    
    const newTransaction = {
      id: parkingHistory.length + 1,
      zone: zone.name,
      duration: duration,
      amount: parseFloat(amount),
      pointsEarned: pointsEarned,
      date: new Date().toISOString()
    };
    
    setParkingHistory([newTransaction, ...parkingHistory]);
    setUser({
      ...user,
      loyaltyPoints: user.loyaltyPoints + pointsEarned,
      totalSpent: user.totalSpent + parseFloat(amount)
    });
    
    showNotif(`✨ +${pointsEarned} points gagnés !`);
  };

  const redeemPoints = () => {
    const points = parseInt(pointsToUse);
    if (!points || points < 100 || points > user.loyaltyPoints) return;
    
    const merchant = merchants.find(m => m.id === selectedMerchant);
    const discount = (points * merchant.pointsRatio / 100).toFixed(2);
    
    const newRedemption = {
      id: redemptions.length + 1,
      merchantId: merchant.id,
      merchantName: merchant.name,
      pointsUsed: points,
      discount: parseFloat(discount),
      date: new Date().toISOString()
    };
    
    setRedemptions([newRedemption, ...redemptions]);
    setUser({ ...user, loyaltyPoints: user.loyaltyPoints - points });
    setPointsToUse('');
    setShowScanner(false);
    setSelectedMerchant(null);
    showNotif(`🎉 ${discount}€ économisés !`);
  };

  const HomeView = () => (
    <div className="min-h-screen bg-slate-950 text-white pb-28">
      {/* Status Bar */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="font-medium">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border border-slate-400 rounded-sm relative">
              <div className="absolute inset-0.5 bg-slate-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-6">
        <button className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 hover:bg-slate-800 transition-all">
          <Menu className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-6 mb-8">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative text-center">
            <div className="inline-block mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[2.5rem] blur-2xl opacity-50"></div>
              <div className="relative w-44 h-44 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] flex items-center justify-center border-4 border-rose-400/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-transparent rounded-[2.3rem]"></div>
                <Car className="w-20 h-20 text-rose-400" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/50 backdrop-blur-xl rounded-full border border-rose-400/20 mb-3">
                <Circle className="w-1.5 h-1.5 fill-rose-400 text-rose-400" />
                <span className="text-xs text-rose-400 font-medium uppercase tracking-widest">Premium Rewards</span>
              </div>
            </div>
            
            <h1 className="text-6xl font-serif mb-3 tracking-tight bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
              ParkAli
            </h1>
            
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xs mx-auto mb-8">
              Transformez vos parkings<br />en récompenses
            </p>
            
            <button 
              onClick={() => setCurrentView('scan')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl font-semibold text-slate-950 hover:shadow-2xl hover:shadow-rose-500/50 transition-all hover:scale-105"
            >
              <span>Commencer</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Points Card */}
      <div className="px-6 mb-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Solde disponible</div>
                  <div className="flex items-baseline gap-3">
                    <div className="text-5xl font-bold bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
                      {user.loyaltyPoints.toLocaleString()}
                    </div>
                    <div className="text-lg text-rose-400 font-medium">pts</div>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/50">
                  <Sparkles className="w-7 h-7 text-slate-950" />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-5 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-400 font-medium">Pouvoir d'achat</span>
                </div>
                <div className="text-2xl font-bold text-white">{(user.loyaltyPoints / 100).toFixed(2)}€</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold text-white mb-1">{parkingHistory.length}</div>
            <div className="text-xs text-slate-400 font-medium">Parkings</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold text-white mb-1">{redemptions.length}</div>
            <div className="text-xs text-slate-400 font-medium">Remises</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent mb-1">{user.level}</div>
            <div className="text-xs text-slate-400 font-medium">Niveau</div>
          </div>
        </div>
      </div>

      {/* Parking Zones */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Zones de stationnement</h3>
          <button className="text-rose-400 text-sm font-medium">Voir tout</button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {parkingZones.map((zone, idx) => (
            <button
              key={idx}
              onClick={() => simulateParkingPayment(zone, 60)}
              className="group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-2xl`}></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all text-center">
                <div className="text-3xl mb-2">{zone.icon}</div>
                <div className="text-xs text-slate-300 font-semibold mb-1">{zone.subtitle}</div>
                <div className="text-xs text-slate-500">{zone.price}€/h</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Merchants */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Commerces partenaires</h3>
          <button onClick={() => setCurrentView('merchants')} className="text-rose-400 text-sm font-medium">Voir tout</button>
        </div>
        
        <div className="space-y-3">
          {merchants.slice(0, 3).map((merchant) => (
            <div
              key={merchant.id}
              className="group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${merchant.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur`}></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${merchant.color} rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                    {merchant.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white mb-1 truncate">{merchant.name}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {merchant.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-rose-400 text-rose-400" />
                        {merchant.rating}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScannerView = () => (
    <div className="min-h-screen bg-slate-950 text-white pb-28">
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentView('home')} className="text-rose-400 font-medium flex items-center gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour
          </button>
          <div className="text-xs text-slate-400">9:41</div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif mb-2 bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">Scanner QR Code</h2>
          <p className="text-slate-400">Utilisez vos points facilement</p>
        </div>

        {/* Scanner Frame */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 border border-slate-800 min-h-96 flex items-center justify-center">
            <div className="absolute inset-8 border-2 border-dashed border-rose-400/30 rounded-2xl"></div>
            <div className="text-center relative z-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-rose-500/30 rounded-3xl blur-2xl"></div>
                <div className="relative w-32 h-32 bg-slate-950 rounded-3xl flex items-center justify-center border-4 border-rose-400/50 shadow-2xl">
                  <QrCode className="w-20 h-20 text-rose-400" />
                </div>
              </div>
              <p className="text-slate-300 font-medium">Sélectionnez un commerce</p>
              <p className="text-slate-500 text-sm mt-1">pour scanner son QR code</p>
            </div>
          </div>
        </div>

        {/* Merchants List */}
        <div>
          <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-4">Commerces à proximité</h3>
          <div className="space-y-3">
            {merchants.map((merchant) => (
              <button
                key={merchant.id}
                onClick={() => {
                  setSelectedMerchant(merchant.id);
                  setShowScanner(true);
                }}
                className="w-full group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${merchant.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${merchant.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                        {merchant.logo}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white mb-1">{merchant.name}</div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {merchant.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-rose-400 text-rose-400" />
                            {merchant.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showScanner && selectedMerchant && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 z-50 animate-fadeIn">
            <div className="bg-slate-950 rounded-3xl p-8 max-w-sm w-full border border-slate-800 shadow-2xl">
              {(() => {
                const merchant = merchants.find(m => m.id === selectedMerchant);
                return (
                  <>
                    <div className="text-center mb-8">
                      <div className="relative inline-block mb-4">
                        <div className={`absolute inset-0 bg-gradient-to-br ${merchant.color} opacity-50 rounded-3xl blur-2xl`}></div>
                        <div className={`relative w-24 h-24 bg-gradient-to-br ${merchant.color} rounded-3xl flex items-center justify-center text-5xl shadow-2xl`}>
                          {merchant.logo}
                        </div>
                      </div>
                      <h3 className="text-3xl font-serif text-white mb-1">{merchant.name}</h3>
                      <p className="text-slate-400">{merchant.category}</p>
                    </div>

                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 mb-6 border border-slate-800">
                      <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Taux de conversion</div>
                      <div className="text-2xl font-bold text-white">
                        1 point = {merchant.pointsRatio} centime
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm text-slate-400 mb-3 uppercase tracking-wider">
                        Points à utiliser (min. 100)
                      </label>
                      <input
                        type="number"
                        value={pointsToUse}
                        onChange={(e) => setPointsToUse(e.target.value)}
                        placeholder="500"
                        className="w-full p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white text-center text-3xl font-bold focus:border-rose-400 focus:outline-none transition-colors"
                        min="100"
                        max={user.loyaltyPoints}
                      />
                      {pointsToUse && parseInt(pointsToUse) >= 100 && (
                        <div className="mt-4 relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-50"></div>
                          <div className="relative bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-6 text-slate-950">
                            <div className="text-sm font-semibold mb-2 uppercase tracking-wider">Remise obtenue</div>
                            <div className="text-5xl font-bold">
                              {(parseInt(pointsToUse) * merchant.pointsRatio / 100).toFixed(2)}€
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowScanner(false);
                          setSelectedMerchant(null);
                          setPointsToUse('');
                        }}
                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-semibold border border-slate-800 hover:bg-slate-800 transition-all"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={redeemPoints}
                        disabled={!pointsToUse || parseInt(pointsToUse) < 100 || parseInt(pointsToUse) > user.loyaltyPoints}
                        className="flex-1 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-slate-950 rounded-2xl font-bold disabled:opacity-50 hover:shadow-xl hover:shadow-rose-500/50 transition-all"
                      >
                        Valider
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const HistoryView = () => (
    <div className="min-h-screen bg-slate-950 text-white pb-28">
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentView('home')} className="text-rose-400 font-medium flex items-center gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour
          </button>
          <div className="text-xs text-slate-400">9:41</div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif mb-2 bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">Historique</h2>
          <p className="text-slate-400">Toutes vos transactions</p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-4">Stationnements payés</h3>
          <div className="space-y-3">
            {parkingHistory.map((tx) => (
              <div key={tx.id} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      🅿️
                    </div>
                    <div>
                      <div className="font-semibold text-white">{tx.zone}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {new Date(tx.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} • {tx.duration} min
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-rose-400 text-lg">+{tx.pointsEarned}</div>
                    <div className="text-xs text-slate-500">{tx.amount.toFixed(2)}€</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-4">Points utilisés</h3>
          <div className="space-y-3">
            {redemptions.map((red) => {
              const merchant = merchants.find(m => m.id === red.merchantId);
              return (
                <div key={red.id} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${merchant?.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {merchant?.logo}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{red.merchantName}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {new Date(red.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-400 text-lg">-{red.pointsUsed}</div>
                      <div className="text-xs text-slate-500">{red.discount.toFixed(2)}€</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const MerchantsView = () => (
    <div className="min-h-screen bg-slate-950 text-white pb-28">
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentView('home')} className="text-rose-400 font-medium flex items-center gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour
          </button>
          <div className="text-xs text-slate-400">9:41</div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif mb-2 bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">Nos Partenaires</h2>
          <p className="text-slate-400">{merchants.length} commerces disponibles</p>
        </div>

        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${merchant.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl blur`}></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-start gap-5 mb-5">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${merchant.color} opacity-50 rounded-2xl blur-xl`}></div>
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${merchant.color} rounded-2xl flex items-center justify-center text-4xl shadow-2xl flex-shrink-0`}>
                      {merchant.logo}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-white mb-1">{merchant.name}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">{merchant.category}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {merchant.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-rose-400 text-rose-400" />
                        {merchant.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {merchant.totalRedemptions}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 mb-4 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Conversion</div>
                      <div className="text-lg font-bold text-white">
                        1 pt = {merchant.pointsRatio}¢
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <Zap className="w-5 h-5 text-slate-950" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedMerchant(merchant.id);
                    setShowScanner(true);
                    setCurrentView('scan');
                  }}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-slate-950 py-3 rounded-2xl font-bold hover:shadow-xl hover:shadow-rose-500/50 transition-all"
                >
                  Utiliser mes points
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-semibold">{notificationMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-md">
        {currentView === 'home' && <HomeView />}
        {currentView === 'scan' && <ScannerView />}
        {currentView === 'history' && <HistoryView />}
        {currentView === 'merchants' && <MerchantsView />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-900">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around px-4 py-3">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all ${
                currentView === 'home' 
                  ? 'text-rose-400' 
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <Home className="w-6 h-6" strokeWidth={currentView === 'home' ? 2.5 : 2} />
              <span className="text-xs font-medium">Accueil</span>
            </button>
            
            <button
              onClick={() => setCurrentView('scan')}
              className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all ${
                currentView === 'scan' 
                  ? 'text-rose-400' 
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <QrCode className="w-6 h-6" strokeWidth={currentView === 'scan' ? 2.5 : 2} />
              <span className="text-xs font-medium">Scanner</span>
            </button>
            
            <button
              onClick={() => setCurrentView('history')}
              className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all ${
                currentView === 'history' 
                  ? 'text-rose-400' 
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <History className="w-6 h-6" strokeWidth={currentView === 'history' ? 2.5 : 2} />
              <span className="text-xs font-medium">Historique</span>
            </button>
            
            <button
              onClick={() => setCurrentView('merchants')}
              className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all ${
                currentView === 'merchants' 
                  ? 'text-rose-400' 
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <Store className="w-6 h-6" strokeWidth={currentView === 'merchants' ? 2.5 : 2} />
              <span className="text-xs font-medium">Commerces</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            scale: 0.95;
          }
          to {
            opacity: 1;
            scale: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ParkAli;