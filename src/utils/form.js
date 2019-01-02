
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
        field: 'oldpwd',
      },
      {
        label: '新密码',
        type: 'default',
        field: 'newpwd1',
      },
      {
        label: '确认密码',
        type: 'default',
        field: 'newpwd2',
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
        list: ['男', '女'],
        isRequired: true,
      },
      {
        label: '出生日期',
        type: 'date',
        field: 'birth',
        isRequired: true,
      },
      {
        label: '政治面貌',
        type: 'select',
        field: 'status',
        list: ['中共党员', '预备党员', '入党积极分子', '共青团员', '群众'],
        isRequired: true,
      },
      {
        label: '班级',
        type: 'default',
        field: 'class',
        placeholder: 'XXX1501',
        isRequired: true,
      },
      {
        label: '宿舍楼栋',
        type: 'select',
        field: 'dormitory',
        isRequired: true,
      },
      {
        label: '宿舍号',
        type: 'default',
        field: 'room',
        placeholder: '格式: 211',
        isRequired: true,
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
        field: 'phone',
        isRequired: true,
      },
      {
        label: '微信号',
        type: 'default',
        field: 'wechat',
        isRequired: true,
      },
      {
        label: '邮箱',
        type: 'default',
        field: 'email',
        isRequired: true,
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
        field: 'address',
        isRequired: true,
      },
      {
        label: '家庭邮编',
        type: 'default',
        field: 'code',
        isRequired: false,
      },
      {
        label: '父亲姓名',
        type: 'default',
        field: 'pater_name',
        isRequired: true,
      },
      {
        label: '父亲联系电话',
        type: 'default',
        field: 'pater_phone',
        isRequired: true,
      },
      {
        label: '母亲姓名',
        type: 'default',
        field: 'mother_name',
        isRequired: true,
      },
      {
        label: '母亲联系电话',
        type: 'default',
        field: 'mother_phone',
        isRequired: true,
      },
      {
        label: '常用亲属关系',
        type: 'default',
        field: 'relation',
        isRequired: true,
      },
      {
        label: '常用亲属姓名',
        type: 'default',
        field: 'relation_name',
        isRequired: true,
      },
      {
        label: '常用亲属联系电话',
        type: 'default',
        field: 'relation_phone',
        isRequired: true,
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
        isRequired: true,
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
        isRequired: true,
        placeholder: '请选择名称',
        list: [
          {
            label: '国家奖学金',
            value: 1,
            id: 11,
          }
        ]
      },
      {
        label: '奖励分',
        type: 'panel',
        field: 'score',
        placeholder: '',
        isRequired: true,
      }
    ],
  },
  {
    name: '添加荣誉称号',
    desc: '个人中心添加荣誉称号',
    picks: ['荣誉称号'],
    types: 1,
    list: [
      {
        label: '年度',
        type: 'select',
        field:'year',
        child: '',
        isRequired: true,
        placeholder: '请选择年度',
        list: []
      },
      {
        label: '名称',
        type: 'select',
        field: 'rank',
        child: 'score',
        isRequired: true,
        placeholder: '请选择荣誉称号',
        list: []
      },
      {
        label: '奖励分',
        type: 'panel',
        field: 'score',
        placeholder: '',
        isRequired: true,
      }
    ],
  },
  {
    name: '添加软著专利',
    desc: '个人中心添加软著专利',
    picks: ['软著专利'],
    types: 1,
    list: [
      {
        label: '年度',
        type: 'select',
        field:'year',
        child: '',
        isRequired: true,
        placeholder: '请选择年度',
        list: []
      },
      {
        label: '名称',
        type: 'select',
        field: 'rank',
        child: 'score',
        isRequired: true,
        placeholder: '请选择荣誉称号',
        list: []
      },
      {
        label: '奖励分',
        type: 'panel',
        field: 'score',
        placeholder: '',
        isRequired: true,
      }
    ],
  },
  {
    name: '添加获奖情况',
    desc: '个人中心添加获奖情况',
    picks: ['获奖情况'],
    types: 1,
    list: [
      {
        label: '年度',
        type: 'select',
        field:'year',
        child: '',
        isRequired: true,
        placeholder: '请选择年度',
        list: []
      },
      {
        label: '名称',
        type: 'select',
        field: 'rank',
        child: 'score',
        isRequired: true,
        placeholder: '请选择荣誉称号',
        list: []
      },
      {
        label: '奖励分',
        type: 'panel',
        field: 'score',
        placeholder: '',
        isRequired: true,
      }
    ],
  },
  {
    name: '添加已经发表的论文',
    desc: '个人中心添加已发表的论文',
    picks: ['已发表论文'],
    types: 1,
    list: [
      {
        label: '年度',
        type: 'select',
        field:'year',
        child: '',
        isRequired: true,
        placeholder: '请选择年度',
        list: []
      },
      {
        label: '期刊等级',
        type: 'select',
        field: 'rank',
        child: 'score',
        isRequired: true,
        placeholder: '请选择荣誉称号',
        list: []
      },
      {
        label: '期刊名称',
        type: 'default',
        field: 'name',
        isRequired: true,
        placeholder: '请编辑期刊名称',
      },
      {
        label: '题目',
        type: 'default',
        field: 'ques',
        isRequired: true,
        placeholder: '请编辑题目',
      },
      {
        label: '第几作者',
        type: 'select',
        field: 'author',
        isRequired: true,
        placeholder: '请编辑选择作者类型',
      },
      {
        label: '发表时间',
        type: 'time',
        field: 'date',
        isRequired: true,
        placeholder: '请选择发表时间',
      },
      {
        label: '奖励分',
        type: 'panel',
        field: 'score',
        placeholder: '',
        isRequired: true,
      }
    ],
  },
  {
    name: '意见征集',
    desc: '意见征集提交表单',
    picks: ['意见征集'],
    types: 1,
    docTitle: '发布意见征集',
    list: [
      {
        label: '分类',
        type: 'select',
        field: 'categoryName',
        list: ['功能改进','生活','情感','就业','学习']
      },
      {
        label: '是否匿名',
        type: 'switch',
        field: 'cryptonym',
      },
      {
        label: '提交对象',
        type: 'select',
        field: 'object',
        list: ['辅导员', '管理员']
      },
      {
        label: '意见',
        type: 'textarea',
        field: 'content',
      }
    ],
  },
  {
    name: '资助申请',
    desc: '资助申请提交表单',
    picks: ['资助申请'],
    types: 1,
    docTitle: '发布资助申请',
    list: [
      {
        label: '姓名',
        type: 'default',
        field: 'username',
        list: ['功能改进','生活','情感','就业','学习']
      },
      {
        label: '专业班级',
        type: 'default',
        field: 'klass',
      },
      {
        label: '联系方式',
        type: 'default',
        field: 'telNumber'
      },
      {
        label: '申请类型',
        type: 'select',
        field: 'type',
        list: ['奖学金']
      },
      {
        label: '申请理由',
        type: 'textarea',
        field: 'reason'
      }
    ],
  },
  {
    name: '科研赛事招募令',
    desc: '科研赛事招募令提交表单',
    picks: ['科研赛事招募令'],
    types: 1,
    docTitle: '发布资助申请',
    list: [
      {
        label: '项目名称',
        type: 'default',
        field: 'name',
        isRequired: true,
      },
      {
        label: '项目类别',
        type: 'select',
        field: 'category',
        list: [],
        isRequired: true,
      },
      {
        label: '招募人数',
        type: 'default',
        field: 'num',
        isRequired: true,
      },
      {
        label: '联系方式',
        type: 'default',
        field: 'contact',
        isRequired: true,
      },
      {
        label: '是否需要个人简历',
        type: 'switch',
        field: 'resume',
        isRequired: false,
      },
      {
        label: '截止时间',
        type: 'date',
        field: 'endtime',
        isRequired: false,
      },
      {
        label: '项目介绍',
        type: 'textarea',
        field: 'intro',
        isRequired: false,
      },
      {
        label: '招募要求',
        type: 'textarea',
        field: 'command',
        isRequired: false,
      }
    ],
  }
]
