import React from 'react';
import styles from './ParaQuemEIndicado.module.css';
import { GraduationCap, Building2, UserCircle, Users2, Landmark } from 'lucide-react';

export const ParaQuemEIndicado: React.FC = () => {
  const publicos = [
    {
      icon: <GraduationCap />,
      title: "Escolas técnicas",
      description: "Ideal para cursos ligados à logística, administração, gestão, comércio, produção e áreas correlatas."
    },
    {
      icon: <Landmark />,
      title: "SENAI, SENAC e instituições de ensino",
      description: "Uma ferramenta didática para enriquecer aulas, dinâmicas e projetos educacionais."
    },
    {
      icon: <UserCircle />,
      title: "Professores e instrutores",
      description: "Apoia o professor com uma atividade prática, envolvente e conectada ao mundo real."
    },
    {
      icon: <Users2 />,
      title: "Alunos",
      description: "Ajuda o aluno a aprender de forma ativa, participando, decidindo, errando, acertando e evoluindo."
    },
    {
      icon: <Building2 />,
      title: "Empresas e treinamentos",
      description: "Pode ser utilizado em dinâmicas de integração, capacitação e desenvolvimento de equipes."
    }
  ];

  return (
    <section id="para-quem-e" className={`section ${styles.indicado}`}>
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="section-title">Indicado para instituições que valorizam aprendizagem prática</h2>
        </div>

        <div className={styles.grid}>
          {publicos.map((item, index) => (
            <div key={index} className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
