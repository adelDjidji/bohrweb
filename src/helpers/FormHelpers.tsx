export function ErrorMessage({ message }: any) {
    return <label className='text-xs font-semibold text-red-500' >{message}</label>;
}

export const isMobileNumber = (e: any) => {
    if (!e) {
        return true;
    }
    return /([0-9]●?){9,14}[0-9]$/
    .test(e);
};
export const isPasswordValid = (e: any) => {
    if (!e) {
        return true;
    }
    return /^[a-zA-Z0-9]{8,16}$/
    .test(e);
};
export const isEmailValid = (e: any) => {
    if (!e) {
        return true;
    }
    return /^[a-zA-Z0-9]{8,16}$/
    .test(e);
};