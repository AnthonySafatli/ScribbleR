import React, { useRef, useState } from 'react';

interface Position {
    x: number;
    y: number;
}

const DrawCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPos, setLastPos] = useState<Position | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const scale = 10;
                canvas.style.width = `${canvas.width * scale}px`;
                canvas.style.height = `${canvas.height * scale}px`;
            }
        }
    }, []);

    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Position => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / (rect.width / canvas.width));
        const y = Math.floor((e.clientY - rect.top) / (rect.height / canvas.height));
        return { x, y };
    };

    const draw = (pos: Position) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#000';
            ctx.fillRect(pos.x, pos.y, 1, 1);
        }
    };

    const drawLine = (start: Position, end: Position) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#000';
            const dx = Math.abs(end.x - start.x);
            const dy = Math.abs(end.y - start.y);
            const sx = start.x < end.x ? 1 : -1;
            const sy = start.y < end.y ? 1 : -1;
            let err = dx - dy;
            let x = start.x;
            let y = start.y;
            while (x !== end.x || y !== end.y) {
                ctx.fillRect(x, y, 1, 1);
                const e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x += sx;
                }
                if (e2 < dx) {
                    err += dx;
                    y += sy;
                }
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const pos = getMousePos(e);
        setLastPos(pos);
        draw(pos);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing && lastPos) {
            const currentPos = getMousePos(e);
            drawLine(lastPos, currentPos);
            setLastPos(currentPos);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setLastPos(null);
    };

    const handleMouseOut = () => {
        setIsDrawing(false);
        setLastPos(null);
    };

    return (
        <canvas
            ref={canvasRef}
            width={64}
            height={64}
            style={{ border: '1px solid black' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
        />
    );
};

export default DrawCanvas;
