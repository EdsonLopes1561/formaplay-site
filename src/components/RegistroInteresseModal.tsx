import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import styles from './RegistroInteresseModal.module.css';
import { supabase } from '../supabase';

interface RegistroInteresseModalProps {
  isOpen: boolean;
  onClose: () => void;
  modeloSelecionado: string;
}

export const RegistroInteresseModal: React.FC<RegistroInteresseModalProps> = ({
  isOpen,
  onClose,
  modeloSelecionado,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    cidade: '',
    estado: '',
    tipo_interessado: '',
    finalidade_uso: '',
    quantidade_estimada: '',
    interesse_personalizacao: '',
    observacoes: '',
    aceita_contato: false,
    _honey: '', // honeypot
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot check
    if (formData._honey) {
      // Simulate success for bots
      setSuccess(true);
      return;
    }

    if (!formData.nome.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }
    if (!formData.whatsapp.trim() && !formData.email.trim()) {
      setError('Por favor, informe WhatsApp ou E-mail para contato.');
      return;
    }
    if (!formData.aceita_contato) {
      setError('É necessário autorizar o contato para registrar seu interesse.');
      return;
    }

    setLoading(true);

    try {
      const { error: sbError } = await supabase.from('interesses_modelos').insert([
        {
          nome: formData.nome.slice(0, 150),
          whatsapp: formData.whatsapp ? formData.whatsapp.slice(0, 30) : null,
          email: formData.email ? formData.email.slice(0, 180) : null,
          cidade: formData.cidade,
          estado: formData.estado,
          tipo_interessado: formData.tipo_interessado || null,
          modelo_interesse: modeloSelecionado,
          finalidade_uso: formData.finalidade_uso,
          quantidade_estimada: formData.quantidade_estimada ? parseInt(formData.quantidade_estimada, 10) : null,
          interesse_personalizacao: formData.interesse_personalizacao || null,
          observacoes: formData.observacoes ? formData.observacoes.slice(0, 3000) : null,
          aceita_contato: formData.aceita_contato,
        },
      ]);

      if (sbError) {
        console.error(sbError);
        throw new Error('Não foi possível registrar seu interesse no momento.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar interesse.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setFormData({
      nome: '',
      whatsapp: '',
      email: '',
      cidade: '',
      estado: '',
      tipo_interessado: '',
      finalidade_uso: '',
      quantidade_estimada: '',
      interesse_personalizacao: '',
      observacoes: '',
      aceita_contato: false,
      _honey: '',
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>Registro de Interesse</h3>
            <p className={styles.modalSubtitle}>{modeloSelecionado}</p>
          </div>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {success ? (
            <div className={styles.successState}>
              <CheckCircle className={styles.successIcon} />
              <h4 className={styles.successTitle}>Interesse registrado com sucesso!</h4>
              <p className={styles.successText}>
                Obrigado por acompanhar os novos projetos da FormaPlay. Seu contato foi registrado e será considerado durante o desenvolvimento do modelo selecionado. Entraremos em contato quando houver novidades, materiais de apresentação, testes ou previsão de lançamento.
              </p>
              <button className={styles.successButton} onClick={handleClose}>
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="_honey"
                value={formData._honey}
                onChange={handleChange}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className={styles.formGroup}>
                <label className={styles.label}>Nome completo <span>*</span></label>
                <input
                  type="text"
                  name="nome"
                  required
                  maxLength={150}
                  className={styles.input}
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    maxLength={30}
                    className={styles.input}
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    maxLength={180}
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    className={styles.input}
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Estado (UF)</label>
                  <input
                    type="text"
                    name="estado"
                    maxLength={2}
                    className={styles.input}
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="Ex: SP"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Perfil</label>
                <select name="tipo_interessado" className={styles.select} value={formData.tipo_interessado} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="pessoa_fisica">Pessoa física</option>
                  <option value="professor_instrutor">Professor ou instrutor</option>
                  <option value="instituicao_ensino">Escola ou instituição de ensino</option>
                  <option value="empresa">Empresa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Finalidade de uso</label>
                <input
                  type="text"
                  name="finalidade_uso"
                  className={styles.input}
                  value={formData.finalidade_uso}
                  onChange={handleChange}
                  placeholder="Ex: Treinamento corporativo, aula de logística..."
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quantidade estimada</label>
                  <input
                    type="number"
                    name="quantidade_estimada"
                    min="1"
                    className={styles.input}
                    value={formData.quantidade_estimada}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Interesse em personalização</label>
                  <select name="interesse_personalizacao" className={styles.select} value={formData.interesse_personalizacao} onChange={handleChange}>
                    <option value="">Selecione...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                    <option value="talvez">Talvez</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Sugestão, necessidade ou observações</label>
                <textarea
                  name="observacoes"
                  maxLength={3000}
                  className={styles.textarea}
                  value={formData.observacoes}
                  onChange={handleChange}
                  placeholder="Compartilhe como gostaria de utilizar este modelo..."
                />
              </div>

              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="aceite"
                  name="aceita_contato"
                  required
                  checked={formData.aceita_contato}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <label htmlFor="aceite" className={styles.checkboxLabel}>
                  Autorizo a FormaPlay a entrar em contato e enviar novidades sobre o modelo selecionado. <span>*</span>
                </label>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Enviando...' : 'Registrar Interesse'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
