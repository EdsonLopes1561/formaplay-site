import React, { useState, useRef, useMemo, useCallback } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { Plus, Minus, Search } from 'lucide-react';
import styles from './MapaBrasil.module.css';
import type { PresencaCidade, MetricType } from '../data/presencaData';
import brasilEstados from '../assets/data/brasil_estados.json';

interface MapaBrasilProps {
  nodes: PresencaCidade[];
  metric: MetricType;
  ufs: string[];
  isModal?: boolean;
  onExpand?: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  vendas: '#22c55e',
  orcamentos: '#f97316',
  solicitacoes: '#3b82f6',
  interesses: '#a855f7'
};

export const MapaBrasil: React.FC<MapaBrasilProps> = ({
  nodes,
  metric,
  ufs,
  isModal = false,
  onExpand
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    city: PresencaCidade;
    x: number;
    y: number;
  } | null>(null);

  // Pan & Zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0
  });

  const width = 640;
  const height = 580;

  // D3 Projection and Path Generator
  const projection = useMemo(() => {
    return geoMercator()
      .scale(820)
      .center([-53.5, -15])
      .translate([width / 2, height / 2]);
  }, []);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // Filter nodes based on selected metric
  const validNodes = useMemo(() => {
    return nodes.filter((n) => {
      if (!n.lat || !n.lng) return false;
      if (metric === 'vendas' && n.vendas === 0) return false;
      if (metric === 'orcamentos' && n.orcamentos === 0) return false;
      if (metric === 'solicitacoes' && n.solicitacoes === 0) return false;
      if (metric === 'interesses' && n.interesses === 0) return false;
      if (metric === 'todos' && n.totalSinais === 0) return false;
      return true;
    });
  }, [nodes, metric]);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.35, 5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.35, 0.85));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setTooltipData(null);
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStartRef.current.x) / zoom;
    const dy = (e.clientY - dragStartRef.current.y) / zoom;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = (e.touches[0].clientX - dragStartRef.current.x) / zoom;
    const dy = (e.touches[0].clientY - dragStartRef.current.y) / zoom;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Node marker click / hover
  const handleNodeClick = useCallback(
    (node: PresencaCidade, e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      const posX = clientX - rect.left;
      const posY = clientY - rect.top;

      setTooltipData({
        city: node,
        x: Math.min(Math.max(posX, 120), rect.width - 120),
        y: Math.max(posY - 120, 20)
      });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={`${styles.mapWrapper} ${isModal ? styles.isModal : ''}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => setTooltipData(null)}
    >
      {/* Background Ambient Radial Glow */}
      <div className={styles.mapAmbientGlow}></div>

      {/* Zoom Controls Pill on Map */}
      <div className={styles.zoomControls}>
        <button
          className={styles.zoomBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          aria-label="Aumentar zoom"
          title="Aumentar zoom"
        >
          <Plus size={16} />
        </button>
        <div className={styles.zoomDivider}></div>
        <button
          className={styles.zoomBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          aria-label="Diminuir zoom"
          title="Diminuir zoom"
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Handwritten Hint with Curved Arrow */}
      <div className={styles.interactiveHint}>
        <span className={styles.hintText}>Clique nos pontos para ver detalhes</span>
        <svg className={styles.hintArrowSvg} viewBox="0 0 50 40">
          <path d="M 45 5 Q 30 25 10 32" strokeDasharray="3 3" />
          <polyline points="18,25 8,33 16,38" fill="none" />
        </svg>
      </div>

      {/* Bottom Button "Ver mapa ampliado" ou "Centralizar" */}
      {!isModal ? (
        <button
          className={styles.expandMapBtn}
          onClick={(e) => {
            e.stopPropagation();
            if (onExpand) {
              onExpand();
            } else {
              handleReset();
            }
          }}
          aria-label="Ver mapa ampliado"
        >
          <Search size={14} />
          <span>Ver mapa ampliado</span>
        </button>
      ) : (zoom !== 1 || pan.x !== 0 || pan.y !== 0) ? (
        <button
          className={styles.expandMapBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          aria-label="Centralizar mapa"
        >
          <Search size={14} />
          <span>Centralizar mapa</span>
        </button>
      ) : null}

      {/* SVG Map */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.mapSvg}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <g
          transform={`scale(${zoom}) translate(${pan.x + (width / 2) * (1 - 1 / zoom)}, ${
            pan.y + (height / 2) * (1 - 1 / zoom)
          })`}
        >
          {/* Brazil States */}
          {(brasilEstados as any).features.map((feature: any) => {
            const uf = feature.properties.uf;
            const hasPresence = ufs.includes(uf);
            const pathData = pathGenerator(feature);
            if (!pathData) return null;

            return (
              <path
                key={feature.properties.codigoIbge || uf}
                d={pathData}
                className={`${styles.statePath} ${hasPresence ? styles.statePathActive : ''}`}
              />
            );
          })}

          {/* State UF Labels */}
          {(brasilEstados as any).features.map((feature: any) => {
            const uf = feature.properties.uf;
            if (!feature.properties.labelLng || !feature.properties.labelLat) return null;
            const labelCoords = projection([
              feature.properties.labelLng,
              feature.properties.labelLat
            ]);
            if (!labelCoords) return null;

            return (
              <text
                key={`label-${uf}`}
                x={labelCoords[0]}
                y={labelCoords[1]}
                className={styles.stateLabel}
              >
                {uf}
              </text>
            );
          })}

          {/* City Markers */}
          {validNodes.map((node) => {
            const coords = projection([node.lng, node.lat]);
            if (!coords) return null;
            const [cx, cy] = coords;
            const isSelected = tooltipData?.city.key === node.key;
            const primaryColor = TYPE_COLORS[node.primaryType] || '#22c55e';
            const hasMultipleSignals = node.totalSinais > 2;

            return (
              <g
                key={node.key}
                transform={`translate(${cx}, ${cy})`}
                className={`${styles.markerGroup} ${isSelected ? styles.markerActive : ''}`}
                onMouseEnter={(e) => handleNodeClick(node, e)}
                onClick={(e) => handleNodeClick(node, e)}
                onTouchStart={(e) => handleNodeClick(node, e)}
              >
                {/* Outer animated halo */}
                <circle
                  r={12 / Math.sqrt(zoom)}
                  fill={primaryColor}
                  className={styles.markerOuterHalo}
                />

                {/* Concentric rings for high activity hubs */}
                {hasMultipleSignals && (
                  <circle
                    r={8 / Math.sqrt(zoom)}
                    stroke={primaryColor}
                    className={styles.markerConcentricRing}
                  />
                )}

                {/* Hitbox */}
                <circle r={18 / Math.sqrt(zoom)} fill="transparent" />

                {/* Main Core Dot */}
                <circle
                  r={isSelected ? 6 / Math.sqrt(zoom) : 4.5 / Math.sqrt(zoom)}
                  fill={primaryColor}
                  className={styles.markerCore}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Tooltip Card */}
      {tooltipData && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className={styles.tooltipHeader}>
            <span className={styles.tooltipCity}>{tooltipData.city.cidade}</span>
            <span className={styles.tooltipState}>{tooltipData.city.estado}</span>
          </div>
          <div className={styles.tooltipTotalRow}>
            <span className={styles.tooltipTotalLabel}>Sinais no Município</span>
            <span className={styles.tooltipTotalVal}>{tooltipData.city.totalSinais}</span>
          </div>
          <div className={styles.tooltipList}>
            {tooltipData.city.vendas > 0 && (
              <div className={`${styles.tooltipItem} ${styles.itemVendas}`}>
                <span>Vendas confirmadas:</span>
                <strong>
                  {tooltipData.city.vendas} ({tooltipData.city.unidadesVendidas} un.)
                </strong>
              </div>
            )}
            {tooltipData.city.orcamentos > 0 && (
              <div className={`${styles.tooltipItem} ${styles.itemOrcamentos}`}>
                <span>Orçamentos emitidos:</span>
                <strong>{tooltipData.city.orcamentos}</strong>
              </div>
            )}
            {tooltipData.city.solicitacoes > 0 && (
              <div className={`${styles.tooltipItem} ${styles.itemSolicitacoes}`}>
                <span>Solicitações recebidas:</span>
                <strong>{tooltipData.city.solicitacoes}</strong>
              </div>
            )}
            {tooltipData.city.interesses > 0 && (
              <div className={`${styles.tooltipItem} ${styles.itemInteresses}`}>
                <span>Interesses registrados:</span>
                <strong>{tooltipData.city.interesses}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
