import { useDraggable } from "@dnd-kit/core";
import { tableau } from "../../services/tableau";
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
type DropDragElementProps = {
    tableau: tableau;
    pos:number;
}
const DropDragElement = ({tableau,pos}:DropDragElementProps) => {
    const {attributes, listeners, setNodeRef, transform,transition,isDragging} = useSortable({
        id: tableau._id,
    });
 const style = {
    transform: CSS.Transform.toString(transform),
    width: "400px",
    height: "400px",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };
    return <button ref={setNodeRef} style={style} {...listeners} {...attributes}  >
                <div className={`relative flex flex-col pb-2 rounded-2xl  flex center w-[400px] z-[10] ${pos % 2 ? "bg-white" : "bg-snow"} text-black`}>

            <img src={tableau.imageBase64.imageBase64} alt={tableau._id} className="w-full h-fit max-h-[350px] rounded-t-lg z-[10]"/>
            <p className="font-mt-bold mt-2 text-center text-2xs lg:text-base z-[10]"> {tableau.titre}</p>
            </div>
         </button>
}
export default DropDragElement;