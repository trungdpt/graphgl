import { useRef, useLayoutEffect } from 'react';

export function useFocusRef<T extends HTMLOrSVGElement>(isCellSelected: boolean | undefined): React.RefObject<T> {
    const ref = useRef<T>(null);
    useLayoutEffect(() => {
        if (!isCellSelected) return;
        ref.current?.focus({ preventScroll: true });
    }, [isCellSelected]);

    return ref;
}

interface CellExpanderFormatterProps {
    isCellSelected: boolean;
    expanded: boolean;
    onCellExpand: () => void;
}

export function CellExpanderFormatter({
    isCellSelected,
    expanded,
    onCellExpand,
}: CellExpanderFormatterProps): JSX.Element {
    const iconRef = useFocusRef<HTMLSpanElement>(isCellSelected);

    function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        onCellExpand();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onCellExpand();
        }
    }

    return (
        <div className="tree-cell-expander">
            <span onClick={handleClick} onKeyDown={handleKeyDown}>
                <span ref={iconRef} tabIndex={-1}>
                    {expanded ? '\u25BC' : '\u25B6'}
                </span>
            </span>
        </div>
    );
}
