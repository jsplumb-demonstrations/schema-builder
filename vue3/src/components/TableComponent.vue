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
        <div class="jtk-schema-table-columns">

            <div v-for="c in obj.columns" class="jtk-schema-table-column" :data-type="c.datatype" :data-primary-key="c.primaryKey" :data-jtk-port="c.id" :data-jtk-scope="c.datatype" data-jtk-source="true" data-jtk-target="true">
                <div class="jtk-schema-table-column-delete jtk-schema-delete" v-on:click="deleteColumn(c.id)"></div>
                <div><span>{{c.name}}</span></div>
                <div class="jtk-schema-table-column-edit jtk-schema-edit" v-on:click="editColumn(c.id)"></div>
            </div>

        </div>
    </div>
</template>
<script>

    import {defineComponent} from "vue"
    import { BaseNodeComponent } from '@jsplumbtoolkit/browser-ui-vue3'

    import { COLUMN } from '../constants'
    import { datatypes } from "../definitions";
    import { uuid } from "@jsplumbtoolkit/browser-ui"

    export default defineComponent({
        mixins:[BaseNodeComponent],
        methods:{
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
          deleteColumn:function(id) {
            this.getToolkit().removePort(this.getNode(), id)
          },
          editColumn:function(id) {
            const column = this.getNode().getPort(id)
            this.getToolkit().setSelection(column)
          }
        }
    })
</script>
