
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { Dispatch, SetStateAction } from 'react';

export type dropDownProps = {
    value:string,
    name:string,
}
type dropDownMenuProps = {
    options:dropDownProps[],
    selectedOptions:string[],
    setSelectedOptions: Dispatch<SetStateAction<any>>,
    placeholder?: string;
    optionLabel?: string;
    displayType?: "chip"|"comma"| undefined

}

    
const DropDownMenu = ({options,selectedOptions,setSelectedOptions,placeholder = "",optionLabel = "name",displayType = "chip"}:dropDownMenuProps)=>{
    return <MultiSelect value={selectedOptions} onChange={(e) => {setSelectedOptions(e?.value)}} options={options} optionLabel={optionLabel} display={displayType} placeholder={placeholder} className="w-full" />
}
export default DropDownMenu;