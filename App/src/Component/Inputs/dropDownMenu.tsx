
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { Dispatch, SetStateAction } from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';

export type dropDownProps = {
    value:string,
    name:string,
}
type dropDownMenuProps = {
    options:dropDownProps[],
    selectedOptions:string[],
    setSelectedOptions: Dispatch<SetStateAction<any>>,
    isObject?:boolean;
    field?:string;
    placeholder?: string;
    optionLabel?: string;
    displayType?: "chip"|"comma"| undefined
    pos: number;
}

    
const DropDownMenu = ({options,selectedOptions,setSelectedOptions,isObject,field,placeholder = "",optionLabel = "name",displayType = "chip",pos}:dropDownMenuProps)=>{

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            backgroundColor:"#232A42",
            color:"#ffffff"
            },
        },
    };
    const theme = useTheme();

    const StyledInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
          fontSize: 16,  
        },
        '& .MuiInputBase-input': {
            backgroundColor: `${pos % 2 ? "var(--color-spaceBlue)" : "var(--color-delftBlue)"}`,
            border: '2px solid var(--color-white)',
            borderRadius: '10px'
        },
        '& .MuiSelect-icon':{
          color: "var(--color-white)"
        }

    }))

    
    return <FormControl className='w-full' >

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedOptions}
          onChange={(e:any)=>{setSelectedOptions((prev: any) => (isObject && field ?  { ...prev, [field]: e.target.value }:e.target.value ))}}
          input={<StyledInput id="select-multiple-chip"  />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, padding:0.5}}>
              {selected.map((selected) => (
                <Chip key={selected} label={options.filter(option=>option.value === selected)[0].name} sx={{
                    backgroundColor: "var(--color-white)",
                    fontWeight:theme.typography.fontWeightBold
                    
                }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options?.map((option:dropDownProps) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                  fontWeight: Array.isArray(selectedOptions) ? (selectedOptions?.includes(option.value)
                    ? theme.typography.fontWeightBold
                    : theme.typography.fontWeightMedium ) : theme.typography.fontWeightMedium,
                  backgroundColor: (Array.isArray(selectedOptions) && selectedOptions?.includes(option.value))
                    ? "var(--color-spaceBlue)"
                    : "var(--color-blackDarked)",
                  "&:hover": {
                    color: "var(--color-hoverColor)",
                    backgroundColor: (Array.isArray(selectedOptions) && selectedOptions?.includes(option.value))
                      ? "var(--color-spaceBlue)"
                      : "var(--color-blackDarked)",
                  }
                }}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    // return <MultiSelect value={selectedOptions} onChange={(e) => {setSelectedOptions(e?.value)}} options={options} optionLabel={optionLabel} display={displayType} placeholder={placeholder} className="w-full" />
}
export default DropDownMenu;