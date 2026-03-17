import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  // Band / divider styling
  bandFill?: string;
  awningColor?: string;
  awningStripeWidth?: number; // SVG units per stripe pair
  awningHeight?: number;      // SVG units tall for the awning cap
  bandPaddingTop?: number;    // SVG units above text baseline
  bandPaddingBottom?: number; // SVG units below text baseline
  bottomBorderColor?: string;
  bottomBorderWidth?: number; // SVG units (stroke-width)
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  bandFill,
  awningColor,
  awningStripeWidth = 200,
  awningHeight = 30,
  bandPaddingTop = 200,
  bandPaddingBottom = 40,
  bottomBorderColor,
  bottomBorderWidth = 4,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const awningPatternId = `awning-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  // Band geometry (all in SVG user units, relative to the path baseline y=40)
  const topY   = 40 - bandPaddingTop;
  const botY   = 40 + bandPaddingBottom;
  const topCY  = 40 + curveAmount - bandPaddingTop;
  const botCY  = 40 + curveAmount + bandPaddingBottom;
  const awnBotY  = topY + awningHeight;
  const awnBotCY = topCY + awningHeight;

  const bandPath  = `M-100,${topY} Q500,${topCY} 1540,${topY} L1540,${botY} Q500,${botCY} -100,${botY} Z`;
  const awnPath   = `M-100,${topY} Q500,${topCY} 1540,${topY} L1540,${awnBotY} Q500,${awnBotCY} -100,${awnBotY} Z`;
  const borderPath = `M-100,${botY} Q500,${botCY} 1540,${botY}`;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none"
        viewBox="0 0 1440 120"
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
          {awningColor && (
            <pattern id={awningPatternId} x="0" y="0" width={awningStripeWidth} height="10000" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width={awningStripeWidth * 0.54} height="10000" fill={awningColor} />
              <rect x={awningStripeWidth * 0.54} y="0" width={awningStripeWidth * 0.46} height="10000" fill={bandFill ?? '#ffffff'} />
            </pattern>
          )}
        </defs>

        {/* Band fill — behind the text */}
        {bandFill && <path d={bandPath} fill={bandFill} />}

        {/* Awning cap along the top edge of the band */}
        {awningColor && <path d={awnPath} fill={`url(#${awningPatternId})`} />}

        {/* Bottom border */}
        {bottomBorderColor && (
          <path d={borderPath} fill="none" stroke={bottomBorderColor} strokeWidth={bottomBorderWidth} />
        )}

        {ready && (
          <text xmlSpace="preserve" className={`fill-white ${className ?? ''}`}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
