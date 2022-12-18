import { StayPrimaryPortraitSharp } from "@material-ui/icons";


const Input = (props) =>{
    var className = props.extraStyle;
    className += " border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none";
    return (
    <>
        <label className="block mt-8 mb-2 text-sm font-semibold text-dark-grey dark:text-white">
            {props.label}
        </label>
        <input
        className={className}
        height={props.height??40}
        {...props}
        />
    </>
)};

export default Input ;