import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { tableau } from "../../services/tableau";
import { Dispatch, SetStateAction, useState } from "react";
import DropDragElement from "./DropDragElement";
import {createSnapModifier} from '@dnd-kit/modifiers';
import {arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import { Box } from "grommet";
const gridSize = 20; // pixels
const snapToGridModifier = createSnapModifier(gridSize);
type DropDragGridProps = {
    items: (string|undefined)[];
    setItems:Dispatch<SetStateAction<string[] | undefined>>;
    tableaux: tableau[]
}
const DropDragGrid = ({items,setItems,tableaux}:DropDragGridProps)=>{
    
    const [activeId, setActiveId] = useState(null);

    const gridSize = 4; // pixels
    const snapToGridModifier = createSnapModifier(gridSize);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
        })
    );
      const handleDragStart = (event:any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event:any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id && items) {
      setItems((items) => {
        
        const oldIndex = items?.indexOf(active.id);
        const newIndex = items?.indexOf(over.id);

        return arrayMove(items ?? [], oldIndex ?? 0, newIndex ?? 0);
      });
    }
  };
    return <DndContext  modifiers={[snapToGridModifier]} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} >
        <Box
            flex={true}
            wrap={true}
            direction="row"
     
            style={{ maxWidth: "1700px",backgroundColor:"#201F25"}}
           
        >
            <SortableContext items={items} strategy={rectSortingStrategy}  >
                {items.map((item,pos)=>(
                    <DropDragElement tableau={tableaux.filter(tableau=>tableau._id === item)[0]} pos={pos} />
                
                ))}
            </SortableContext>

        </Box>
    </DndContext>
}

export default DropDragGrid;