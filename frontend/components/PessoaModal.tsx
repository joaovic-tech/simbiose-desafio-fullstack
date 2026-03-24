'use client';

import { useEffect, useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { parseISO, format } from 'date-fns';
import { Pessoa, PessoaInput } from '@/lib/api';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod schema based on PersonEntity and CreatePersonDTO
const pessoaSchema = z.object({
  name: z.string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),
  email: z.string()
    .email({ message: 'E-mail inválido' }),
  birthDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data de nascimento inválida' })
    .refine((val) => new Date(val) <= new Date(), { message: 'A data de nascimento não pode ser futura' })
});

type PessoaFormData = z.infer<typeof pessoaSchema>;

interface PessoaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PessoaInput, id?: number) => Promise<void>;
  pessoa?: Pessoa | null;
}

export function PessoaModal({ isOpen, onClose, onSave, pessoa }: PessoaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PessoaFormData>({
    resolver: zodResolver(pessoaSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (pessoa) {
        reset({
          name: pessoa.name,
          email: pessoa.email,
          birthDate: format(parseISO(pessoa.birthDate), 'yyyy-MM-dd')
        });
      } else {
        reset({
          name: '',
          email: '',
          birthDate: ''
        });
      }
    }
  }, [pessoa, isOpen, reset]);

  const onSubmit = async (data: PessoaFormData) => {
    setIsSubmitting(true);
    try {
      await onSave(data as PessoaInput, pessoa?.id);
      onClose();
    } catch (error: any) {
      console.error(error);
      const message = error.message || 'Erro ao salvar os dados.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#112342] border border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#1f2937]">
              <h2 className="text-xl font-semibold text-white">
                {pessoa ? 'Editar Pessoa' : 'Nova Pessoa'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Nome Completo
                </label>
                <input
                  id="name"
                  {...register('name')}
                  type="text"
                  className={`w-full px-4 py-2.5 bg-[#192c4c] border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#70a7cb] focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-[#1f2937]'
                  }`}
                  placeholder="Ex: João Silva"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs italic">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  E-mail
                </label>
                <input
                  id="email"
                  {...register('email')}
                  type="email"
                  className={`w-full px-4 py-2.5 bg-[#192c4c] border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#70a7cb] focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-[#1f2937]'
                  }`}
                  placeholder="joao@exemplo.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs italic">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="birthDate" className="text-sm font-medium text-gray-300">
                  Data de Nascimento
                </label>
                <input
                  id="birthDate"
                  {...register('birthDate')}
                  type="date"
                  className={`w-full px-4 py-2.5 bg-[#192c4c] border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#70a7cb] focus:border-transparent transition-all [color-scheme:dark] ${
                    errors.birthDate ? 'border-red-500' : 'border-[#1f2937]'
                  }`}
                />
                {errors.birthDate && (
                  <p className="text-red-400 text-xs italic">{errors.birthDate.message}</p>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-transparent hover:bg-white/5 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#192c4c] hover:bg-[#112342] border border-[#70a7cb] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {pessoa ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
