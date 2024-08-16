import React from 'react';

import {PaletteComponent} from '@jsplumbtoolkit/browser-ui-react';
import {TABLE} from "./constants";

export default function SchemaPalette() {

    function dataGenerator (el) {
        const type = el.getAttribute("data-type"),
            base = {
                name:el.getAttribute("data-type"),
                type
            };

        if (type === TABLE) {
            base.columns = []
        } else {
            base.query =''
        }

        return base

    }

    return <PaletteComponent cssClass="jtk-schema-palette" selector="[data-type]" dataGenerator={dataGenerator}>
        <div data-type="table" title="Drag to add new" className="jtk-schema-palette-item" key={"table"}>Table</div>
        <div data-type="view" title="Drag to add new" className="jtk-schema-palette-item" key={"view"}>View</div>
    </PaletteComponent>
}

