import { classNames } from "primereact/utils";
import { MultiSelectCheckboxTemplateOptions } from 'primereact/multiselect';

const TRANSITIONS = {
    overlay: {
        timeout: 150,
        classNames: {
            enter: 'opacity-0 scale-75',
            enterActive: 'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
            exit: 'opacity-100',
            exitActive: '!opacity-0 transition-opacity duration-150 ease-linear'
        }
    }
};

const TailwindPR = {
    multiselect: {
        root:"bg-white rounded-lg text-white w-full flex flex-row justify-between p-2 border-2 border-jetGray",
        trigger:"p-2 text-black",
        panel: "bg-spaceBlue w-fit h-fit flex flex-col p-2 gap-2",
        
        item:({ context }) => ({
            className: classNames('text-white flex p-3 border-black ', {
                'bg-steelBlue hover:bg-hoverColor ': !context.selected,
                'bg-spaceBlue hover:bg-hoverColor ':  context.selected
            })
        }),
        header:"text-white",
        label:"flex flex-col gap-2",
        token:"bg-spaceBlue border-2 border-white flex flex flex-row gap-2 w-fit p-2 rounded-lg ",
        removetokenicon:"mt-2",
        headerCheckboxContainer: {
            className: classNames('inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6')
        },
        headerCheckbox: {
            root: ({ props }) => ({
                className: classNames(
                    'flex items-center justify-center',
                    'border-2 w-6 h-6 ',
                    'hover:border-hoverColor focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                    {
                        'border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900': !props?.checked,
                        'border-blue-500 bg-blue-500': props?.checked
                    }
                )
            })
        },
        headerCheckboxIcon: 'w-4 h-4 transition-all duration-200 text-white text-base',
        checkboxContainer: {
            className: classNames('inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6')
        },
        checkbox: ({ context }:{context:MultiSelectCheckboxTemplateOptions}) => ({
            className: classNames(
                'flex items-center justify-center',
                'border-2 w-6 h-6 text-  rounded-lg transition-colors duration-200',
                'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                {
                    'border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900': !context?.selected,
                    'border-blue-500 bg-blue-500': context?.selected
                }
            )
        }),
        checkboxIcon: 'w-4 h-4 transition-all duration-200 text-white text-base',

    }
}

export default TailwindPR