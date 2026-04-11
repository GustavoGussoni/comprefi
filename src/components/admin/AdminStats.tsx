import React from 'react';

interface AdminStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    new: number;
    used: number;
  };
}

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.total,
      icon: '📱',
      color: 'blue',
      description: 'Produtos cadastrados',
    },
    {
      title: 'Produtos Ativos',
      value: stats.active,
      icon: '✅',
      color: 'green',
      description: 'Disponíveis para venda',
    },
    {
      title: 'Produtos Inativos',
      value: stats.inactive,
      icon: '❌',
      color: 'red',
      description: 'Fora de linha',
    },
    {
      title: 'Produtos Novos',
      value: stats.new,
      icon: '🆕',
      color: 'purple',
      description: 'Lacrados',
    },
    {
      title: 'Produtos Seminovos',
      value: stats.used,
      icon: '🔄',
      color: 'yellow',
      description: 'Testados e aprovados',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-900 border-blue-700 text-blue-300',
      green: 'bg-green-900 border-green-700 text-green-300',
      red: 'bg-red-900 border-red-700 text-red-300',
      purple: 'bg-purple-900 border-purple-700 text-purple-300',
      yellow: 'bg-yellow-900 border-yellow-700 text-yellow-300',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg border ${getColorClasses(card.color)} transition-transform hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{card.icon}</div>
            <div className="text-right">
              <div className="text-3xl font-bold">{card.value}</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">{card.title}</h3>
            <p className="text-sm opacity-80">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;

