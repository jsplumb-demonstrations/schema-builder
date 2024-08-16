import React, {useState} from "react";

import { isNode, isPort} from "@jsplumbtoolkit/browser-ui"

import { InspectorComponent} from "@jsplumbtoolkit/browser-ui-react";

import {datatypes, cardinalities } from "./definitions";
import {
    PROPERTY_CARDINALITY,
    TABLE, VIEW, COLUMN, RELATIONSHIP
} from "./constants";

export default function SchemaInspectorComponent() {

    const [currentType, setCurrentType] = useState('')

    const refresh = (obj) => {
        const ct = isNode(obj) ? obj.data.type : isPort(obj) ? COLUMN : RELATIONSHIP
        setCurrentType(ct)
    }

    const renderEmptyContainer = () => setCurrentType('')

    return <InspectorComponent renderEmptyContainer={renderEmptyContainer} refresh={refresh}>


        { currentType === TABLE &&
        <div className="jtk-inspector jtk-node-inspector">
        <div>Name</div>
        <input type="text" jtk-att="name" jtk-focus/>
    </div>
}

    { currentType === VIEW &&
    <div className="jtk-inspector jtk-node-inspector">
        <div>Name</div>
        <input type="text" jtk-att="name" jtk-focus="true"/>
        <div>Query</div>
        <textarea jtk-att="query" rows="10"/>
        </div>
    }

    { currentType === COLUMN &&
    <div className="jtk-inspector jtk-node-inspector">
        <div>Name</div>
        <input type="text" jtk-att="name" jtk-focus="true"/>
        <div>Datatype</div>
        {datatypes.map(d =><label key={d.id}><input type="radio" jtk-att="datatype" name="datatype" value={d.id}/>{d.description}</label>)}
    </div>
    }

    { currentType === RELATIONSHIP &&
    <div className="jtk-inspector jtk-edge-inspector">
        <div>Cardinality</div>
        {  cardinalities.map(c => <label key={c.id}><input type="radio" name={PROPERTY_CARDINALITY} jtk-att={PROPERTY_CARDINALITY} value={c.id}/>{c.name}</label>)}


    </div>
    }

</InspectorComponent>

}
