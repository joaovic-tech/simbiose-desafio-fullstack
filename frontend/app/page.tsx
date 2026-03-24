'use client';

import { useEffect, useState } from 'react';
import { api, Person, PersonInput } from '@/lib/api';
import { PersonModal } from '@/components/PersonModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Search, Users, RefreshCw, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const fetchPersons = async () => {
    setIsLoading(true);
    try {
      const data = await api.getPersons();
      setPersons(data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar a lista de pessoas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleSave = async (data: PersonInput, id?: number) => {
    try {
      if (id) {
        await api.updatePerson(id, data);
        toast.success('Pessoa atualizada com sucesso!');
      } else {
        await api.createPerson(data);
        toast.success('Pessoa cadastrada com sucesso!');
      }
      fetchPersons();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao salvar os dados.');
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedPerson) return;
    try {
      await api.deletePerson(selectedPerson.id);
      toast.success('Registro excluído com sucesso!');
      setSelectedPerson(null);
      fetchPersons();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir registro.');
    }
  };

  const openAddModal = () => {
    setSelectedPerson(null);
    setIsModalOpen(true);
  };

  const openEditModal = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const openDeleteModal = (person: Person) => {
    setSelectedPerson(person);
    setIsDeleteModalOpen(true);
  };

  const filteredPersons = persons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#112342] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

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

          <Button onClick={openAddModal} size="lg">
            <Plus className="w-5 h-5" />
            Nova Pessoa
          </Button>
        </header>

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

          <Button variant="outline" size="sm" onClick={fetchPersons}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

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
                ) : filteredPersons.length === 0 ? (
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
                  filteredPersons.map((person, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={person.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{person.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {person.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {person.birthDate ? format(parseISO(person.birthDate), 'dd/MM/yyyy', { locale: ptBR }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="icon"
                            size="icon"
                            onClick={() => openEditModal(person)}
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="icon-destructive"
                            size="icon"
                            onClick={() => openDeleteModal(person)}
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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

      <PersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        person={selectedPerson}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedPerson?.name}
      />
    </div>
  );
}
