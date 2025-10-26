import { useState, useCallback, useRef } from "react";
import { InfiniteLoader, Grid} from "react-virtualized";

type Props = {
  elems: React.ReactNode[];
  rowSize?: number; // colonnes
  colSize?: number; // lignes visibles
};

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  style:Object;
}
export default function DynamicGrid({ elems, rowSize = 4, colSize = 3 }: Props) {
  
  const [items, setItems] = useState(elems.slice(0, rowSize*colSize)); // initial load
  const gridRef = useRef(null);

  const columnCount = rowSize;
  const rowCount = Math.ceil(elems.length / columnCount);

  const isRowLoaded = ({ index }: { index: number }) => {
    return index * columnCount < items.length;
  };

  const loadMoreRows = useCallback(
    async ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => {
      // charge 12 items autour de l'index demandé
      const newEnd = Math.min(items.length + 12, elems.length);
      await new Promise((res) => setTimeout(res, 200)); // simulate network
      setItems(elems.slice(0, newEnd));
    },
    [items.length, elems]
  );
  
  const cellRenderer = ({ columnIndex, rowIndex, style }:CellProps) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= items.length) return null;
    return <div style={{ ...style, padding: 4 }}>{items[index]}</div>;
  };
  console.log(window.screen.width)
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      threshold={1} // déclenche juste avant d’arriver en haut/bas
    >
      {({ onRowsRendered, registerChild }:{onRowsRendered:any, registerChild:any }) => (
        <Grid
          ref={(ref:any) => {
            registerChild(ref);
            gridRef.current = ref;
          }}
          cellRenderer={cellRenderer}
          columnCount={columnCount}
          columnWidth={window.innerWidth / (colSize)}
          rowCount={rowCount}
          rowHeight={window.innerWidth / (colSize-0)}
          width={window.innerWidth}
          height={window.innerHeight}
          onSectionRendered={({ rowStartIndex, rowStopIndex }:{rowStartIndex:any,rowStopIndex:any}) =>
            onRowsRendered({ startIndex: rowStartIndex, stopIndex: rowStopIndex })
          }
        />
      )}
    </InfiniteLoader>
  );
}
