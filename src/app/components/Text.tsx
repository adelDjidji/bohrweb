
interface PropType{
    type:'16-600' | '14-600' | '14-500' | '12-500' | '16-500' | '20-500' | '20-600'| '32-600';
    className?:string;
    children:any,
    style?:any
}
const Text = ({ type, children, className='', style }:PropType) => {
    var classNam = className;
    switch(type){
        case '16-600': 
        classNam +=" text-base font-semibold";
        break;
        case '14-600': 
        classNam +=" text-sm font-semibold";
        break;
        case '14-500': 
        classNam +=" text-sm font-medium";
        break;
        case '12-500': 
        classNam +=" text-xs font-medium";
        break;
        case '16-500': 
        classNam +=" text-base font-medium";
        break;
        case '20-500': 
        classNam +=" text-xl font-medium";
        break;
        case '20-600': 
        classNam +=" text-xl font-semibold";
        break;
        case '32-600': 
        classNam +=" text-3xl font-semibold";
        break;
    }

    return <span className={classNam} style={style}>{children}</span>
}

export default Text;