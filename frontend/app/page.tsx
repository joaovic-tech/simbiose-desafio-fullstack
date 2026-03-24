'use client';

import { useEffect, useState } from 'react';
import { api, Pessoa, PessoaInput } from '@/lib/api';
import { PessoaModal } from '@/components/PessoaModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Plus, Edit2, Trash2, Search, Users, RefreshCw, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function Home() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);

  const fetchPessoas = async () => {
    setIsLoading(true);
    try {
      const data = await api.getPessoas();
      setPessoas(data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar a lista de pessoas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const handleSave = async (data: PessoaInput, id?: number) => {
    try {
      if (id) {
        await api.updatePessoa(id, data);
        toast.success('Pessoa atualizada com sucesso!');
      } else {
        await api.createPessoa(data); // Using the correct method from api.ts
        toast.success('Pessoa cadastrada com sucesso!');
      }
      fetchPessoas();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao salvar os dados.');
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedPessoa) return;
    try {
      await api.deletePessoa(selectedPessoa.id);
      toast.success('Registro excluído com sucesso!');
      setSelectedPessoa(null);
      fetchPessoas();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir registro.');
    }
  };

  const openAddModal = () => {
    setSelectedPessoa(null);
    setIsModalOpen(true);
  };

  const openEditModal = (pessoa: Pessoa) => {
    setSelectedPessoa(pessoa);
    setIsModalOpen(true);
  };

  const openDeleteModal = (pessoa: Pessoa) => {
    setSelectedPessoa(pessoa);
    setIsDeleteModalOpen(true);
  };

  const filteredPessoas = pessoas.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#112342] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-[#70a7cb]" />
              Gestão de Pessoas
            </h1>
            <p className="text-[#70a7cb]/80 mt-2 font-medium">
              MVP - Simbiose Desafio Fullstack
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-[#192c4c] hover:bg-[#112342] border border-[#70a7cb] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#192c4c]/20 hover:shadow-[#70a7cb]/20"
          >
            <Plus className="w-5 h-5" />
            Nova Pessoa
          </button>
        </header>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#192c4c] p-4 rounded-2xl border border-[#70a7cb]/30">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#70a7cb]" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#112342] border border-[#70a7cb]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#70a7cb] transition-all"
            />
          </div>

          <button
            onClick={fetchPessoas}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#70a7cb] hover:text-white bg-[#112342] border border-[#70a7cb]/30 hover:border-[#70a7cb] rounded-xl transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-[#192c4c] border border-[#70a7cb]/30 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#112342]/50 border-b border-[#70a7cb]/30">
                  <th className="px-6 py-4 text-sm font-medium text-[#70a7cb] uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-sm font-medium text-[#70a7cb] uppercase tracking-wider">E-mail</th>
                  <th className="px-6 py-4 text-sm font-medium text-[#70a7cb] uppercase tracking-wider">Data de Nascimento</th>
                  <th className="px-6 py-4 text-sm font-medium text-[#70a7cb] uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#70a7cb]/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#70a7cb]" />
                      Carregando dados...
                    </td>
                  </tr>
                ) : filteredPessoas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="w-12 h-12 mb-4 opacity-20 text-[#70a7cb]" />
                        <p className="text-lg text-[#70a7cb]">Nenhuma pessoa encontrada.</p>
                        {searchQuery && (
                          <p className="text-sm mt-1">Tente ajustar os termos da sua busca.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPessoas.map((pessoa, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={pessoa.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{pessoa.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {pessoa.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {pessoa.birthDate ? format(parseISO(pessoa.birthDate), 'dd/MM/yyyy', { locale: ptBR }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(pessoa)}
                            className="p-2 text-[#70a7cb] hover:text-white hover:bg-[#70a7cb]/10 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(pessoa)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PessoaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        pessoa={selectedPessoa}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedPessoa?.name}
      />
    </div>
  );
}
