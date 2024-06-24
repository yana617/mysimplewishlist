export const generatePrimaryButtonStyles = (additionalStyles: string = '') =>
    `bg-btn-background hover:bg-btn-background-hover btn shadow-md btn-sm text-white  cursor-pointer bg-blue ${additionalStyles}`;
export const generateSecondaryButtonStyles = (additionalStyles: string = '') =>
    `bg-white hover:bg-light-grey btn shadow-md btn-sm cursor-pointer ${additionalStyles}`;
