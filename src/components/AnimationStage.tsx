import { useState, useMemo } from "react";
import { getAnimationComponent } from "./animations/registry";
import type { MathAnimBlock, Lang, LocalizedText } from "../lib/types";

interface AnimationStageProps {
  block: MathAnimBlock;
  lang: Lang;
  localized: (text: LocalizedText) => string;
}

export function AnimationStage({ block, localized }: AnimationStageProps) {
  const initialValues = useMemo(() => {
    const vals: Record<string, number | boolean> = {};
    for (const [key, param] of Object.entries(block.params)) {
      vals[key] = param.default;
    }
    return vals;
  }, [block.params]);

  const [values, setValues] = useState<Record<string, number | boolean>>(initialValues);

  const AnimComponent = getAnimationComponent(block.anim_type);

  const handleChange = (key: string, value: number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="anim-stage">
      <div className="anim-canvas-wrapper">
        <AnimComponent params={values} animType={block.anim_type} />
      </div>
      <div className="anim-controls">
        {Object.entries(block.params).map(([key, param]) => {
          const label = param.label ? localized(param.label) : key;
          const value = values[key];

          if (typeof param.default === "boolean") {
            return (
              <label key={key} className="anim-control anim-toggle">
                <span className="control-label">{label}</span>
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => handleChange(key, e.target.checked)}
                />
                <span className="toggle-switch" />
              </label>
            );
          }

          return (
            <label key={key} className="anim-control anim-slider">
              <span className="control-label">{label}</span>
              <input
                type="range"
                min={param.min ?? 0}
                max={param.max ?? 10}
                step={param.step ?? 0.1}
                value={value as number}
                onChange={(e) => handleChange(key, parseFloat(e.target.value))}
              />
              <span className="control-value">
                {typeof value === "number" ? value.toFixed(2) : String(value)}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
