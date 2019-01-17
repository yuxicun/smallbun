/*
 *
 * Copyright(c)[2018] [smallbun] www.smallbun.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
$(function () {
    //@formatter:off
    var options = {
        url: contextPath + 'dict/type/page',
        createUrl: contextPath + "dict/type/form",
        updateUrl: contextPath + "dict/type/form/{id}",
        removeUrl: contextPath + "dict/type/removeById",
        batRemoveUrl: contextPath + "dict/type/removeByIds",
        exportUrl: contextPath + "/export",
        sortName: "gmtCreate",
        sortOrder: "desc",
        modalName: "字典",
        search: false,
        showExport: false,
        showRefresh: true,
        showColumns: true,
        showToggle: true,
        columns: [{checkbox: true},
            {field: 'id', visible: false},
            {field: 'typeName', title: '字典名称', formatter: $.table.view},
            {field: 'typeCode', title: '字典类型', sortable: true},
            {field: 'gmtModified', title: '更新时间'},
            {title: '操作', width: 250, visible: false, formatter: function (value, row, index) {
                    var actions = [];
                    actions.push('<a class="btn bg-purple btn-xs " href="#" onclick="$.operate.view(\'' + row.id + '\',\'\')"><i class="fa fa-search-plus"></i> 查看</a> ');
                    actions.push('<a class="btn ibtn-white btn-xs " href="#" onclick="$.operate.addTab(\'sys_dict_type' + row.id + '\', \'字典值\', \'dict/value?sysDictType.id=' + row.id + '\')"><i class="fa fa-bars"></i> 字典值</a> ');
                    actions.push('<a class="btn bg-orange btn-xs" href="#" onclick="$.operate.edit(\'' + row.id + '\')"><i class="fa fa-edit"></i> 编辑</a> ');
                    actions.push('<a class="btn bg-maroon btn-xs " href="#" onclick="$.operate.remove(\'' + row.id + '\')"><i class="fa fa-remove"></i> 删除</a>');
                    return actions.join('');
                }
            }]
    };
    $.table.init(options);
    //@formatter:off
});