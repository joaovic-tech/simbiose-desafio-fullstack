'use client';

import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  itemName?: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir o registro.');
    } finally {
      setIsDeleting(false);
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
            className="relative w-full max-w-sm bg-[#112342] border border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden p-6 text-center"
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">
              Confirmar Exclusão
            </h3>
            
            <p className="text-gray-300 mb-6 text-sm">
              Tem certeza que deseja excluir {itemName ? <strong className="text-white">{itemName}</strong> : 'este registro'}? Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-center gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Excluir'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
