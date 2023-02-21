import {Row} from "simple-flexbox";
import * as React from "react";

const PaginationFooter = (props) => {
    return (<Row className="justify-content-end align-items-center">
        <div className="page-text">Page</div>
        <img src="/images/backIcon.svg"
             className={props.state.skip > 0 ? "page-image cursor-pointer" : "page-image cursor-not-allowed"}
             onClick={() => props.onClickPreviousPage()}/>
        <div
            className="page-textNumber">{props.state.total >= props.state.limit ? parseInt((props.state.skip) / props.state.limit) +1 : '1'}</div>

        <img src="/images/next.svg"
             className={props.list.length < props.state.limit ? "page-image cursor-not-allowed disabled" : "page-image cursor-pointer"}
             onClick={() => props.onClickNextPage()}/>

    </Row>)
}
export default PaginationFooter