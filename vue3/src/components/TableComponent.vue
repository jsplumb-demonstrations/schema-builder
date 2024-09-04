<template>
    <div class="jtk-schema-table jtk-schema-element">
        <div class="jtk-schema-element-name">
            <div class="jtk-schema-delete jtk-schema-delete-vertex" title="Click to delete" v-on:click="deleteTable()"></div>
            <span>{{obj.name}}</span>
            <div class="jtk-schema-buttons">
                <div class="jtk-schema-edit-name jtk-schema-edit" title="Click to edit table name" v-on:click="editTable()"></div>
                <div class="jtk-schema-new-column jtk-schema-add" title="Click to add a new column" v-on:click="addColumn()"></div>
            </div>
        </div>
            <Sortable class="jtk-schema-table-columns" :list="obj.columns" item-key="id" tag="div" @update="columnDragged()">
                <template #item="{element, index}">
                    <!--
                        Each column is rendered with a div onto which we
                        write a few bits of information about the column as data-
                        attributes.  Note here that we use `data-jtk-port` on this element,
                        which tells JsPlumb this is the DOM element that 'physically' represents the
                        column. But below, on the connect elements, we use `data-jtk-port-id`, which tells
                        JsPlumb that although the connect element is a connection source, it's not the
                        actual DOM element to use once the edge has been established - it points to the
                        column element.

                        Note also that we need `data-jtk-scope` on both this column div and also the
                        connect elements, in order for the scoping mechanism to work.

                    -->
                    <div :key="element.id"
                         class="jtk-schema-table-column draggable"
                         :data-type="element.datatype"
                         :data-primary-key="element.primaryKey"
                         :data-jtk-port="element.id"
                         :data-jtk-scope="element.datatype"
                         data-jtk-target="true">

                        <div class="jtk-schema-table-column-delete jtk-schema-delete" v-on:click="deleteColumn(element.id)"></div>
                        <div><span>{{element.name}}</span></div>
                        <!--
                            connect elements. visible state controlled via css. see discussion above regarding `data-jtk-port-id`
                            and `data-jtk-scope`.
                        -->
                        <div :data-jtk-port-id="element.id" :data-jtk-scope="element.datatype" class="jtk-schema-table-column-connect jtk-schema-table-column-connect-left" data-jtk-source="true"></div>
                        <div :data-jtk-port-id="element.id" :data-jtk-scope="element.datatype" class="jtk-schema-table-column-connect jtk-schema-table-column-connect-right" data-jtk-source="true"></div>

                        <div class="jtk-schema-table-column-edit jtk-schema-edit" v-on:click="editColumn(element.id)"></div>
                    </div>
                </template>
            </Sortable>
    </div>
</template>
<script>

    import {defineComponent} from "vue"
    import { BaseNodeComponent } from '@jsplumbtoolkit/browser-ui-vue3'

    import { COLUMN } from '../constants'
    import { datatypes } from "../definitions";
    import { uuid } from "@jsplumbtoolkit/browser-ui"

    import { Sortable } from "sortablejs-vue3"

    export default defineComponent({
        mixins:[BaseNodeComponent],
        components:{Sortable},
        methods:{
         deleteColumn:function(columnId) {
             this.getToolkit().removePort(this.getNode(), columnId)
         },
            editColumn:function(columnId) {
                const column = this.getNode().getPort(columnId)
                this.getToolkit().setSelection(column)
            },
          deleteTable:function(){
              this.getToolkit().removeNode(this.getNode())
          },
          editTable:function() {
              this.getToolkit().setSelection(this.getNode())
          },
          addColumn:function() {
              this.getToolkit().addNewPort(this.getNode(), COLUMN, {
                  id: uuid(),
                  name: "new column",
                  primaryKey: false,
                  datatype: datatypes[0].id
              });
          },
            columnDragged:function() {
                this.getToolkit().updateNode(this.getNode())
            }
        }
    })
</script>
