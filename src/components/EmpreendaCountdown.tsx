import React, { useState, useEffect } from 'react';
import { Award, Clock, ExternalLink, CalendarCheck } from 'lucide-react';
import {
  EMPREENDA_CONFIG,
  getOfficialEmpreendaResultUrl,
  calculateEmpreendaTimeLeft,
  type CountdownTimeLeft,
  type CountdownEventConfig,
} from '../data/empreendaConfig';
import { MusicaOficialCompactBar } from './MusicaOficialCompactBar';
import styles from './EmpreendaCountdown.module.css';

const padTwoDigits = (val: number): string => String(val).padStart(2, '0');

interface EmpreendaCountdownProps {
  /** Opcional para testes de validação de estado (antes/depois das 9h) */
  overrideNowMs?: number;
  /** Configuração customizada do evento para reutilização futura */
  config?: CountdownEventConfig;
}

export const EmpreendaCountdown: React.FC<EmpreendaCountdownProps> = ({
  overrideNowMs,
  config = EMPREENDA_CONFIG,
}) => {
  const [liveTimeLeft, setLiveTimeLeft] = useState<CountdownTimeLeft>(() =>
    calculateEmpreendaTimeLeft(overrideNowMs ?? Date.now(), config.targetDateIso)
  );

  useEffect(() => {
    if (overrideNowMs !== undefined) {
      return;
    }

    const timer = window.setInterval(() => {
      setLiveTimeLeft(calculateEmpreendaTimeLeft(Date.now(), config.targetDateIso));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [overrideNowMs, config.targetDateIso]);

  const timeLeft =
    overrideNowMs !== undefined
      ? calculateEmpreendaTimeLeft(overrideNowMs, config.targetDateIso)
      : liveTimeLeft;

  const officialResultUrl = getOfficialEmpreendaResultUrl(config);

  return (
    <section
      id="empreenda-senac-2026"
      className={styles.section}
      aria-label="Acompanhamento Empreenda Senac 2026"
    >
      <div className="container">
        <div className={styles.bannerCard}>
          <div className={styles.glowAccent} aria-hidden="true" />

          <div className={styles.topRow}>
            <div className={styles.headerContent}>
              <div className={styles.badge}>
                <Award size={16} className={styles.badgeIcon} />
                <span>{config.badgeLabel || 'Jornada Empreenda Senac 2026'}</span>
              </div>

              <h2 className={styles.title}>{config.title}</h2>
              <p className={styles.subtitle}>{config.subtitle}</p>
            </div>

            {!timeLeft.isReached ? (
              <div
                className={styles.countdownGrid}
                role="timer"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Tempo restante: ${timeLeft.days} dias, ${timeLeft.hours} horas, ${timeLeft.minutes} minutos e ${timeLeft.seconds} segundos`}
              >
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue} data-testid="countdown-days">
                    {padTwoDigits(timeLeft.days)}
                  </span>
                  <span className={styles.timeLabel}>
                    {timeLeft.days === 1 ? 'Dia' : 'Dias'}
                  </span>
                </div>

                <span className={styles.timeSeparator} aria-hidden="true">
                  :
                </span>

                <div className={styles.timeBlock}>
                  <span className={styles.timeValue} data-testid="countdown-hours">
                    {padTwoDigits(timeLeft.hours)}
                  </span>
                  <span className={styles.timeLabel}>Horas</span>
                </div>

                <span className={styles.timeSeparator} aria-hidden="true">
                  :
                </span>

                <div className={styles.timeBlock}>
                  <span className={styles.timeValue} data-testid="countdown-minutes">
                    {padTwoDigits(timeLeft.minutes)}
                  </span>
                  <span className={styles.timeLabel}>Minutos</span>
                </div>

                <span className={styles.timeSeparator} aria-hidden="true">
                  :
                </span>

                <div className={`${styles.timeBlock} ${styles.secondsBlock}`}>
                  <span className={styles.timeValue} data-testid="countdown-seconds">
                    {padTwoDigits(timeLeft.seconds)}
                  </span>
                  <span className={styles.timeLabel}>Segundos</span>
                </div>
              </div>
            ) : (
              <div className={styles.reachedBox} role="status" aria-live="polite">
                <div className={styles.reachedHeader}>
                  <CalendarCheck size={24} className={styles.reachedIcon} />
                  <p className={styles.reachedTitle} data-testid="empreenda-reached-msg">
                    {config.reachedMessage}
                  </p>
                </div>
                <p className={styles.reachedNote}>
                  A divulgação oficial dos projetos finalistas é realizada diretamente pelos canais oficiais do Empreenda Senac.
                </p>
                <div className={styles.reachedActions}>
                  <a
                    href={officialResultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.officialButton}
                    data-testid="empreenda-official-btn"
                  >
                    <span>{config.officialButtonLabel}</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className={styles.footerRow}>
            <p className={styles.disclaimer}>
              <Clock size={15} className={styles.disclaimerIcon} aria-hidden="true" />
              <span>{config.disclaimerText}</span>
            </p>

            {!timeLeft.isReached && (
              <a
                href={officialResultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.portalLink}
              >
                <span>Página oficial do Empreenda Senac</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <MusicaOficialCompactBar />
        </div>
      </div>
    </section>
  );
};
