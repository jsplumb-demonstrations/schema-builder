import {Component} from "@angular/core"
import {InspectorComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Edge, isNode, isPort, Base} from "@jsplumbtoolkit/browser-ui"

import {
  VIEW, TABLE, COLUMN, PROPERTY_CARDINALITY
} from "./constants"

import {datatypes, cardinalities} from "./definitions"

/**
 * Inspector for the schema builder.  This component wraps the Toolkit's `Inspector` class, which is a render-agnostic manager
 * for a set of nodes/edges.
 *
 * In the ngAfterViewInit method we create an Inspector which renders itself into this component's native element. This
 * component declares a `currentType` member, which is used by the template to selectively render the appropriate UI
 * elements.
 *
 * The key here is that our template includes `jtk-att` attributes on the various input fields. Using these, the underlying
 * inspector is able to set/retrieve the current values.
 *
 * The `jtk-edge-type` component used in the edge inspector is a special case. It is a component that ships with the Toolkit
 * (from version 6.2.0 onwards) and which itself uses an underlying EdgeTypePicker to render a set of EdgePropertyMappings and
 * to allow the user to pick one. We have to tell the `edge-type-picker` about the set of edge mappings we want it to use,
 * and the inspector to interact with, as well as the name of the property that we're mapping. You could have multiple
 * `edge-type-picker` components in an inspector, with a different propertyName mapped to each one.
 */
@Component({
    template:`<div class="inspector">
      
        
      @if(currentType === 'Edge') {
        <div class="jtk-inspector jtk-edge-inspector">
            <div>Cardinality</div>    
            @for(c of cardinalities;track c) {                   
                <label>
                <input type="radio" name="${PROPERTY_CARDINALITY}" jtk-att="${PROPERTY_CARDINALITY}" [value]="c.id"/>
                {{c.name}}
                </label>
            }    
        </div>
      }  
        
      @if(currentType === TYPE_VIEW) {
        <div class="jtk-inspector jtk-node-inspector">
          <div>Name</div>
          <input type="text" jtk-att="name" jtk-focus="true">
          <div>Query</div>
          <textarea jtk-att="query" rows="10"></textarea>
        </div>
      }  

      @if(currentType === TYPE_TABLE) {
        <div class="jtk-inspector jtk-node-inspector">
          <div>Name</div>
          <input type="text" jtk-att="name" jtk-focus="true"/>
        </div>
      }  

      @if(currentType === TYPE_COLUMN) {
        <div class="jtk-inspector jtk-node-inspector">
          <div>Name</div>
          <input type="text" jtk-att="name" jtk-focus/>
          <div>Datatype</div>
          @for(d of datatypes;track d) {
            <label ><input type="radio" jtk-att="datatype" name="datatype" value="{{d.id}}"/>{{d.description}}</label>
          }  
        </div>
      }
      
    </div>`,
    selector:"app-inspector"
})
export class SchemaInspectorComponent extends InspectorComponent {

  // expose these on the class so the template can pick them up.
  cardinalities = cardinalities
  TYPE_VIEW = VIEW
  TYPE_TABLE = TABLE
  TYPE_COLUMN = COLUMN
  datatypes = datatypes


  override refresh(obj: Base): void {
    this.currentType = isNode(obj) ? obj.type : isPort(obj) ? COLUMN : Edge.objectType
  }
}


