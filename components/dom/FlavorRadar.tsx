"use client";

import { curveLinearClosed, lineRadial, scaleLinear } from "d3";
import type { Product } from "@/lib/products";

const labels = ["Aroma", "Intensidade", "Textura", "Maturação"];

export function FlavorRadar({ product }: { product: Product }) {
  const size = 232;
  const center = size / 2;
  const radius = 76;
  const values = Object.values(product.profile);
  const scale = scaleLinear().domain([0, 100]).range([0, radius]);
  const radial = lineRadial<number>()
    .angle((_, index) => (index / values.length) * Math.PI * 2)
    .radius((value) => scale(value))
    .curve(curveLinearClosed);
  const points = values.map((value) => value);
  const path = radial(points) ?? "";

  return (
    <div className="flavor-radar">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Perfil sensorial do ${product.name}`}>
        <g transform={`translate(${center} ${center})`}>
          {[25, 50, 75, 100].map((level) => {
            const levelRadius = scale(level);
            const grid = radial(Array(values.length).fill(level)) ?? "";
            return <path d={grid} key={levelRadius} className="radar-grid" />;
          })}
          {labels.map((label, index) => {
            const angle = (index / labels.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={label}
                className="radar-axis"
                x1={0}
                y1={0}
                x2={Math.cos(angle) * radius}
                y2={Math.sin(angle) * radius}
              />
            );
          })}
          <path d={path} className="radar-value" transform="rotate(-90)" />
          {values.map((value, index) => {
            const angle = (index / values.length) * Math.PI * 2 - Math.PI / 2;
            const pointRadius = scale(value);
            return <circle key={labels[index]} cx={Math.cos(angle) * pointRadius} cy={Math.sin(angle) * pointRadius} r={3.5} className="radar-point" />;
          })}
        </g>
        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2 - Math.PI / 2;
          const labelRadius = radius + 24;
          return (
            <text
              key={label}
              x={center + Math.cos(angle) * labelRadius}
              y={center + Math.sin(angle) * labelRadius + 4}
              textAnchor="middle"
              className="radar-label"
            >
              {label}
            </text>
          );
        })}
      </svg>
      <div className="radar-legend" aria-hidden="true">
        <span>Delicado</span>
        <i />
        <span>Marcante</span>
      </div>
    </div>
  );
}
