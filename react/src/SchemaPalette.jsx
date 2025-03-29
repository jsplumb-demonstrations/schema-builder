import React from 'react';

import {PaletteComponent} from '@jsplumbtoolkit/browser-ui-react';
import {TABLE} from "./constants";

export default function SchemaPalette() {

    function dataGenerator (el) {
        const type = el.getAttribute("data-jtk-type"),
            base = {
                name:el.getAttribute("data-jtk-type"),
                type
            };

        if (type === TABLE) {
            base.columns = []
        } else {
            base.query =''
        }

        return base

    }

    return <PaletteComponent cssClass="jtk-schema-palette" dataGenerator={dataGenerator}>
        <div data-jtk-type="table" data-jtk-name="New Table" title="Drag to add new" className="jtk-schema-palette-item" key={"table"}>Table</div>
        <div data-jtk-type="view" title="Drag to add new" className="jtk-schema-palette-item" key={"view"}>View</div>
    </PaletteComponent>
}

