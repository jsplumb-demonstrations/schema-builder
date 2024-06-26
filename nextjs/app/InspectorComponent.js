import React, {useEffect, useRef, useState} from "react";

import { Inspector, isNode, isPort} from "@jsplumbtoolkit/browser-ui"

import {datatypes, cardinalities } from "./definitions";
import {
    N_TO_M, N_TO_M_NAME,
    ONE_TO_N, ONE_TO_N_NAME,
    ONE_TO_ONE, ONE_TO_ONE_NAME,
    PROPERTY_CARDINALITY,
    TABLE, VIEW, COLUMN, RELATIONSHIP
} from "./constants";

export default function InspectorComponent({surface}) {

    const container = useRef(null)
    const [currentType, setCurrentType] = useState('')
    const [inspector, setInspector] = useState(null)

    useEffect(() => {

        setInspector(new Inspector({
            container:container.current,
            surface,
            renderEmptyContainer:() => setCurrentType(''),
            refresh:(obj, cb) => {
                const ct = isNode(obj) ? obj.data.type : isPort(obj) ? COLUMN : RELATIONSHIP
                setCurrentType(ct)
                // next tick
                setTimeout(cb)
            }
        }))

    }, [])

    return <div ref={container}>


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

</div>

}
