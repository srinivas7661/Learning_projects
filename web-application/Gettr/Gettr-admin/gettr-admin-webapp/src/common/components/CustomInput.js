import React from "react";

const CustomInput = (props) => {
    return (
        <>
            <input id={props.id} type={props.type} placeholder={props.placeholder}
                   onChange={props.onChange}
                   className={"w-100 outline-none input-border " + props.className} value={props.value}/>
            <div className="fc-red fs-14 py-1">{props.error}</div>
        </>
    );
}
export default CustomInput;
