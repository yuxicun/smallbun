/**
 * 初始化
 */
$(function () {
    //如果orgId为空，那么设置为0，为主菜单
    if ($.common.isEmpty($('#orgId').val())) {
        $('#orgId').val(0);
    }
    /**
     * 加载部门树
     */
    $.pop_up_tree.init({
        obj: 'pop-up-org-tree',//显示input name 属性和id属性
        value: 'orgId', //隐藏value name 属性和id属性
        idKey: 'id',       //zTree idKey
        pIdKey: 'parentId',//zTree pIdKey
        rootPId: '0',      //zTree rootPId
        name: 'orgName',  //zTree name
        type: 'POST',      //ajax 请求
        url: contextPath + 'org/list' //请求地址
    });

    /**
     * 日期
     */
    laydate.render({
        elem: '#birthday', theme: '#6284f3', max: new Date().toLocaleDateString()
    });
});

/**
 * 提交事件
 */
function doSubmit() {
    // 手动触发校验代码
    if ($('.form-horizontal').valid()) {
        $.operate.saveCurrentTabPage($('.form-horizontal').attr('action'), $('.form-horizontal').serializeArray());
    }
}

/**
 * 验证
 */
$(".form-horizontal").validate({
    rules: {
        telephone: {
            isTel: true
        },
        phone: {
            isTel: true
        },
        username: {
            required: true,
            remote: {
                async: false, //同步方法，如果用异步的话，flag永远为false
                url: contextPath + "user/unique",
                type: "post",
                dataType: 'JSON',
                data: {
                    id: function () {
                        return $("#id").val();
                    },
                    username: function () {
                        return $("#username").val();
                    }
                },
                dataFilter: function (data, type) {
                    data = JSON.parse(data);
                    return data.result;
                }
            }
        }
    },
    messages: {
        username: {
            remote: "用户名已存在"
        }
    }
});