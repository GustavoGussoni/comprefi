import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ValorTroca {
  id: string;
  modelo: string;
  capacidade: string;
  valorBase: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ValorTrocaStats {
  total: number;
  ativos: number;
  inativos: number;
  totalModelos: number;
}

const ValorTrocaTable: React.FC = () => {
  const [valores, setValores] = useState<ValorTroca[]>([]);
  const [stats, setStats] = useState<ValorTrocaStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAtivo, setFilterAtivo] = useState<string>("all");

  // Estado para edição inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  // Estado para novo valor
  const [showAddForm, setShowAddForm] = useState(false);
  const [newModelo, setNewModelo] = useState("");
  const [newCapacidade, setNewCapacidade] = useState("");
  const [newValorBase, setNewValorBase] = useState<number>(0);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("admin_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [valoresRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/trade/valores`).then((r) => r.json()),
        fetch(`${API_URL}/trade/valores/stats`).then((r) => r.json()),
      ]);
      setValores(valoresRes);
      setStats(statsRes);
    } catch (err) {
      setError("Erro ao carregar valores de troca");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtrar valores
  const filteredValores = valores.filter((v) => {
    const matchesSearch =
      v.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.capacidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAtivo =
      filterAtivo === "all" ||
      (filterAtivo === "true" && v.ativo) ||
      (filterAtivo === "false" && !v.ativo);
    return matchesSearch && matchesAtivo;
  });

  // Agrupar por modelo
  const groupedByModelo = filteredValores.reduce(
    (acc, v) => {
      if (!acc[v.modelo]) acc[v.modelo] = [];
      acc[v.modelo].push(v);
      return acc;
    },
    {} as Record<string, ValorTroca[]>
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // ---- Handlers ----

  const handleStartEdit = (valor: ValorTroca) => {
    setEditingId(valor.id);
    setEditValue(valor.valorBase);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await fetch(`${API_URL}/trade/valores/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ valorBase: editValue }),
      });
      setEditingId(null);
      loadData();
    } catch (err) {
      alert("Erro ao atualizar valor");
      console.error(err);
    }
  };

  const handleToggleAtivo = async (valor: ValorTroca) => {
    try {
      await fetch(`${API_URL}/trade/valores/${valor.id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ativo: !valor.ativo }),
      });
      loadData();
    } catch (err) {
      alert("Erro ao atualizar status");
      console.error(err);
    }
  };

  const handleDelete = async (id: string, modelo: string, capacidade: string) => {
    if (!confirm(`Deletar ${modelo} ${capacidade}? Essa ação não pode ser desfeita.`))
      return;

    try {
      await fetch(`${API_URL}/trade/valores/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      loadData();
    } catch (err) {
      alert("Erro ao deletar");
      console.error(err);
    }
  };

  const handleAddNew = async () => {
    if (!newModelo || !newCapacidade || !newValorBase) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await fetch(`${API_URL}/trade/valores`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          modelo: newModelo,
          capacidade: newCapacidade,
          valorBase: newValorBase,
        }),
      });
      setShowAddForm(false);
      setNewModelo("");
      setNewCapacidade("");
      setNewValorBase(0);
      loadData();
    } catch (err) {
      alert("Erro ao criar valor. Verifique se a combinação modelo+capacidade já existe.");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-white">Carregando valores de troca...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Ativos</p>
            <p className="text-2xl font-bold text-green-400">{stats.ativos}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Inativos</p>
            <p className="text-2xl font-bold text-red-400">{stats.inativos}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Modelos</p>
            <p className="text-2xl font-bold text-blue-400">{stats.totalModelos}</p>
          </div>
        </div>
      )}

      {/* Filtros + Ações */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar modelo
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="iPhone 15 Pro..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filterAtivo}
              onChange={(e) => setFilterAtivo(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {showAddForm ? "Cancelar" : "+ Novo Valor"}
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadData}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Atualizar
            </button>
          </div>
        </div>

        {/* Formulário de Novo Valor */}
        {showAddForm && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-3">Adicionar Novo Valor de Troca</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Modelo</label>
                <input
                  type="text"
                  value={newModelo}
                  onChange={(e) => setNewModelo(e.target.value)}
                  placeholder="iPhone 17 Pro"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Capacidade</label>
                <input
                  type="text"
                  value={newCapacidade}
                  onChange={(e) => setNewCapacidade(e.target.value)}
                  placeholder="256GB"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Valor Base (R$)</label>
                <input
                  type="number"
                  value={newValorBase || ""}
                  onChange={(e) => setNewValorBase(Number(e.target.value))}
                  placeholder="3500"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddNew}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabela agrupada por modelo */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {Object.keys(groupedByModelo).length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-2">Nenhum valor encontrado</p>
          <p className="text-sm">Adicione valores de troca ou ajuste os filtros</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByModelo).map(([modelo, items]) => (
            <div key={modelo} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <h3 className="text-white font-semibold">{modelo}</h3>
                <span className="text-gray-400 text-sm">
                  {items.length} {items.length === 1 ? "variação" : "variações"}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                      <th className="px-4 py-3">Capacidade</th>
                      <th className="px-4 py-3">Valor Base</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Atualizado</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .sort((a, b) => {
                        const order = ["64GB", "128GB", "256GB", "512GB", "1TB"];
                        return order.indexOf(a.capacidade) - order.indexOf(b.capacidade);
                      })
                      .map((valor) => (
                        <tr key={valor.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="px-4 py-3 text-white font-medium">
                            {valor.capacidade}
                          </td>
                          <td className="px-4 py-3">
                            {editingId === valor.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={editValue}
                                  onChange={(e) => setEditValue(Number(e.target.value))}
                                  className="w-32 px-2 py-1 bg-gray-700 border border-blue-500 rounded text-white focus:outline-none"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveEdit(valor.id)}
                                  className="text-green-400 hover:text-green-300 text-sm font-medium"
                                >
                                  Salvar
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <span
                                className="text-green-400 font-medium cursor-pointer hover:underline"
                                onClick={() => handleStartEdit(valor)}
                                title="Clique para editar"
                              >
                                {formatCurrency(valor.valorBase)}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleToggleAtivo(valor)}
                              className={`text-xs px-2 py-1 rounded cursor-pointer ${
                                valor.ativo
                                  ? "bg-green-900 text-green-300 hover:bg-green-800"
                                  : "bg-red-900 text-red-300 hover:bg-red-800"
                              }`}
                            >
                              {valor.ativo ? "Ativo" : "Inativo"}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-sm">
                            {new Date(valor.updatedAt).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleStartEdit(valor)}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(valor.id, valor.modelo, valor.capacidade)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Deletar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValorTrocaTable;
