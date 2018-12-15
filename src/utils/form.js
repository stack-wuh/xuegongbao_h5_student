
/**
 * [forms 抽取全部页面的表单内容]
 * @type {Array}
 * name {String} 表单名称
 * desc {String} 表单详情
 * docTitle {String} 页面标题
 * pick {Array} 匹配表单的字段, 符合条件即为挑选表单
 * types {String} 表单功能: 1 功能型表单, 2 展示型表单
 * list: {Array} 表单内的元素集合
 * list -> label {String} 表单元素标题
 * list -> type {String} 表单元素类型 default: input, textarea, date, datetime, select
 * list -> field {String} 表单元素匹配后台字段
 */
export const forms = [
  {
    name: '修改密码',
    desc: '个人中心的修改密码表单',
    docTitle:'修改密码',
    picks: ['修改密码'],
    types: 1,
    list: [
      {
        label: '原密码',
        type: 'default',
        field: '',
      },
      {
        label: '新密码',
        type: 'default',
        field: '',
      },
      {
        label: '确认密码',
        type: 'default',
        field: '',
      }
    ]
  },
  {
    name: '基础信息',
    desc: '个人中心的个人信息的子项 - 基础信息',
    docTitle: '基础信息',
    picks: ['基础信息'],
    types: 1,
    list: [
      {
        label: '性别',
        type: 'select',
        field: 'sex',
        list: [
          {
            label: '男',
            value: 0
          },
          {
            lable: '女',
            value: 1
          }
        ]
      },
      {
        label: '出生日期',
        type: 'date',
        field: 'time',
      },
      {
        label: '政治面貌',
        type: 'select',
        field: 'face',
      },
      {
        label: '班级',
        type: 'default',
        field: 'classes',
        placeholder: 'XXX1501',
      },
      {
        label: '宿舍楼栋',
        type: 'select',
        field: 'No',
      },
      {
        label: '宿舍号',
        type: 'default',
        field: 'Nober',
        placeholder: '格式: 211'
      },
    ]
  },
  {
    name: '个人联系方式',
    docTitle: '个人联系方式',
    desc: '个人中心的个人信息的子项 -- 个人联系方式',
    picks: ['个人联系方式'],
    types: 1,
    list: [
      {
        label: '手机号',
        type: 'default',
        field: '',
      },
      {
        label: '微信号',
        type: 'default',
        field: '',
      },
      {
        label: '邮箱',
        type: 'default',
        field: '',
      }
    ]
  },
  {
    name: '家庭联系方式',
    docTitle: '家庭联系方式',
    desc: '个人中心的个人信息的子项 -- 家庭联系方式',
    picks: ['家庭联系方式'],
    types: 1,
    list: [
      {
        label: '家庭详细地址',
        type: 'default',
        field: '',
      },
      {
        label: '家庭邮编',
        type: 'default',
        field: '',
      },
      {
        label: '父亲姓名',
        type: 'default',
        field: '',
      },
      {
        label: '父亲联系电话',
        type: 'default',
        field: '',
      },
      {
        label: '母亲姓名',
        type: 'default',
        field: '',
      },
      {
        label: '母亲联系电话',
        type: 'default',
        field: '',
      },
      {
        label: '常用亲属姓名',
        type: 'default',
        field: '',
      },
      {
        label: '常用亲属关系',
        type: 'default',
        field: '',
      },
      {
        label: '常用亲属联系电话',
        type: 'default',
        field: '',
      },
    ]
  },
  {
    name: '添加奖学金',
    desc: '个人中心添加奖学金',
    picks: ['奖学金'],
    types: 1,
    list: [
      {
        label: '年度',
        type: 'select',
        field:'year',
        child: '',
        placeholder: '请选择年度',
        list: [
          {
            label: '2018-2019',
            value: '2018-2019'
          },
          {
            label: '2017-2018',
            value: '2017-2018'
          }
        ]
      },
      {
        label: '名称',
        type: 'select',
        field: 'rank',
        child: 'score',
        placeholder: '请选择名称',
        list: [
          {
            label: '国家奖学金',
            value: 1
          }
        ]
      },
      {
        label: '奖励分',
        type: 'panel',
        field: 'score',
        placeholder: '',
      }
    ],
  }
]
