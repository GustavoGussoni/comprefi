import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Questionario {
  id: string;
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;
  defeitos: string[] | null;
  pecasTrocadas: boolean;
  quaisPecas: string | null;
  modeloDesejado: string;
  ondeOuviu: string | null;
  tempoPensando: string | null;
  urgenciaTroca: string | null;
  valorAparelho: number | null;
  valorFinal: number | null;
  temDefeito: boolean;
  precisaCotacao: boolean;
  nome: string | null;
  email: string | null;
  whatsapp: string | null;
  etapaAtual: number;
  concluido: boolean;
  createdAt: string;
}

interface QuestionarioStats {
  total: number;
  concluidos: number;
  pendentes: number;
  precisamCotacao: number;
  ultimaSemana: number;
  modelosDesejados: { modelo: string; count: number }[];
  modelosAtuais: { modelo: string; count: number }[];
  origens: { origem: string; count: number }[];
}

const QuestionarioTable: React.FC = () => {
  const [questionarios, setQuestionarios] = useState<Questionario[]>([]);
  const [stats, setStats] = useState<QuestionarioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("admin_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const loadData = async (pageNum = 1) => {
    try {
      setLoading(true);
      const [questRaw, statsRaw] = await Promise.all([
        fetch(`${API_URL}/trade/questionarios?page=${pageNum}&limit=15`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_URL}/trade/questionarios/stats`, {
          headers: getAuthHeaders(),
        }),
      ]);

      if (questRaw.status === 401 || statsRaw.status === 401) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        window.dispatchEvent(new Event("auth:expired"));
        return;
      }

      const [questRes, statsRes] = await Promise.all([
        questRaw.json(),
        statsRaw.json(),
      ]);

      setQuestionarios(questRes.data || []);
      setTotalPages(questRes.pagination?.totalPages || 1);
      setTotal(questRes.pagination?.total || 0);
      setStats(statsRes);
    } catch (err) {
      console.error("Erro ao carregar questionários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return "—";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleMarkConcluido = async (id: string) => {
    try {
      await fetch(`${API_URL}/trade/questionarios/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ concluido: true }),
      });
      loadData(page);
    } catch (err) {
      alert("Erro ao atualizar");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deletar este questionário?")) return;
    try {
      await fetch(`${API_URL}/trade/questionarios/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      loadData(page);
    } catch (err) {
      alert("Erro ao deletar");
    }
  };

  // Filtrar por busca local
  const filtered = questionarios.filter(
    (q) =>
      !searchTerm ||
      q.modeloAtual.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.modeloDesejado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.nome && q.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && questionarios.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-white">Carregando questionários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Última Semana</p>
            <p className="text-2xl font-bold text-blue-400">{stats.ultimaSemana}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Concluídos</p>
            <p className="text-2xl font-bold text-green-400">{stats.concluidos}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pendentes}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm">Cotação Manual</p>
            <p className="text-2xl font-bold text-orange-400">{stats.precisamCotacao}</p>
          </div>
        </div>
      )}

      {/* Insights */}
      {stats && (stats.modelosDesejados.length > 0 || stats.origens.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Modelos mais desejados */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h4 className="text-white font-medium mb-3">Mais Desejados</h4>
            <div className="space-y-2">
              {stats.modelosDesejados.map((m, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-300">{m.modelo}</span>
                  <span className="text-blue-400 font-medium">{m.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modelos mais trocados */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h4 className="text-white font-medium mb-3">Mais Trocados</h4>
            <div className="space-y-2">
              {stats.modelosAtuais.map((m, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-300">{m.modelo}</span>
                  <span className="text-green-400 font-medium">{m.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Origens */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h4 className="text-white font-medium mb-3">Origem dos Leads</h4>
            <div className="space-y-2">
              {stats.origens.map((o, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-300">{o.origem || "Não informado"}</span>
                  <span className="text-purple-400 font-medium">{o.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Busca */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por modelo, nome..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabela */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-2">Nenhum questionário encontrado</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-800 bg-gray-800">
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Aparelho Atual</th>
                  <th className="px-4 py-3">Desejado</th>
                  <th className="px-4 py-3">Valor Aparelho</th>
                  <th className="px-4 py-3">Valor a Pagar</th>
                  <th className="px-4 py-3">Urgência</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <React.Fragment key={q.id}>
                    <tr
                      className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                      onClick={() =>
                        setExpandedId(expandedId === q.id ? null : q.id)
                      }
                    >
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white font-medium">
                          {q.modeloAtual}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">
                          {q.capacidadeAtual}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-blue-400">
                        {q.modeloDesejado}
                      </td>
                      <td className="px-4 py-3 text-green-400 font-medium">
                        {formatCurrency(q.valorAparelho)}
                      </td>
                      <td className="px-4 py-3 text-yellow-400 font-medium">
                        {formatCurrency(q.valorFinal)}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        {q.urgenciaTroca || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {q.concluido ? (
                          <span className="text-xs px-2 py-1 rounded bg-green-900 text-green-300">
                            Concluído
                          </span>
                        ) : q.precisaCotacao ? (
                          <span className="text-xs px-2 py-1 rounded bg-orange-900 text-orange-300">
                            Cotação
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-yellow-900 text-yellow-300">
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {!q.concluido && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkConcluido(q.id);
                              }}
                              className="text-green-400 hover:text-green-300 text-sm"
                              title="Marcar como concluído"
                            >
                              Concluir
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(q.id);
                            }}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Detalhes expandidos */}
                    {expandedId === q.id && (
                      <tr className="bg-gray-800/30">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Cor</p>
                              <p className="text-white">{q.corAtual}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Bateria</p>
                              <p className="text-white">{q.bateriaAtual}%</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Defeitos</p>
                              <p className="text-white">
                                {q.defeitos && Array.isArray(q.defeitos) && q.defeitos.length > 0
                                  ? (q.defeitos as string[]).join(", ")
                                  : "Nenhum"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Peças Trocadas</p>
                              <p className="text-white">
                                {q.pecasTrocadas
                                  ? q.quaisPecas || "Sim"
                                  : "Não"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Onde Ouviu</p>
                              <p className="text-white">{q.ondeOuviu || "—"}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Tempo Pensando</p>
                              <p className="text-white">
                                {q.tempoPensando || "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Contato</p>
                              <p className="text-white">
                                {q.nome || q.email || q.whatsapp || "Não informado"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Etapa</p>
                              <p className="text-white">{q.etapaAtual}/10</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Mostrando página {page} de {totalPages} ({total} total)
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionarioTable;
